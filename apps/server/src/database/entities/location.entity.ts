import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { Owner } from './owner.entity';
import { Menu } from './menu.entity';
import { Item } from './item.entity';

@Entity('locations')
export class Location {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Owner, (owner) => owner.locations, { onDelete: 'CASCADE' })
    owner: Owner;

    @Column({ unique: true })
    username: string;

    @Column()
    password_hash: string;

    @Column({ nullable: true })
    address: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Menu, (menu) => menu.location)
    menus: Menu[];

    @OneToMany(() => Item, (item) => item.location)
    items: Item[];
}