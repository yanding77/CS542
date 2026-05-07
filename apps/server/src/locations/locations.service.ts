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

    async findLocationById(id: string) {
        return this.locationRepo.findOne({ where: { id: id } });
    }

    async updateLocation(locationId: string, updateData: {
        username?: string;
        address?: string;
    }) {
        const location = await this.locationRepo.findOne({
            where: { id: locationId },
        });

        if (!location) {
            throw new Error('Location not found');
        }

        if (updateData.username && updateData.username !== location.username) {
            const existing = await this.locationRepo.findOne({
                where: { username: updateData.username },
            });

            if (existing) {
                throw new Error('Username already in use');
            }

            location.username = updateData.username;
        }

        if (updateData.address !== undefined) {
            location.address = updateData.address;
        }

        return await this.locationRepo.save(location);
    }

    async updatePassword(locationId: string, body: {newPassword: string}) {
        const location = await this.locationRepo.findOne({
            where: { id: locationId },
        });

        const newPassword= body.newPassword;

        if (!location) {
            throw new Error('Location not found');
        }

        location.password_hash = await bcrypt.hash(newPassword, 10);

        await this.locationRepo.save(location);

        return { message: 'Password updated successfully' };
    }

    async deleteLocation(id: string) {
        const location = await this.locationRepo.findOne({
            where: { id },
        });

        if (!location) {
            throw new Error(`Location with id ${id} not found`);
        }

        await this.locationRepo.delete(id);

        return {
            success: true,
            message: `Location ${id} deleted successfully`,
        };
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
            (o) => o.status !== 'PAID'
        );

        const completedOrders = orders.filter(
            (o) => o.status === 'PAID'
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