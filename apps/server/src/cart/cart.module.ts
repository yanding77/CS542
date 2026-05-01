import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../database/entities/item.entity';
import { Table } from '../database/entities/table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Table])],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule { }
