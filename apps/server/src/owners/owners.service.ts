import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OwnersService {
    constructor(private db: DatabaseService) {}

    async createOwner(email: string, password: string, restaurantName: string) {
        const client = this.db.getClient();

        // 🔐 hash password HERE
        const passwordHash = await bcrypt.hash(password, 10);

        await client.query(`
            INSERT INTO owners (email, password_hash, restaurant_name)
            VALUES ($1, $2, $3)`,
            [email, passwordHash, restaurantName],
        );

        return { message: 'Owner created' };
    }
}