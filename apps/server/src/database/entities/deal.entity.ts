import {Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn, ManyToOne} from 'typeorm';
import {Location} from "./location.entity";

@Entity('deals')
export class Deal {
    @PrimaryColumn('uuid')
    id: string;

    @ManyToOne(() => Location, (location) => location.menus, { onDelete: 'CASCADE' })
    location: Location;

    @Column()
    name: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column('float')
    price: number;

    @CreateDateColumn()
    created_at: Date;
}