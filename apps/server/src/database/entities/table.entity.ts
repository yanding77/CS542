import {Entity, Column, JoinColumn, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Location} from "./location.entity";
import {TableOrder} from "./table_order.entity";

@Entity('tables')
export class Table {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    number: number;

    @Column()
    locationId: string;

    @ManyToOne(() => Location, (location) => location.menus, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'locationId' })
    location: Location;

    @Column()
    qrCodeData: string;

    @OneToMany(() => TableOrder, (tableOrder) => tableOrder.table,
        { nullable: true })
    tableOrders: TableOrder[];

    @CreateDateColumn()
    created_at: Date;
}