import {
    Entity,
    PrimaryColumn,
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import {Location} from "./location.entity";
import {DealItem} from "./deal_item.entity";
import {DealCombo} from "./deal_combo.entity";

@Entity('deals')
export class Deal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Location, (location) => location.menus, { onDelete: 'CASCADE' })
    location: Location;

    @Column()
    name: string;

    @OneToMany(() => DealItem, (dealItem) => dealItem.deal,
        { nullable: true })
    dealItems: DealItem[];

    @OneToMany(() => DealCombo, (dealCombo) => dealCombo.deal,
        { nullable: true })
    dealCombos: DealCombo[];

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column('float')
    price: number;

    @CreateDateColumn()
    created_at: Date;
}