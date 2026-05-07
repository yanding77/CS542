import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { AuthGuard } from '@nestjs/passport';
import { AllergensService } from "../allergens/allergens.service";

@Controller('items')
export class ItemsController {
    constructor(
        private itemsService: ItemsService,
        private allergensService: AllergensService,
    ) { }

    @Get('allergens')
    getAllergens() {
        return this.allergensService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    createItem(@Req() req, @Body() body) {
        return this.itemsService.createItem(body);
    }

    @Get('/get/:id')
    getItem(@Req() req, @Param('id') id: string) {
        return this.itemsService.getItem(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/update/:id')
    updateItem(@Req() req, @Param('id') id: string, @Body() body) {
        return this.itemsService.updateItem(id, body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/delete/:id')
    deleteItem(@Req() req, @Param('id') id: string) {
        return this.itemsService.deleteItem(id);
    }

    @Get(':slug')
    getItemsByLocation(@Param('slug') slug: string) {
        return this.itemsService.getSlug(slug);
    }
}