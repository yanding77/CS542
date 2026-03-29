import { Controller, Post, Body, Get, Request, UseGuards, ForbiddenException } from '@nestjs/common';
import { OwnersService } from './owners.service';
import {AuthGuard} from '@nestjs/passport';

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

    @UseGuards(AuthGuard('jwt'))
    @Get('dashboard')
    getDashboard(@Request() req) {
        if (req.user.role !== 'owner') {
            throw new ForbiddenException('Access denied');
        }

        return { message: `Welcome Owner ${req.user.sub}!`}
    }
}