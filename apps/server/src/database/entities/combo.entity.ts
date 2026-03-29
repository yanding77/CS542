import {Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn, ManyToOne} from 'typeorm';
import {Location} from "./location.entity";

@Entity('combos')
export class Combo {
    @PrimaryColumn('uuid')
    id: string;

    @ManyToOne(() => Location, (location) => location.menus, { onDelete: 'CASCADE' })
    location: Location;

    @Column()
    name: string;

    @Column('float')
    price: number;

    @CreateDateColumn()
    created_at: Date;
}