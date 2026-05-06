import {Controller, Get, Post, Body, Param, UseGuards, Req} from '@nestjs/common';
import { DealsService } from './deals.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('deals')
export class DealsController {
    constructor(private dealsService: DealsService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get(':locationId')
    getDealsByLocation(@Param('locationId') locationId: string) {
        return this.dealsService.getDealsByLocation(locationId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    createDeal(@Body() body: any) {
        return this.dealsService.createDeal(body);
    }

    @Get('/get/:id')
    getItem(@Req() req, @Param('id') id: string) {
        return this.dealsService.getDeal(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/update/:id')
    updateItem(@Req() req, @Param('id') id: string, @Body() body) {
        return this.dealsService.updateDeal(id, body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/delete/:id')
    deleteItem(@Req() req, @Param('id') id: string) {
        return this.dealsService.deleteDeal(id);
    }
}