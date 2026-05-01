import { NestFactory } from "@nestjs/core"
import { AppModule } from "../app.module"
import { Repository } from "typeorm";
import { Table } from "./entities/table.entity";
import { Owner } from "./entities/owner.entity";
import { Location } from "./entities/location.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ItemsService } from "src/items/items.service";
import { SEED_ITEMS } from "./seed-data";
import { ItemCategory } from "./entities/item-category.enum";
import bcrypt from "bcrypt"


async function bootstrap() {

    const app = await NestFactory.createApplicationContext(AppModule);

    const ownerRepo = app.get<Repository<Owner>>(getRepositoryToken(Owner));

    const locationRepo = app.get<Repository<Location>>(getRepositoryToken(Location));
    const itemsService = app.get(ItemsService);

    console.log("Clearing old data...");
    await ownerRepo.createQueryBuilder().delete().from(Owner).execute();



    console.log("Creating owner...");
    const hash1 = bcrypt.hashSync("admin", 10);
    const owner = ownerRepo.create(
        {
            email: 'admin@test.com',
            password_hash: hash1,
            restaurant_name: 'La Balsa',
        }
    );
    await ownerRepo.save(owner)

    console.log("Creating Location...");
    const hash2 = bcrypt.hashSync("password1", 10);
    const location = locationRepo.create(
        {
            owner,
            username: "labalsa",
            password_hash: hash2,
            address: "123 Main St",

        }
    );
    await locationRepo.save(location);


    console.log("Seeding tables...");
    const tableRepo = app.get<Repository<Table>>(getRepositoryToken(Table));

    for (let i = 1; i <= 5; i++) {
        await tableRepo.save({
            tableid: `mesa${i}`,
            location,
            qrCodeData: `http://localhost:5170/${location.username}/mesa${i}`,
        });
    }
    console.log("Seeding items...");

    for (const item of SEED_ITEMS) {
        await itemsService.createItem(
            {
                name: item.name,
                price: item.price,
                category: item.category as ItemCategory,
                image: item.image,
                allergens: [],
                refillable: false,
                locationId: location.id,
                description: '',

            }
        );
    }

    console.log("Seeding complete!");
    await app.close();
}

bootstrap().catch(console.error);
