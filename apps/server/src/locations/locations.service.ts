import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../database/entities/location.entity';
import { Owner } from '../database/entities/owner.entity';
import * as bcrypt from 'bcrypt';
import {Order} from "../database/entities/order.entity";

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(Location)
        private locationRepo: Repository<Location>,

        @InjectRepository(Owner)
        private ownerRepo: Repository<Owner>, // Needed for linking owner

        @InjectRepository(Order)
        private orderRepo: Repository<Order>,
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

    async getDashboard(locationId: string) {
        const location = await this.locationRepo.findOne({
            where: { id: locationId },
            relations: {
                menus: {
                    menuItems: { item: true },
                    menuCombos: { combo: true },
                },
                items: true,
                combos: {
                    comboItems: {
                        item: true,
                    },
                },
            },
        });

        if (!location) {
            throw new Error('Location not found');
        }

        const orders = await this.orderRepo.find({
            where: { location: { id: locationId } },
            relations: {
                orderItems: { item: true },
            },
            order: { created_at: 'DESC' },
        });

        const inProgressOrders = orders.filter(
            (o) => o.status !== 'completed'
        );

        const completedOrders = orders.filter(
            (o) => o.status === 'completed'
        );

        return {
            location,
            menus: location.menus,
            items: location.items,
            combos: location.combos,
            orders: {
                inProgress: inProgressOrders,
                completed: completedOrders,
            },
        };
    }
}