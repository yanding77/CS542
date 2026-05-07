import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../database/entities/item.entity';
import { Table } from '../database/entities/table.entity';
import { CartGateway } from './cart.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Table])],
  providers: [CartService, CartGateway],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule { }
