import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany} from 'typeorm';
import { Location } from './location.entity';
import {MenuItem} from "./menu_item.entity";
import {MenuCombo} from "./menu_combo.entity";

@Entity('menus')
export class Menu {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Location, (location) => location.menus, { onDelete: 'CASCADE' })
    location: Location;

    @Column()
    name: string;

    @OneToMany(() => MenuItem, (menuItem) => menuItem.menu)
    menuItems: MenuItem[];

    @OneToMany(() => MenuCombo, (menuCombo) => menuCombo.menu,
        { nullable: true })
    menuCombos: MenuCombo[];

    @CreateDateColumn()
    created_at: Date;
}