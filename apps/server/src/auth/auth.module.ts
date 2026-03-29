import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseModule } from "../database/database.module";
import {OwnersService} from "../owners/owners.service";
import {LocationsService} from "../locations/locations.service";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'secret',          // move to .env in production
            signOptions: { expiresIn: '1h' },  // token expiration
        }),
        DatabaseModule,
    ],
    providers: [AuthService, JwtStrategy, OwnersService, LocationsService],
    controllers: [AuthController],
    exports: [AuthService, OwnersService, LocationsService],
})
export class AuthModule {}