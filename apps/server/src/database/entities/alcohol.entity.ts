import {Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Item } from './item.entity';

// alcoholicDrinks(id <=FK= item, alcoholContent, created_at)
@Entity('alcoholicDrinks')
export class Alcohol {
    @PrimaryColumn('uuid')
    id: string;

    @OneToOne(() => Item, { onDelete: 'CASCADE' })
    @JoinColumn()
    item: Item;

    @Column('float')
    alcoholContent: number;

    @CreateDateColumn()
    created_at: Date;
}