import {Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn, ManyToOne, OneToMany} from 'typeorm';
import {Location} from "./location.entity";
import {ComboItem} from "./combo_item.entity";
import {MenuCombo} from "./menu_combo.entity";
import {DealCombo} from "./deal_combo.entity";

// combos(id, location (FK), name, comboItems (FK), menuCombos (FK), price, dealCombos (FK), created_at)
@Entity('combos')
export class Combo {
    @PrimaryColumn('uuid')
    id: string;

    @ManyToOne(() => Location, (location) => location.menus, { onDelete: 'CASCADE' })
    location: Location;

    @Column()
    name: string;

    @OneToMany(() => ComboItem, (comboItem) => comboItem.combo)
    comboItems: ComboItem[];

    @OneToMany(() => MenuCombo, (menuCombo) => menuCombo.combo)
    menuCombos: MenuCombo[];

    @Column('float')
    price: number;

    @OneToMany(() => DealCombo, (dealCombo) => dealCombo.combo,
        { nullable: true })
    dealCombos: DealCombo[];

    @CreateDateColumn()
    created_at: Date;
}