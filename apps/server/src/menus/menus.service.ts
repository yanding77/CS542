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

    async getMenu(id: string) {
        return this.menuRepo.findOne({
            where: { id },
            relations: {
                menuItems: { item: true },
                menuCombos: { combo: true },
                location: true
            },
        });
    }

    async updateMenu(id: string, dto: CreateMenuDto) {
        const { name, items, combos } = dto;

        const menu = await this.menuRepo.findOne({ where: { id } });
        if (!menu) throw new Error('Menu not found');

        // update base
        menu.name = name;
        await this.menuRepo.save(menu);

        // clear joins
        await this.menuItemRepo.delete({ menuId: id });
        await this.menuComboRepo.delete({ menuId: id });

        // re-create items
        const menuItems = (items || []).map(itemId =>
            this.menuItemRepo.create({ menuId: id, itemId })
        );

        const menuCombos = (combos || []).map(comboId =>
            this.menuComboRepo.create({ menuId: id, comboId })
        );

        await this.menuItemRepo.save(menuItems);
        await this.menuComboRepo.save(menuCombos);

        return this.getMenu(id);
    }

    async deleteMenu(id: string) {
        const menu = await this.menuRepo.findOne({
            where: { id },
        });

        if (!menu) {
            throw new Error(`Menu with id ${id} not found`);
        }

        await this.menuRepo.delete(id);

        return {
            success: true,
            message: `Menu ${id} deleted successfully`,
        };
    }
}