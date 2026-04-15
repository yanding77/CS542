export interface ItemDTO {
    productId: string;
    clientId: string;
}

export interface menuRefs {
    [key: string]: HTMLElement | null;
}

export interface menuCategoriesProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
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

export interface MenuItemsProps {
    menuItems: MenuItem[];
    itemRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
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


export interface SessionContextType {
    guestId: string;
    tableId: string;
}