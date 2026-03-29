import {Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn, ManyToOne} from 'typeorm';
import {Location} from "./location.entity";

@Entity('tables')
export class Table {
    @PrimaryColumn()
    number: number;

    @PrimaryColumn()
    locationId: string;

    @ManyToOne(() => Location, (location) => location.menus, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'locationId' })
    location: Location;

    @Column()
    qrCodeData: string;

    @CreateDateColumn()
    created_at: Date;
}