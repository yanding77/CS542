import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Item} from "../database/entities/item.entity";
import {Repository} from "typeorm";
import {Combo} from "../database/entities/combo.entity";
import {ComboItem} from "../database/entities/combo_item.entity";
import {CreateComboDto} from "./CreateComboDto";

@Injectable()
export class CombosService {
    constructor(
        @InjectRepository(Combo)
        private comboRepo: Repository<Combo>,

        @InjectRepository(ComboItem)
        private comboItemRepo: Repository<ComboItem>
    ) {}

    async createCombo(dto: CreateComboDto) {
        const { name, price, locationId, items } = dto;

        const combo = this.comboRepo.create({
            name,
            price,
            location: { id: locationId },
        });

        const savedCombo = await this.comboRepo.save(combo);

        const comboItems = items.map((itemId) =>
            this.comboItemRepo.create({
                comboId: savedCombo.id,
                itemId,
            })
        );

        await this.comboItemRepo.save(comboItems);

        return this.comboRepo.findOne({
            where: { id: savedCombo.id },
            relations: {
                comboItems: { item: true },
            },
        });
    }

    async getCombosByLocation(locationId: string) {
        console.log(JSON.stringify(await this.comboRepo
            .createQueryBuilder('combo')
            .leftJoinAndSelect('combo.comboItems', 'comboItem')
            .leftJoinAndSelect('comboItem.item', 'item')
            .where('combo.locationId = :locationId', { locationId })
            .getMany(), null, 2));

        return this.comboRepo
            .createQueryBuilder('combo')
            .leftJoinAndSelect('combo.comboItems', 'comboItem')
            .leftJoinAndSelect('comboItem.item', 'item')
            .where('combo.locationId = :locationId', { locationId })
            .getMany();
    }

    async getCombo(id: string) {
        return this.comboRepo.findOne({
            where: { id: id },
            relations: {
                comboItems: { item: true },
                location: true,
            },
        });
    }

    async updateCombo(id: string, dto: CreateComboDto) {
        const { name, price, locationId, items } = dto;

        // 1. Check combo exists
        const existing = await this.comboRepo.findOne({
            where: { id },
        });

        if (!existing) {
            throw new Error(`Combo with id ${id} not found`);
        }

        // 2. Update base combo
        await this.comboRepo.update(id, {
            name,
            price,
            location: { id: locationId },
        });

        // 3. Remove old item relations
        await this.comboItemRepo.delete({ comboId: id });

        // 4. Insert new item relations
        if (items?.length) {
            const comboItems = items.map((itemId) =>
                this.comboItemRepo.create({
                    comboId: id,
                    itemId,
                })
            );

            await this.comboItemRepo.save(comboItems);
        }

        // 5. Return updated combo
        return this.comboRepo.findOne({
            where: { id },
            relations: {
                comboItems: { item: true },
            },
        });
    }

    async deleteCombo(id: string) {
        const combo = await this.comboRepo.findOne({
            where: { id },
        });

        if (!combo) {
            throw new Error(`Combo with id ${id} not found`);
        }

        await this.comboRepo.delete(id);

        return {
            success: true,
            message: `Combo ${id} deleted successfully`,
        };
    }
}
