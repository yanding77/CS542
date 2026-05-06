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
                orderCombos: {
                    combo: true,
                },
                tableOrders: true,
                location: true,
            },
            order: {
                created_at: 'DESC',
            },
        });
    }

    // PATCH order status
    async updateOrderStatus(orderId: string, status: string) {
        const order = await this.orderRepo.findOne({
            where: { id: orderId },
        });

        if (!order) {
            throw new Error('Order not found');
        }

        order.status = status;

        // ✅ If order becomes PAID, stamp endTime
        if (status === 'PAID') {
            order.endTime = new Date();
        }

        await this.orderRepo.save(order);

        return this.orderRepo.findOne({
            where: { id: orderId },
            relations: {
                orderItems: { item: true },
                orderCombos: { combo: true },
                tableOrders: true,
            },
        });
    }

    // optional helper (if you ever want backend grouping instead of frontend)
    async getGroupedOrders(locationId: string) {
        const orders = await this.getOrdersByLocation(locationId);

        return {
            inProgress: orders.filter(o => o.status !== 'PAID'),
            completed: orders.filter(o => o.status === 'PAID'),
        };
    }
}