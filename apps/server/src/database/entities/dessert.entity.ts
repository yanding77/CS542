import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity('desserts')
export class Dessert {
    @PrimaryColumn('uuid')
    id: string;

    @OneToOne(() => Item, (item) => item.entree, { onDelete: 'CASCADE' })
    @JoinColumn()
    item: Item;

    @Column()
    description: string;

    @Column('int', { nullable: true })
    prepTime: number;

    @CreateDateColumn()
    created_at: Date;
}