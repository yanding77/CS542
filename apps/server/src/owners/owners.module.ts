import { Module } from '@nestjs/common';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';
import { DatabaseService } from '../database/database.service';

@Module({
    controllers: [OwnersController],
    providers: [OwnersService, DatabaseService],
})
export class OwnersModule {}