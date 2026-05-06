import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TablesService } from './tables.service';

@Controller('tables')
export class TablesController {
    constructor(private readonly tablesService: TablesService) {}

    // GET all tables by location
    @UseGuards(AuthGuard('jwt'))
    @Get('/:locationId')
    getTables(@Param('locationId') locationId: string) {
        return this.tablesService.getTablesByLocation(locationId);
    }

    // GET single table
    @UseGuards(AuthGuard('jwt'))
    @Get('/get/:id')
    getTable(@Param('id') id: string) {
        return this.tablesService.getTableById(id);
    }

    // CREATE table
    @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    createTable(@Body() body) {
        return this.tablesService.createTable({
            tableid: body.tableid,
            locationId: body.locationId,
            qrCodeData: body.qrCodeData,
        });
    }

    // UPDATE table
    @UseGuards(AuthGuard('jwt'))
    @Post('/update/:id')
    updateTable(@Param('id') id: string, @Body() body) {
        return this.tablesService.updateTable(id, body);
    }

    // DELETE table
    @UseGuards(AuthGuard('jwt'))
    @Post('/delete/:id')
    deleteTable(@Param('id') id: string) {
        return this.tablesService.deleteTable(id);
    }
}