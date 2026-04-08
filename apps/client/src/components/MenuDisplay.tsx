import {useRef, useState} from "react";
import type {menuRefs} from "../types/menuTypes.ts";
import MenuCategories from "./MenuCategories.tsx";
import {categories, menu} from "../data/items.ts";
import MenuItems from "./MenuItems.tsx";

export default function MenuDisplay() {
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
        <div className="grid grid-cols-[40%_1fr] md:grid-cols-[30%_1fr] items-start">
            <MenuCategories
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
            />
            <MenuItems menuItems={menu} itemRefs={itemRefs} />
        </div>
    )
}