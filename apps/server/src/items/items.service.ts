import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Item } from '../database/entities/item.entity';
import { Allergen } from "../database/entities/allergen.entity";
import { CreateItemDto } from "./CreateItemDto";
import { ItemAllergen } from "../database/entities/item_allergen.entity";
import { Alcohol } from "../database/entities/alcohol.entity";
import { Appetizer } from "../database/entities/appetizer.entity";
import { Drink } from "../database/entities/drink.entity";
import { Entree } from "../database/entities/entree.entity";
import { Side } from "../database/entities/side.entity";
import { Dessert } from "../database/entities/dessert.entity";
import { ItemCategory } from 'src/database/entities/item-category.enum';

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
    ) { }

    async getItemsByLocation(slug: string) {
        return this.itemRepo.find({
            where: {
                location: { id: slug },
            },
        });
    }

    async getSlug(slug: string) {
        return this.itemRepo.find({
            where: {
                location: { username: slug },
            },
        });
    }

    async getItem(id: string) {
        return this.itemRepo.findOne({
            where: {
                id: id,
            },
            relations: {
                itemAllergens: {
                    allergen: true
                }
            }
        })
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
            image,
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
            image: image,
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
            case ItemCategory.ALCOHOL:
                await this.alcoholRepo.save({
                    id: savedItem.id,
                    item: savedItem,
                    alcoholContent: Number(alcoholContent),
                });
                break;

            case ItemCategory.APPETIZER:
                await this.appetizerRepo.save({
                    id: savedItem.id,
                    item: savedItem,
                    description,
                });
                break;

            case ItemCategory.DESSERT:
                await this.dessertRepo.save({
                    id: savedItem.id,
                    item: savedItem,
                    description,
                    prepTime: prepTime ? Number(prepTime) : null,
                });
                break;

            case ItemCategory.DRINK:
                await this.drinkRepo.save({
                    id: savedItem.id,
                    item: savedItem,
                    refillable: Boolean(refillable),
                });
                break;

            case ItemCategory.ENTREE:
                await this.entreeRepo.save({
                    id: savedItem.id,
                    item: savedItem,
                    description,
                });
                break;

            case ItemCategory.SIDE:
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

    async updateItem(id: string, dto: CreateItemDto) {
        const {
            name,
            price,
            category,
            allergens,
            description,
            prepTime,
            alcoholContent,
            refillable,
            image,
        } = dto;

        // 1. Find existing item
        const existingItem = await this.itemRepo.findOne({
            where: { id },
        });

        if (!existingItem) {
            throw new Error(`Item with id ${id} not found`);
        }

        // 2. Update base item
        await this.itemRepo.update(id, {
            name,
            price,
            category,
            image,
        });

        // 3. Replace allergens (delete old, insert new)
        await this.itemAllergenRepo.delete({ itemId: id });

        if (allergens?.length) {
            const allergenEntities = await this.allergenRepo.findBy({
                id: In(allergens),
            });

            const itemAllergens = allergenEntities.map((allergen) =>
                this.itemAllergenRepo.create({
                    itemId: id,
                    allergenId: allergen.id,
                }),
            );

            await this.itemAllergenRepo.save(itemAllergens);
        }

        // 4. Update subtype
        switch (category) {
            case ItemCategory.ALCOHOL:
                await this.alcoholRepo.save({
                    id,
                    item: { id },
                    alcoholContent: Number(alcoholContent),
                });
                break;

            case ItemCategory.APPETIZER:
                await this.appetizerRepo.save({
                    id,
                    item: { id },
                    description,
                });
                break;

            case ItemCategory.DESSERT:
                await this.dessertRepo.save({
                    id,
                    item: { id },
                    description,
                    prepTime: prepTime ? Number(prepTime) : null,
                });
                break;

            case ItemCategory.DRINK:
                await this.drinkRepo.save({
                    id,
                    item: { id },
                    refillable: Boolean(refillable),
                });
                break;

            case ItemCategory.ENTREE:
                await this.entreeRepo.save({
                    id,
                    item: { id },
                    description,
                });
                break;

            case ItemCategory.SIDE:
                await this.sideRepo.save({
                    id,
                    item: { id },
                });
                break;

            default:
                throw new Error(`Invalid category: ${category}`);
        }

        // 5. Return updated item
        return this.itemRepo.findOne({
            where: { id },
            relations: {
                itemAllergens: true,
            },
        });
    }

    async deleteItem(id: string) {
        const item = await this.itemRepo.findOne({
            where: { id },
        });

        if (!item) {
            throw new Error(`Item with id ${id} not found`);
        }

        await this.itemRepo.delete(id);

        return {
            success: true,
            message: `Item ${id} deleted successfully`,
        };
    }
}