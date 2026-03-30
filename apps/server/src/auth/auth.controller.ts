import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // route is /auth/login
    @Post('login')
    login(@Body() body: any) {
        return this.authService.login(body);
    }
}