import {Entity, ManyToOne, PrimaryColumn, JoinColumn} from 'typeorm';
import {Item} from "./item.entity";
import {Deal} from "./deal.entity";

@Entity('deal_items')
export class DealItem {
    @PrimaryColumn('uuid')
    dealId: string;

    @PrimaryColumn('uuid')
    itemId: string;

    @ManyToOne(() => Deal, (deal) => deal.dealItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'dealId' })
    deal: Deal;

    @ManyToOne(() => Item, (item) => item.dealItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'itemId' })
    item: Item;
}