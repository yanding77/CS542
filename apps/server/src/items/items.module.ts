import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item } from '../database/entities/item.entity';
import {AllergensModule} from "../allergens/allergens.module";

@Module({
  imports: [TypeOrmModule.forFeature([Item]), AllergensModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}