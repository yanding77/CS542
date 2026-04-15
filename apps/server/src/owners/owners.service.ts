import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from '../database/entities/owner.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OwnersService {
    constructor(
        @InjectRepository(Owner)
        private ownerRepo: Repository<Owner>,
    ) {}

    async createOwner(email: string, password: string, restaurantName: string) {
        const passwordHash = await bcrypt.hash(password, 10);

        const owner = this.ownerRepo.create({
            email: email.toLowerCase(), // lowercase for consistency
            password_hash: passwordHash,
            restaurant_name: restaurantName,
        });

        await this.ownerRepo.save(owner);

        return { message: 'Owner created' };
    }

    async findOwnerByEmail(email: string) {
        return this.ownerRepo.findOne({ where: { email: email.toLowerCase() } });
    }

    async getDashboard(ownerId: string) {
        const owner = await this.ownerRepo.findOne({
            where: { id: ownerId },
            relations: ['locations'],
        });

        if (!owner) {
            throw new NotFoundException('Owner not found.');
        }

        return {
            owner: {
                id: owner.id,
                email: owner.email,
                restaurantName: owner.restaurant_name,
            },
            locations: owner.locations,
        };
    }
}