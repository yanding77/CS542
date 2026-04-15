import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import {ItemCategory} from "../database/entities/item-category.enum";

export class CreateItemDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    category: ItemCategory;

    @IsArray()
    allergens: number[]; // IDs

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    prepTime?: number;

    @IsOptional()
    @IsString()
    alcoholContent?: string;

    @IsBoolean()
    refillable: boolean;

    @IsString()
    locationId: string;
}