import {Controller, Post, Body, Get, Request, UseGuards, ForbiddenException, Req, Param} from '@nestjs/common';
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
    @Get('dashboard/:locationId')
    async getDashboard(
        @Param('locationId') locationId: string,
        @Req() req
    ) {
        console.log('USER:', req.user);
        console.log('LOCATION ID:', locationId);

        const user = req.user;

        // LOCATION USERS -> only allowed their own dashboard
        if (user.role === 'location') {
            return this.locationsService.getDashboard(user.sub);
        }

        // OWNER USERS -> can access any location
        if (user.role === 'owner') {
            return this.locationsService.getDashboard(locationId);
        }

        throw new ForbiddenException('Invalid role');
    }
}