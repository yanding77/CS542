export class AddItemDto {
    readonly productId: string;
    readonly clientId: string; // Who is adding this?
}

export class DeleteItemDTO {
    readonly productId: string;
    readonly clientId: string;
}

export interface BaseMenuItem {
    id: string;
    name: string;
    price: number;
}

export interface MenuItem extends BaseMenuItem {
    category: string;
    image?: string;
}


export interface CartItem extends BaseMenuItem {
    quantity: number;
    subtotal: number;
    addedBy: string;
}

export interface TableCart {
    tableId: string;
    items: CartItem[];
    totalAmount: number;
    itemCount: number;
}

