import { Controller, Get, Param, Post, Delete, Body } from '@nestjs/common';
import {CartService} from "./cart.service";
import {AddItemDto} from "../types/types";

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get(':tableId')
    getCart(@Param('tableId') tableId: string) {
        return this.cartService.getCart(tableId);
    }

    @Post(':tableId/add')
    addItem(@Param('tableId') tableId: string, @Body() dto: AddItemDto) {
        return this.cartService.addItem(tableId, dto);
    }

    @Delete(':tableId/remove/:productId/:clientId')
    removeItem(
        @Param('tableId') tableId: string,
        @Param('productId') productId: string,
        @Param('clientId') clientId: string,
    ) {
        return this.cartService.removeItem(tableId, productId, clientId);
    }
}
