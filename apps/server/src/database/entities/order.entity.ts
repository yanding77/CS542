import {Entity, Column, JoinColumn, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Location} from "./location.entity";
import {TableOrder} from "./table_order.entity";
import {OrderItem} from "./order_item.entity";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Location, (location) => location.menus, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'locationId' })
    location: Location;

    @OneToMany(() => TableOrder, (tableOrder) => tableOrder.order)
    tableOrders: TableOrder[];

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order,
        { nullable: true })
    orderItems: OrderItem[];

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @Column()
    status: string;

    @CreateDateColumn()
    created_at: Date;
}