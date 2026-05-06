import {Entity, Column, JoinColumn, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Location} from "./location.entity";
import {TableOrder} from "./table_order.entity";
import {OrderItem} from "./order_item.entity";
import {OrderCombo} from "./order_combo.entity";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Location, (location) => location.orders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'locationId' })
    location: Location;

    @OneToMany(() => TableOrder, (tableOrder) => tableOrder.order)
    tableOrders: TableOrder[];

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order,
        { nullable: true })
    orderItems: OrderItem[];

    @OneToMany(() => OrderCombo, (orderCombo) => orderCombo.order,
        { nullable: true })
    orderCombos: OrderCombo[];

    @Column({ type: 'timestamptz', default: () => 'NOW()' })
    startTime: Date;

    @Column({ type: 'timestamptz', nullable: true })
    endTime: Date;

    @Column()
    status: string;

    @CreateDateColumn()
    created_at: Date;
}