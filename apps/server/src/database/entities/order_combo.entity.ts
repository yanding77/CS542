import {Entity, ManyToOne, PrimaryColumn, JoinColumn, Column} from 'typeorm';
import {Order} from "./order.entity";
import {Combo} from "./combo.entity";

@Entity('order_combos')
export class OrderCombo {
    @PrimaryColumn('uuid')
    orderId: string;

    @PrimaryColumn('uuid')
    comboId: string;

    @ManyToOne(() => Order, (order) => order.orderCombos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orderId' })
    order: Order;

    @ManyToOne(() => Combo, (combo) => combo.orderCombos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'comboId' })
    combo: Combo;

    @Column('int')
    quantity: number;

    @Column( {nullable: true} )
    dietaryRestrictions: string;
}