import {Entity, ManyToOne, PrimaryColumn, JoinColumn} from 'typeorm';
import {Item} from "./item.entity";
import {Combo} from "./combo.entity";

@Entity('combo_items')
export class ComboItem {
    @PrimaryColumn('uuid')
    comboId: string;

    @PrimaryColumn('uuid')
    itemId: string;

    @ManyToOne(() => Combo, (combo) => combo.comboItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'comboId' })
    combo: Combo;

    @ManyToOne(() => Item, (item) => item.comboItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'itemId' })
    item: Item;
}