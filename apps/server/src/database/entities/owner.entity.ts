// src/database/entities/owner.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Location } from './location.entity';

@Entity('owners')
export class Owner {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password_hash: string;

    @Column()
    restaurant_name: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Location, (location) => location.owner)
    locations: Location[];
}