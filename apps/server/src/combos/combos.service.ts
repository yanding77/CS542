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
        return this.comboRepo.find({
            where: {
                location: { id: locationId },
            },
        });
    }
}
