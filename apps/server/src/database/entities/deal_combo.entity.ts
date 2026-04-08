import {Entity, ManyToOne, PrimaryColumn, JoinColumn} from 'typeorm';
import {Deal} from "./deal.entity";
import {Combo} from "./combo.entity";

@Entity('deal_combos')
export class DealCombo {
    @PrimaryColumn('uuid')
    dealId: string;

    @PrimaryColumn('uuid')
    comboId: string;

    @ManyToOne(() => Deal, (deal) => deal.dealCombos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'dealId' })
    deal: Deal;

    @ManyToOne(() => Combo, (combo) => combo.dealCombos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'comboId' })
    combo: Combo;
}