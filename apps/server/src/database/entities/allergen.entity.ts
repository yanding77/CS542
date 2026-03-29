import { Entity, PrimaryColumn, Column} from 'typeorm';

@Entity('allergens')
export class Allergen {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;
}