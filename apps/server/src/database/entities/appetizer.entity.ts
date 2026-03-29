import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity('appetizers')
export class Appetizer {
    @PrimaryColumn('uuid')
    id: string;

    @OneToOne(() => Item, (item) => item.entree, { onDelete: 'CASCADE' })
    @JoinColumn()
    item: Item;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;
}