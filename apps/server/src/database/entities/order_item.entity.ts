import {Entity, ManyToOne, PrimaryColumn, JoinColumn, Column} from 'typeorm';
import {Order} from "./order.entity";
import {Item} from "./item.entity";

@Entity('order_items')
export class OrderItem {
    @PrimaryColumn('uuid')
    orderId: string;

    @PrimaryColumn('uuid')
    itemId: string;

    @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orderId' })
    order: Order;

    @ManyToOne(() => Item, (item) => item.orderItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'itemId' })
    item: Item;

    @Column('int')
    quantity: number;

    @Column( {nullable: true} )
    dietaryRestrictions: string;
}