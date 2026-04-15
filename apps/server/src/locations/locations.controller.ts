import {Controller, Post, Body, Get, Request, UseGuards, ForbiddenException, Req} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) {}

    // route is /locations/register
    @Post('register')
    @UseGuards(AuthGuard('jwt'))
    async register(@Req() req, @Body() body) {
        const ownerId = req.user.sub;

        // call service to create location
        await this.locationsService.createLocation(body.username, body.password, ownerId, body.address);

        return { message: 'Location registered successfully' };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('dashboard')
    getDashboard(@Request() req) {
        if (req.user.role !== 'location') {
            throw new ForbiddenException('Access denied');
        }

        // TODO: remove after testing
        return { message: `Welcome Location ${req.user.sub}!` };
    }
}