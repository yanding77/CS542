export class CreateMenuDto {
    name: string;
    locationId: string;
    items: string[];   // item IDs
    combos: string[];  // combo IDs
}