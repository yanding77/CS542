import {Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Item } from './item.entity';

// appetizers(id <=FK= item, description, created_at)
@Entity('appetizers')
export class Appetizer {
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