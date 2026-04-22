import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';

import { Deal } from '../database/entities/deal.entity';
import { DealItem } from '../database/entities/deal_item.entity';
import { DealCombo } from '../database/entities/deal_combo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Deal, DealItem, DealCombo]),
  ],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}