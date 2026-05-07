import {
    Controller,
    Get,
    Param,
    Body,
    UseGuards, Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    // POST /orders/:tableId/submit  (guest-facing, no auth)
    @Post(':tableId/submit')
    submitOrder(@Param('tableId') tableId: string) {
        return this.ordersService.submitOrder(tableId);
    }

    // GET /orders/location/:locationId
    @UseGuards(AuthGuard('jwt'))
    @Get('location/:locationId')
    getByLocation(@Param('locationId') locationId: string) {
        return this.ordersService.getOrdersByLocation(locationId);
    }

    // PATCH /orders/:orderId/status
    @UseGuards(AuthGuard('jwt'))
    @Post('update-status/:orderId')
    updateStatus(
        @Param('orderId') orderId: string,
        @Body() body: { status: string },
    ) {
        return this.ordersService.updateOrderStatus(orderId, body.status);
    }
}