import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Menu } from '../database/entities/menu.entity';
import { MenuItem } from '../database/entities/menu_item.entity';
import { MenuCombo } from '../database/entities/menu_combo.entity';

import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Menu,
      MenuItem,
      MenuCombo,
    ]),
  ],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}