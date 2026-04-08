import {Entity, ManyToOne, PrimaryColumn, JoinColumn} from 'typeorm';
import {Item} from "./item.entity";
import {Allergen} from "./allergen.entity";

@Entity('item_allergens')
export class ItemAllergen {
    @PrimaryColumn('uuid')
    itemId: string;

    @PrimaryColumn('uuid')
    allergenId: string;

    @ManyToOne(() => Item, (item) => item.itemAllergens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'itemId' })
    item: Item;

    @ManyToOne(() => Allergen, (allergen) => allergen.itemAllergens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'allergenId' })
    allergen: Allergen;
}