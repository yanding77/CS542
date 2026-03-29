import { Entity, PrimaryColumn, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity('sides')
export class Side {
    @PrimaryColumn('uuid')
    id: string;

    @OneToOne(() => Item, (item) => item.side, { onDelete: 'CASCADE' })
    @JoinColumn()
    item: Item;

    @CreateDateColumn()
    created_at: Date;
}