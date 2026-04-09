import {Controller, Get, Param, Delete, Body, Patch} from '@nestjs/common';
import {CartService} from "./cart.service";
import {ItemDTO} from "../types/types";

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get(':tableId')
    getCart(@Param('tableId') tableId: string) {
        return this.cartService.getCart(tableId);
    }

    @Patch(':tableId/add')
    addItem(@Param('tableId') tableId: string, @Body() dto: ItemDTO) {
        return this.cartService.addItem(tableId, dto);
    }

    @Delete(':tableId/remove')
    removeItem(
        @Param('tableId') tableId: string, @Body() dto: ItemDTO
    ) {
        return this.cartService.removeItem(tableId, dto);
    }
}
