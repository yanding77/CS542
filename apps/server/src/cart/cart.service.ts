import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BaseMenuItem, ItemDTO, TableCart } from "../types/types";
import { CompleteMenuItems } from "../data/menu";

@Injectable()
export class CartService {
    private readonly carts = new Map<string, TableCart>();
    private readonly menuItems = new Map<string, BaseMenuItem>();

    constructor() {
        CompleteMenuItems.forEach(item => {
            this.menuItems.set(item.id, {
                id: item.id,
                name: item.name,
                price: item.price,
            });
        });

        this.carts.set('mesa1', {
            tableId: 'mesa1',
            items: [],
            totalPrice: 0,
            itemCount: 0,
        });

        this.carts.set('mesa2', {
            tableId: 'mesa2',
            items: [],
            totalPrice: 0,
            itemCount: 0,
        });
    }

    getCart(tableId: string): TableCart {
        let cart = this.carts.get(tableId);
        if (!cart) {
            throw new BadRequestException('Table not found');
        }
        return cart;
    }

    addItem(tableId: string, dto: ItemDTO): TableCart {
        const cart = this.getCart(tableId);
        const menuItem = this.menuItems.get(dto.productId);

        if (!menuItem) throw new NotFoundException('Product not found in menu');
        if (cart.itemCount >= 50) throw new BadRequestException('Cart if full');

        const existingItem = cart.items.find(
            (i) => i.id === dto.productId,
        );

        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.subtotal = existingItem.quantity * existingItem.price;
        } else {
            cart.items.push({
                id: menuItem.id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: 1,
                subtotal: menuItem.price,
                addedBy: dto.clientId,
            });
        }

        return this.recalculate(cart);
    }
    removeItem(tableId: string, dto: ItemDTO): TableCart {
        const cart = this.getCart(tableId);
        const menuItem = this.menuItems.get(dto.productId);
        if (!menuItem) throw new NotFoundException('Product not found in menu');

        const itemIndex = cart.items.findIndex(
            (i) => i.id === dto.productId,
        );

        if (itemIndex === -1) throw new NotFoundException('Product not found in cart');

        const item = cart.items[itemIndex];

        if (item.quantity > 1) {
            item.quantity -= 1;
            item.subtotal = item.quantity * item.price;
        } else {
            // If quantity is 1, remove the entry entirely
            cart.items.splice(itemIndex, 1);
        }

        return this.recalculate(cart);
    }

    private recalculate(cart: TableCart): TableCart {
        cart.totalPrice = Number(
            cart.items.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2),
        );
        cart.itemCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
        return cart;
    }
}