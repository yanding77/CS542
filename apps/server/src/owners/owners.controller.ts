import { Controller, Post, Body } from '@nestjs/common';
import { OwnersService } from './owners.service';

@Controller('owners')
export class OwnersController {
    constructor(private readonly ownersService: OwnersService) {}

    @Post('register')
    async register(@Body() body: { email: string; password: string; restaurantName: string }) {
        const { email, password, restaurantName } = body;

        // Call service to create owner
        await this.ownersService.createOwner(email, password, restaurantName);

        return { message: 'Owner registered successfully' };
    }
}