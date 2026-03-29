import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToOne } from 'typeorm';
import { Location } from './location.entity';
import { Side } from './side.entity';
import { Entree } from './entree.entity';

@Entity('items')
export class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Location, (location) => location.items, { onDelete: 'CASCADE' })
    location: Location;

    @Column()
    name: string;

    @Column('float')
    price: number;

    @CreateDateColumn()
    created_at: Date;

    @OneToOne(() => Side, (side) => side.item)
    side: Side;

    @OneToOne(() => Entree, (entree) => entree.item)
    entree: Entree;
}