import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Location } from './entities/location.entity';
import { Menu } from './entities/menu.entity';
import { Item } from './entities/item.entity';
import { Side } from './entities/side.entity';
import { Entree } from './entities/entree.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 5432,
            username: process.env.DB_USER || 'user',
            password: process.env.DB_PASSWORD || 'password123',
            database: process.env.DB_NAME || 'restaurantDB',
            entities: [Owner, Location, Menu, Item, Side, Entree],
            synchronize: true, // auto-create tables in dev (disable in production)
        }),
        TypeOrmModule.forFeature([Owner, Location, Menu, Item, Side, Entree]),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}