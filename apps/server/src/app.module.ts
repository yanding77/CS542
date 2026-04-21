import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { OwnersModule } from './owners/owners.module';
import { LocationsModule } from './locations/locations.module';
import { CartModule } from './cart/cart.module';
import { ItemsModule } from './items/items.module';
import { AllergensModule } from './allergens/allergens.module';
import { CombosModule } from './combos/combos.module';
import { DealsModule } from './deals/deals.module';
import { MenusModule } from './menus/menus.module';
import { OrdersModule } from './orders/orders.module';

@Module({
    imports: [DatabaseModule, AuthModule, OwnersModule, LocationsModule, CartModule, ItemsModule, AllergensModule, CombosModule, DealsModule, MenusModule, OrdersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
