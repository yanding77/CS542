import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from '../database/entities/order.entity';
import { OrderItem } from '../database/entities/order_item.entity';
import { TableOrder } from '../database/entities/table_order.entity';
import { Table } from '../database/entities/table.entity';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepo: Repository<Order>,
        @InjectRepository(Table)
        private tableRepo: Repository<Table>,
        private readonly cartService: CartService,
        private readonly dataSource: DataSource,
    ) {}

    /**
     * Submit the current cart as a new order.
     * Creates Order + OrderItem rows + TableOrder link in a single transaction,
     * then clears the in-memory cart.
     */
    async submitOrder(tableId: string) {
        const cart = await this.cartService.getCart(tableId);

        if (!cart.items.length) {
            throw new BadRequestException('Cart is empty — nothing to submit');
        }

        // Look up the table to get locationId
        const table = await this.tableRepo.findOne({
            where: { tableid: tableId },
        });
        if (!table) {
            throw new BadRequestException('Table not found');
        }

        const now = new Date();

        return this.dataSource.transaction(async (manager) => {
            // 1) Create the order
            const order = manager.create(Order, {
                location: { id: table.locationId },
                startTime: now,
                endTime: now, // placeholder — updated when completed
                status: 'pending',
            });
            const savedOrder = await manager.save(order);

            // 2) Create order_items from cart lines
            const orderItems = cart.items.map((cartItem) =>
                manager.create(OrderItem, {
                    orderId: savedOrder.id,
                    itemId: cartItem.id,
                    quantity: cartItem.quantity,
                }),
            );
            await manager.save(OrderItem, orderItems);

            // 3) Link table ↔ order
            const tableOrder = manager.create(TableOrder, {
                tableId: table.id, // PK uuid, not the friendly tableid
                orderId: savedOrder.id,
            });
            await manager.save(tableOrder);

            // 4) Clear the in-memory cart
            this.cartService.clearCart(tableId);

            // 5) Return the full order with relations
            return manager.findOne(Order, {
                where: { id: savedOrder.id },
                relations: {
                    orderItems: { item: true },
                    tableOrders: true,
                },
            });
        });
    }

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