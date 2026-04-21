import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Menu } from '../database/entities/menu.entity';
import { MenuItem } from '../database/entities/menu_item.entity';
import { MenuCombo } from '../database/entities/menu_combo.entity';

import { CreateMenuDto } from './CreateMenuDto';

@Injectable()
export class MenusService {
    constructor(
        @InjectRepository(Menu)
        private menuRepo: Repository<Menu>,

        @InjectRepository(MenuItem)
        private menuItemRepo: Repository<MenuItem>,

        @InjectRepository(MenuCombo)
        private menuComboRepo: Repository<MenuCombo>,
    ) {}

    // 🔹 Get menus by location
    async getMenusByLocation(locationId: string) {
        return this.menuRepo.find({
            where: {
                location: { id: locationId },
            },
            relations: [
                'menuItems',
                'menuItems.item',
                'menuCombos',
                'menuCombos.combo',
            ],
        });
    }

    // 🔹 Create menu
    async createMenu(dto: CreateMenuDto) {
        const { name, locationId, items, combos } = dto;

        // 1. Create base menu
        const menu = this.menuRepo.create({
            name,
            location: { id: locationId },
        });

        const savedMenu = await this.menuRepo.save(menu);

        // 2. Create MenuItems (join table)
        if (items && items.length > 0) {
            const menuItems = items.map((itemId) =>
                this.menuItemRepo.create({
                    menuId: savedMenu.id,
                    itemId,
                })
            );

            await this.menuItemRepo.save(menuItems);
        }

        // 3. Create MenuCombos (join table)
        if (combos && combos.length > 0) {
            const menuCombos = combos.map((comboId) =>
                this.menuComboRepo.create({
                    menuId: savedMenu.id,
                    comboId,
                })
            );

            await this.menuComboRepo.save(menuCombos);
        }

        return savedMenu;
    }
}