import { useRef, useState } from "react";
import type { menuRefs } from "../types/menuTypes.ts";
import MenuCategories from "./MenuCategories.tsx";
import MenuItems from "./MenuItems.tsx";
import { useSession } from "../hooks/GuestIDContext.tsx";
import { useMenu } from "../hooks/MenuItemsHook.tsx";



export default function MenuDisplay() {
    const { locationId } = useSession();
    const { data: menuItems = [] } = useMenu(locationId);
    const categories = [... new Set(menuItems.map(item => item.category))];
    const [selectedCategory, setSelectedCategory] = useState('Entradas');
    const itemRefs = useRef<menuRefs>({});

    const getCategoryId = (category: string) => `cat-${category.toLowerCase().replace(/\s+/g, '-')}`;

    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category);
        const catId = getCategoryId(category);
        const node = itemRefs.current[catId];

        if (node) {
            node.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <div className="flex-1 min-h-0 grid grid-cols-[35%_1fr] sm:grid-cols-[30%_1fr]">
            <MenuCategories
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
            />
            <MenuItems menuItems={menuItems} itemRefs={itemRefs} />
        </div>
    )
}