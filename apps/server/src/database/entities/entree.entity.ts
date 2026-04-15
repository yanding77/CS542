import {Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Item } from './item.entity';

@Entity('entrees')
export class Entree {
    @PrimaryColumn('uuid')
    id: string;

    @OneToOne(() => Item, { onDelete: 'CASCADE' })
    @JoinColumn()
    item: Item;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;
}