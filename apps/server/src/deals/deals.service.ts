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

    async getDeal(id: string) {
        return this.dealRepo.findOne({
            where: { id },
            relations: {
                dealItems: { item: true },
                dealCombos: { combo: true },
                location: true
            },
        });
    }

    async updateDeal(id: string, dto: CreateDealDto) {
        const { name, price, startDate, endDate, items, combos } = dto;

        await this.dealRepo.update(id, {
            name,
            price,
            startDate,
            endDate,
        });

        // clear old relations first (important)
        await this.dealItemRepo.delete({ dealId: id });
        await this.dealComboRepo.delete({ dealId: id });

        if (items?.length) {
            await this.dealItemRepo.save(
                items.map(itemId =>
                    this.dealItemRepo.create({ dealId: id, itemId })
                )
            );
        }

        if (combos?.length) {
            await this.dealComboRepo.save(
                combos.map(comboId =>
                    this.dealComboRepo.create({ dealId: id, comboId })
                )
            );
        }

        return this.getDeal(id);
    }

    async deleteDeal(id: string) {
        const deal = await this.dealRepo.findOne({
            where: { id },
        });

        if (!deal) {
            throw new Error(`Deal with id ${id} not found`);
        }

        await this.dealRepo.delete(id);

        return {
            success: true,
            message: `Deal ${id} deleted successfully`,
        };
    }
}