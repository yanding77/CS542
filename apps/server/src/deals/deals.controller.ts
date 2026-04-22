import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
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
}