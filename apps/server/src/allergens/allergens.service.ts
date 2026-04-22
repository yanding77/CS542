import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Allergen} from "../database/entities/allergen.entity";
import {Repository} from "typeorm";

@Injectable()
export class AllergensService {
    constructor(
        @InjectRepository(Allergen)
        private allergenRepo: Repository<Allergen>,
    ) {}

    async findAll() {
        return this.allergenRepo.find();
    }
}