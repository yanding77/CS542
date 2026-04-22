export class CreateDealDto {
    name: string;
    price: number;
    startDate: Date;
    endDate: Date;
    locationId: string;
    items?: string[];
    combos?: string[];
}