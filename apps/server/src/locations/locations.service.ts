import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocationsService {
    constructor(private db: DatabaseService) {}

    async createLocation(username: string, password: string, ownerId: string) {
        const client = this.db.getClient();
        const passwordHash = await bcrypt.hash(password, 10);

        await client.query(`
            INSERT INTO locations (username, password_hash, owner_id)
            VALUES ($1, $2, $3)`,
            [username, passwordHash, ownerId],
        );
    }
}