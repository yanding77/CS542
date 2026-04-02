import { Module } from '@nestjs/common';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';
import {DatabaseModule} from "../database/database.module";


@Module({
    imports: [DatabaseModule],
    controllers: [OwnersController],
    providers: [OwnersService],
})
export class OwnersModule {}