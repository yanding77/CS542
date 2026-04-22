import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import { Item } from '../database/entities/item.entity';
import {Allergen} from "../database/entities/allergen.entity";
import {CreateItemDto} from "./CreateItemDto";
import {ItemAllergen} from "../database/entities/item_allergen.entity";
import {Alcohol} from "../database/entities/alcohol.entity";
import {Appetizer} from "../database/entities/appetizer.entity";
import {Drink} from "../database/entities/drink.entity";
import {Entree} from "../database/entities/entree.entity";
import {Side} from "../database/entities/side.entity";
import {Dessert} from "../database/entities/dessert.entity";

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private itemRepo: Repository<Item>,

        @InjectRepository(Allergen)
        private allergenRepo: Repository<Allergen>,

        @InjectRepository(ItemAllergen)
        private itemAllergenRepo: Repository<ItemAllergen>,

        @InjectRepository(Alcohol)
        private alcoholRepo: Repository<Alcohol>,

        @InjectRepository(Appetizer)
        private appetizerRepo: Repository<Appetizer>,

        @InjectRepository(Drink)
        private drinkRepo: Repository<Drink>,

        @InjectRepository(Entree)
        private entreeRepo: Repository<Entree>,

        @InjectRepository(Side)
        private sideRepo: Repository<Side>,

        @InjectRepository(Dessert)
        private dessertRepo: Repository<Dessert>
    ) {}

    async getItemsByLocation(locationId: string) {
        return this.itemRepo.find({
            where: {
                location: { id: locationId },
            },
        });
    }

    async createItem(dto: CreateItemDto) {
        const {
            name,
            price,
            category,
            allergens,
            description,
            prepTime,
            alcoholContent,
            refillable,
            locationId,
        } = dto;

        // 1. Load allergen entities
        const allergenEntities = await this.allergenRepo.findBy({
            id: In(allergens),
        });

        // 2. Create BASE item first
        const item = this.itemRepo.create({
            name,
            price,
            location: { id: locationId },
            category: category,
        });

        const savedItem = await this.itemRepo.save(item);

        // 3. Attach allergens (join table entity style)
        const itemAllergens = allergenEntities.map((allergen) =>
            this.itemAllergenRepo.create({
                itemId: savedItem.id,
                allergenId: allergen.id,
            }),
        );

        await this.itemAllergenRepo.save(itemAllergens);

        // 4. Create subtype row based on category
        switch (category) {
            case 'alcohol':
                await this.alcoholRepo.save({
                    id: savedItem.id,
                    item: savedItem,
                    alcoholContent: Number(alcoholContent),
                });
                break;

            case 'appetizer':
                await this.appetizerRepo.save({
                    id: savedItem.id,
                    item: savedItem,
                    description,
                });
                break;

            case 'dessert':
                await this.dessertRepo.save({
                    id: savedItem.id,
                    item: savedItem,
                    description,
                    prepTime: prepTime ? Number(prepTime) : null,
                });
                break;

            case 'drink':
                await this.drinkRepo.save({
                    id: savedItem.id,
                    item: savedItem,
                    refillable: Boolean(refillable),
                });
                break;

            case 'entree':
                await this.entreeRepo.save({
                    id: savedItem.id,
                    item: savedItem,
                    description,
                });
                break;

            case 'side':
                await this.sideRepo.save({
                    id: savedItem.id,
                    item: savedItem,
                });
                break;

            default:
                throw new Error(`Invalid category: ${category}`);
        }

        return this.itemRepo.findOne({
            where: { id: savedItem.id },
            relations: {
                itemAllergens: true,
            },
        });
    }
}