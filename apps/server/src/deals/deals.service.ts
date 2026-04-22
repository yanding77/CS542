import {Injectable, BadRequestException, Body} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Deal } from '../database/entities/deal.entity';
import { DealItem } from '../database/entities/deal_item.entity';
import { DealCombo } from '../database/entities/deal_combo.entity';
import {CreateDealDto} from "./CreateDealDto";

@Injectable()
export class DealsService {
    constructor(
        @InjectRepository(Deal)
        private dealRepo: Repository<Deal>,

        @InjectRepository(DealItem)
        private dealItemRepo: Repository<DealItem>,

        @InjectRepository(DealCombo)
        private dealComboRepo: Repository<DealCombo>,
    ) {}

    async getDealsByLocation(locationId: string) {
        return this.dealRepo.find({
            where: {
                location: { id: locationId },
            },
            relations: ['dealItems', 'dealCombos'],
        });
    }

    async createDeal(@Body() dto: CreateDealDto) {
        const {
            name,
            price,
            startDate,
            endDate,
            locationId,
            items = [],
            combos = [],
        } = dto;

        // RULE: cannot have both an item and a combo
        if (items.length && combos.length) {
            throw new BadRequestException(
                'Deal cannot contain both items and combos',
            );
        }

        if (!items.length && !combos.length) {
            throw new BadRequestException(
                'Deal must contain either items or combos',
            );
        }

        // Create base deal
        const deal = this.dealRepo.create({
            name,
            price,
            startDate,
            endDate,
            location: { id: locationId },
        });

        const savedDeal = await this.dealRepo.save(deal);

        // Handle item deals
        if (items.length) {
            const dealItems = items.map((itemId: string) =>
                this.dealItemRepo.create({
                    deal: { id: savedDeal.id },
                    item: { id: itemId },
                }),
            );

            await this.dealItemRepo.save(dealItems);
        }

        // Handle combo deals
        if (combos.length) {
            const dealCombos = combos.map((comboId: string) =>
                this.dealComboRepo.create({
                    deal: { id: savedDeal.id },
                    combo: { id: comboId },
                }),
            );

            await this.dealComboRepo.save(dealCombos);
        }

        return savedDeal;
    }
}