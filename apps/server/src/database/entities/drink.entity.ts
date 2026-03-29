import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity('drinks')
export class Drink {
    @PrimaryColumn('uuid')
    id: string;

    @OneToOne(() => Item, (item) => item.entree, { onDelete: 'CASCADE' })
    @JoinColumn()
    item: Item;

    @Column()
    refillable: boolean;

    @CreateDateColumn()
    created_at: Date;
}