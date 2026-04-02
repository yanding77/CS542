export interface menuRefs  {
    [key: string]: HTMLElement | null;
}

export interface menuCategoriesProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export interface MenuItem {
    id: string;
    name: string;
    category: string;
    price: number;
    image?: string;
}

export interface cartItem extends MenuItem {
    quantity: number;
    subtotal: number;
    addedBy?: string;
}

export interface TableCart {
    tableId: string;
    items: cartItem[];
    totalAmount: number;
    itemCount: number;
}

export interface MenuItemsProps {
    menuItems: MenuItem[];
    itemRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}