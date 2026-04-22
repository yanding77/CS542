import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from '../database/entities/order.entity';
import { Location } from '../database/entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Location]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}