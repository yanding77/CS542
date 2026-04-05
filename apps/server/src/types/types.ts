export class ItemDTO {
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
    totalPrice: number;
    itemCount: number;
}

