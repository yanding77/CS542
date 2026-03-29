import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private db: DatabaseService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string, role: string) {
        try {
            console.log('VALIDATE:', username, role);

            const client = this.db.getClient();
            let accRes;

            if (role === 'owner') {
                accRes = await client.query(
                    'SELECT * FROM owners WHERE LOWER(email) = LOWER($1)',
                    [username],
                );
            } else if (role === 'location') {
                accRes = await client.query(
                    'SELECT * FROM locations WHERE LOWER(username) = LOWER($1)',
                    [username],
                );
            } else {
                return null;
            }

            console.log('QUERY RESULT:', accRes.rows);

            if (!accRes || accRes.rows.length === 0) {
                return null;
            }

            const account = accRes.rows[0];

            console.log('ACCOUNT FOUND:', account);

            const valid = await bcrypt.compare(password, account.password_hash);

            console.log('PASSWORD VALID:', valid);

            if (!valid) return null;

            return {
                id: account.id,
                role,
            };

        } catch (err) {
            console.error('🔥 VALIDATE ERROR:', err);
            throw err;
        }
    }

    async login(body: any) {
        try {
            console.log('LOGIN BODY:', body);

            const { email, username, password, role } = body;

            const user = await this.validateUser(
                email || username,
                password,
                role
            );

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

        } catch (err) {
            console.error('LOGIN ERROR:', err);
            throw err;
        }
    }
}