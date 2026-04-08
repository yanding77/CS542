import {Entity, ManyToOne, PrimaryColumn, JoinColumn} from 'typeorm';
import {Menu} from "./menu.entity";
import {Item} from "./item.entity";

@Entity('menu_items')
export class MenuItem {
    @PrimaryColumn('uuid')
    menuId: string;

    @PrimaryColumn('uuid')
    itemId: string;

    @ManyToOne(() => Menu, (menu) => menu.menuItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'menuId' })
    menu: Menu;

    @ManyToOne(() => Item, (item) => item.menuItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'itemId' })
    item: Item;
}