import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../database/entities/location.entity';
import { Owner } from '../database/entities/owner.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(Location)
        private locationRepo: Repository<Location>,

        @InjectRepository(Owner)
        private ownerRepo: Repository<Owner>, // Needed for linking owner
    ) {}

    async createLocation(
        username: string,
        password: string,
        ownerId: string,
        address?: string,
    ) {
        const passwordHash = await bcrypt.hash(password, 10);

        const location = this.locationRepo.create({
            username,
            password_hash: passwordHash,
            address,
            owner: { id: ownerId },
        });

        await this.locationRepo.save(location);

        return { message: 'Location created' };
    }

    async findLocationByUsername(username: string) {
        return this.locationRepo.findOne({ where: { username: username } });
    }
}