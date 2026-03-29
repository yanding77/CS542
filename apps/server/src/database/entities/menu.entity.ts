import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Location } from './location.entity';

@Entity('menus')
export class Menu {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Location, (location) => location.menus, { onDelete: 'CASCADE' })
    location: Location;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;
}