import bgImage from '/pics/kk.jpeg';

import type { menuCategoriesProps } from "../types/menuTypes.ts";

export default function MenuCategories({
    categories,
    selectedCategory,
    onSelectCategory
}: menuCategoriesProps) {
    return (
        <aside
            className="
                h-full min-h-0
                overflow-y-auto
                rounded-[5px]
                border-[5px] border-[#f8f9f9]
                shadow-lg
                bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            <ul className="list-none py-1">
                {categories.map((category: string) => {
                    const isActive = category === selectedCategory;

                    return (
                        <li key={category} className="flex justify-center">
                            <button
                                onClick={() => onSelectCategory(category)}
                                className={`
                                    w-[90%] text-center cursor-pointer uppercase
                                    font-extrabold
                                    rounded-[10px]
                                    my-1
                                    py-1.5
                                    text-sm sm:text-base md:text-lg
                                    transition-all duration-300 ease-in-out
                                    ${
                                    isActive
                                        ? 'bg-[#ffcc00] text-[#333] font-bold shadow-[0_4px_8px_rgba(0,0,0,0.15)]'
                                        : 'bg-[#f5ebd5] hover:bg-[#e4c9a6] hover:text-white hover:scale-[1.05]'
                                }
                                    `}
                            >
                                {category}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}