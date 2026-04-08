import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToOne, OneToMany} from 'typeorm';
import { Location } from './location.entity';
import {MenuItem} from "./menu_item.entity";
import {ComboItem} from "./combo_item.entity";
import {DealItem} from "./deal_item.entity";
import {ItemAllergen} from "./item_allergen.entity";
import {OrderItem} from "./order_item.entity";


@Entity('items')
export class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Location, (location) => location.items, { onDelete: 'CASCADE' })
    location: Location;

    @Column()
    name: string;

    @Column('float')
    price: number;

    @OneToMany(() => MenuItem, (menuItem) => menuItem.item,
        { onDelete: 'CASCADE' })
    menuItems: MenuItem[];

    @OneToMany(() => ComboItem, (comboItem) => comboItem.item,
        { nullable: true })
    comboItems: ComboItem[];

    @OneToMany(() => DealItem, (dealItem) => dealItem.item,
        { nullable: true })
    dealItems: DealItem[];

    @OneToMany(() => ItemAllergen, (itemAllergen) => itemAllergen.item,
        { nullable: true })
    itemAllergens: ItemAllergen[];

    @OneToMany(() => OrderItem, (orderItem) => orderItem.item,
        { nullable: true })
    orderItems: OrderItem[];

    @CreateDateColumn()
    created_at: Date;
}