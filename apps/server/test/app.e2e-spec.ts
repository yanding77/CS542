import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });

    describe('Auth (e2e)', () => {
        let app: INestApplication;

        beforeEach(async () => {
            // This runs BEFORE every test
            // allows test data to be deleted from the database after use
            const moduleFixture: TestingModule = await Test.createTestingModule({
                imports: [AppModule],
            }).compile();

            app = moduleFixture.createNestApplication();
            await app.init();
        });

        it('/owners/register (POST)', async () => {
            const res = await request(app.getHttpServer())
                .post('/owners/register')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                    restaurantName: 'Test Restaurant',
                }).expect(201);

            expect(res.body.message).toBe('Owner created');
        });

        it('/auth/login (POST) - owner', async () => {
            // First create user
            await request(app.getHttpServer())
                .post('/owners/register')
                .send({
                    email: 'login@test.com',
                    password: 'password123',
                    restaurantName: 'Login Test',
                });

            // Then login
            const res = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    email: 'login@test.com',
                    password: 'password123',
                    role: 'owner',
                }).expect(201);

            expect(res.body.access_token).toBeDefined();
        });

        it('/locations/register (POST)', async () => {
            // Create owner first
            const ownerRes = await request(app.getHttpServer())
                .post('/owners/register')
                .send({
                    email: 'owner2@test.com',
                    password: 'password123',
                    restaurantName: 'Owner2',
                });

        await request(app.getHttpServer())
            .post('/locations/register')
            .send({
                username: 'location1',
                password: 'password123',
                ownerId: ownerRes.body.id, // depends on your API
                address: '123 Main St',
            }).expect(201);
        });
    });
});
