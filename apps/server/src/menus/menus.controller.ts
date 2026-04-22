import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { MenusService } from './menus.service';
import { CreateMenuDto } from './CreateMenuDto';

@Controller('menus')
export class MenusController {
    constructor(private menusService: MenusService) {}

    // Get all menus for a location
    @UseGuards(AuthGuard('jwt'))
    @Get(':locationId')
    getMenus(@Param('locationId') locationId: string) {
        return this.menusService.getMenusByLocation(locationId);
    }

    // Create menu
    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    createMenu(@Body() dto: CreateMenuDto) {
        return this.menusService.createMenu(dto);
    }
}