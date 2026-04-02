export interface menuRefs  {
    [key: string]: HTMLElement | null;
}

export interface menuCategoriesProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export interface MenuItem {
    name: string;
    category: string;
    price: number;
    image?: string;
}

export interface MenuItemsProps {
    menuItems: MenuItem[];
    itemRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}