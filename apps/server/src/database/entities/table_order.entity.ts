import {Entity, ManyToOne, PrimaryColumn, JoinColumn} from 'typeorm';
import {Order} from "./order.entity";
import {Table} from "./table.entity";

@Entity('table_orders')
export class TableOrder {
    @PrimaryColumn('uuid')
    tableId: string;

    @PrimaryColumn('uuid')
    orderId: string;

    @ManyToOne(() => Table, (table) => table.tableOrders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'tableId' })
    table: Table;

    @ManyToOne(() => Order, (order) => order.tableOrders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orderId' })
    order: Order;
}