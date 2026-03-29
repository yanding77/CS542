import {
    Entity,
    Column,
    JoinColumn,
    CreateDateColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import {Location} from "./location.entity";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Location, (location) => location.menus, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'locationId' })
    location: Location;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @Column()
    status: string;

    @CreateDateColumn()
    created_at: Date;
}