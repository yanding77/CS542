import {
    IsArray,
    IsNumber,
    IsString,
    IsUUID,
    ArrayNotEmpty,
} from 'class-validator';

export class CreateComboDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsUUID()
    locationId: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('4', { each: true })
    items: string[];
}