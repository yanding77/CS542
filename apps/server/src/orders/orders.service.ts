import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../database/entities/order.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepo: Repository<Order>,
    ) {}

    // GET all orders for a location
    async getOrdersByLocation(locationId: string) {
        return this.orderRepo.find({
            where: {
                location: { id: locationId },
            },
            relations: {
                orderItems: {
                    item: true,
                },
                tableOrders: true,
            },
            order: {
                created_at: 'DESC',
            },
        });
    }

    // PATCH order status
    async updateOrderStatus(orderId: string, status: string) {
        await this.orderRepo.update(orderId, { status });

        return this.orderRepo.findOne({
            where: { id: orderId },
            relations: {
                orderItems: { item: true },
            },
        });
    }

    // optional helper (if you ever want backend grouping instead of frontend)
    async getGroupedOrders(locationId: string) {
        const orders = await this.getOrdersByLocation(locationId);

        return {
            inProgress: orders.filter(o => o.status !== 'completed'),
            completed: orders.filter(o => o.status === 'completed'),
        };
    }
}