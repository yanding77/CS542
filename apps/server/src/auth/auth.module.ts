import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseService } from '../database/database.service'; // provide DB access

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'secret',          // move to .env in production
            signOptions: { expiresIn: '1h' },  // token expiration
        }),
    ],
    providers: [AuthService, JwtStrategy, DatabaseService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}