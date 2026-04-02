import {Entity, ManyToOne, PrimaryColumn, JoinColumn} from 'typeorm';
import {Menu} from "./menu.entity";
import {Combo} from "./combo.entity";

@Entity('menu_combos')
export class MenuCombo {
    @PrimaryColumn('uuid')
    menuId: string;

    @PrimaryColumn('uuid')
    comboId: string;

    @ManyToOne(() => Menu, (menu) => menu.menuCombos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'menuId' })
    menu: Menu;

    @ManyToOne(() => Combo, (combo) => combo.menuCombos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'comboId' })
    combo: Combo;
}