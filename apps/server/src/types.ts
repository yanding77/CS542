export class AddItemDto {
    readonly productId: string;
    readonly name: string;
    readonly price: number;
}

export class DeleteItemDto {
    readonly productId: string;
    readonly name: string;
    readonly price: number;
}


export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    total: number;
}