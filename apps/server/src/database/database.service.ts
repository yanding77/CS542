import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit {
    private client = new Client({
        host: process.env.DB_HOST || 'localhost',
        port: 5432,
        user: process.env.DB_USER || 'user',
        password: process.env.DB_PASSWORD || 'password123',
        database: process.env.DB_NAME || 'restaurantDB',
    });

    async onModuleInit() {
        await this.client.connect();

        // Extension needed for ID generation
        await this.client.query(`
            -- Enable UUID generation (needed for gen_random_uuid)
            CREATE EXTENSION IF NOT EXISTS "pgcrypto";
        `);

        // Query to create the owner's accounts table
        await this.client.query(`
            -- Owners table
            CREATE TABLE IF NOT EXISTS owners (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                restaurant_name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Query to make the worker's accounts / location accounts table
        await this.client.query(`
            -- Locations table
            CREATE TABLE IF NOT EXISTS locations (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                owner_id UUID REFERENCES owners(id) ON DELETE CASCADE,
                address TEXT,
                username VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log('Database ready');
    }

    getClient() {
        return this.client;
    }
}