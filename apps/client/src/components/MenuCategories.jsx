export default function MenuCategories({
                                           categories,
                                           selectedCategory,
                                           onSelectCategory,
                                           backgroundImage,
                                       }) {
    return (
        <aside
            className="
                    h-[70vh] min-h-0
                    overflow-y-auto overflow-x-hidden
                    rounded-[10px]
                    border-[5px] border-[#f8f9f9]
                    shadow-lg
                    bg-cover bg-center bg-no-repeat
                    scrollbar-hide"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
            }}
        >
            <ul className=" list-none">
                {categories.map((category) => {
                    const isActive = category === selectedCategory;

                    return (
                        <li key={category} className=" flex justify-center ">
                            <button
                                onClick={() => onSelectCategory(category)}
                                className={`
                                    w-[90%] text-center cursor-pointer uppercase
                                    font-extrabold 
                                    rounded-[10px]
                                    my-[10px]
                                    mb-[10px]
                                    text-[1.5rem]
                                    transition-all duration-300 ease-in-out
                                    ${
                                    isActive
                                        ? 'bg-[#ffcc00] text-[#333] font-bold shadow-[0_4px_8px_rgba(0,0,0,0.15)]'
                                        : 'bg-[#f5ebd5] hover:bg-[#e4c9a6] hover:text-white hover:scale-[1.05]'
                                }

                                    max-[480px]:px-[10px]
                                    max-[480px]:py-[5px]
                                    max-[480px]:text-[1.0rem]
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