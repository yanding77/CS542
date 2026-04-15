import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import { ItemsService } from './items.service';
import { AuthGuard } from '@nestjs/passport';
import {AllergensService} from "../allergens/allergens.service";

@Controller('items')
export class ItemsController {
    constructor(
        private itemsService: ItemsService,
        private allergensService: AllergensService,
    ) {}

    @Get('allergens')
    getAllergens() {
        return this.allergensService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    createItem(@Req() req, @Body() body) {
        return this.itemsService.createItem(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':locationId')
    getItemsByLocation(@Param('locationId') locationId: string) {
        return this.itemsService.getItemsByLocation(locationId);
    }
}