import { Module } from '@nestjs/common';
import { AllergensService } from './allergens.service';
import { AllergensController } from './allergens.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Allergen} from "../database/entities/allergen.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Allergen])],
  providers: [AllergensService],
  exports: [AllergensService],
})
export class AllergensModule {}