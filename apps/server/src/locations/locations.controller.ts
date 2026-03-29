import { Controller, Post, Body, Get, Request, UseGuards, ForbiddenException } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) {}

    @Post('register')
    async register(@Body() body: { username: string; password: string; ownerId: string }) {
        const { username, password, ownerId } = body;

        // Call service to create location
        await this.locationsService.createLocation(username, password, ownerId);

        return { message: 'Location registered successfully' };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('dashboard')
    getDashboard(@Request() req) {
        if (req.user.role !== 'location') {
            throw new ForbiddenException('Access denied');
        }

        // You can fetch location-specific data here
        return { message: `Welcome Location ${req.user.sub}!` };
    }
}