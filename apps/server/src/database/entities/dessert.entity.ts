import {Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Item } from './item.entity';

@Entity('desserts')
export class Dessert {
    @PrimaryColumn('uuid')
    id: string;

    @OneToOne(() => Item, { onDelete: 'CASCADE' })
    @JoinColumn()
    item: Item;

    @Column()
    description: string;

    @Column('int', { nullable: true })
    prepTime: number | null;

    @CreateDateColumn()
    created_at: Date;
}