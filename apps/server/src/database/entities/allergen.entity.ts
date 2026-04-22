import {Entity, PrimaryColumn, Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ItemAllergen} from "./item_allergen.entity";

// allergen(id, name, itemAllergen (FK))
@Entity('allergens')
export class Allergen {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => ItemAllergen, (itemAllergen) => itemAllergen.allergen,
        { nullable: true, onDelete: 'CASCADE' })
    itemAllergens: ItemAllergen[];
}