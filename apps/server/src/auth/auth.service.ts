import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {OwnersService} from "../owners/owners.service";
import {LocationsService} from "../locations/locations.service";

@Injectable()
export class AuthService {
    constructor(
        private ownersService: OwnersService,
        private locationService: LocationsService,
        private jwtService: JwtService,
    ) {}

    // function for validating account info on login
    async validateUser(username: string, password: string, role: string) {
        console.log(username, password, role);

        let account;

        if (role === 'owner') {
            account = await this.ownersService.findOwnerByEmail(username.toLowerCase());
        } else if (role === 'location') {
            account = await this.locationService.findLocationByUsername(username);
        } else {
            return null;
        }

        if (!account) return null;

        const valid = await bcrypt.compare(password, account.password_hash);
        if (!valid) return null;

        return {
            id: account.id,
            role,
        };
    }

    // used to check if entered values log into an account
    async login(body: any) {
        const { email, username, password, role } = body;

        const user = await this.validateUser(email || username, password, role);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.id,
            role: user.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}