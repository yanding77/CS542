import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {ItemsService} from "../items/items.service";
import {CombosService} from "./combos.service";
import {AuthGuard} from "@nestjs/passport";

@Controller('combos')
export class CombosController {
    constructor(
        private comboService: CombosService,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get(':locationId')
    getCombosByLocation(@Param('locationId') locationId: string) {
        return this.comboService.getCombosByLocation(locationId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    createCombo(@Req() req, @Body() body) {
        return this.comboService.createCombo(body);
    }

    @Get('/get/:id')
    getItem(@Req() req, @Param('id') id: string) {
        return this.comboService.getCombo(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/update/:id')
    updateItem(@Req() req, @Param('id') id: string, @Body() body) {
        return this.comboService.updateCombo(id, body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/delete/:id')
    deleteItem(@Req() req, @Param('id') id: string) {
        return this.comboService.deleteCombo(id);
    }
}
