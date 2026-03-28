import { Controller, Post, Body } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) {}

    @Post('register')
    async register(
        @Body() body: { username: string; password: string; ownerId: string },
    ) {
        const { username, password, ownerId } = body;

        // Call service to create location
        await this.locationsService.createLocation(username, password, ownerId);

        return { message: 'Location registered successfully' };
    }
}