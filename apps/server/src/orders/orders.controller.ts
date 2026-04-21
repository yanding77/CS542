import {
    Controller,
    Get,
    Param,
    Patch,
    Body,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    // GET /orders/location/:locationId
    @UseGuards(AuthGuard('jwt'))
    @Get('location/:locationId')
    getByLocation(@Param('locationId') locationId: string) {
        return this.ordersService.getOrdersByLocation(locationId);
    }

    // PATCH /orders/:orderId/status
    @UseGuards(AuthGuard('jwt'))
    @Patch(':orderId/status')
    updateStatus(
        @Param('orderId') orderId: string,
        @Body() body: { status: string },
    ) {
        return this.ordersService.updateOrderStatus(orderId, body.status);
    }
}