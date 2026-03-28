import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private db: DatabaseService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string) {
        const client = this.db.getClient();

        // 🔍 Check owners first
        const ownerRes = await client.query(
            'SELECT * FROM owners WHERE email = $1',
            [username],
        );

        if (ownerRes.rows.length > 0) {
            const owner = ownerRes.rows[0];

            const valid = await bcrypt.compare(password, owner.password_hash);
            if (!valid) return null;

            return {
                id: owner.id,
                role: 'owner',
                email: owner.email,
            };
        }

        // 🔍 Check locations
        const locRes = await client.query(
            'SELECT * FROM locations WHERE username = $1',
            [username],
        );

        if (locRes.rows.length > 0) {
            const loc = locRes.rows[0];

            const valid = await bcrypt.compare(password, loc.password_hash);
            if (!valid) return null;

            return {
                id: loc.id,
                role: 'location',
                ownerId: loc.owner_id,
            };
        }

        return null;
    }

    async login(username: string, password: string) {
        const user = await this.validateUser(username, password);

        if (!user) {
            throw new Error('Invalid credentials');
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