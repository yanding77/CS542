import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity('entrees')
export class Entree {
    @PrimaryColumn('uuid')
    id: string;

    @OneToOne(() => Item, (item) => item.entree, { onDelete: 'CASCADE' })
    @JoinColumn()
    item: Item;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn()
    created_at: Date;
}