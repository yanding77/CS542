import type { MenuItemsProps } from "../types/menuTypes.ts";
import { useCart } from "../hooks/CartHook.tsx";
import { useSession } from "../hooks/GuestIDContext.tsx";


export default function MenuItems({ menuItems, itemRefs }: MenuItemsProps) {

    const { guestId, tableId } = useSession();
    const { quantityMap, addItem, deleteItem } = useCart(tableId);


    const getCategoryId = (category: string) => `cat-${category.toLowerCase().replace(/\s+/g, '-')}`;

    const registerRef = (el: HTMLElement | null, category: string, isFirst: boolean) => {
        if (isFirst && el) {
            const catId = getCategoryId(category);
            itemRefs.current[catId] = el;
        }
    };

    return (
        <main className="
        bg-[#05161A] rounded-[5px]
        h-full min-h-0
        overflow-y-auto
        border-[5px] border-[#f8f9f9]
        ">
            <ul className="list-none">
                {menuItems.map((item, index) => {
                    const isFirst = index === 0 || menuItems[index - 1].category !== item.category;
                    return (
                        <li
                            key={item.name}
                            ref={(el) => registerRef(el, item.category, isFirst)}
                            data-category={item.category}
                            className="pb-5 border-b border-[#ddd] mb-5 px-4"
                        >
                            <span className="font-extrabold text-[1.2rem] text-[#f5ebd5]">
                                {item.name} - ${item.price.toFixed(2)}
                            </span>

                            {item.image && (
                                <div className="my-4">
                                    <img
                                        src={`${item.image}`}
                                        alt={item.name}
                                        className="
                                    w-full max-w-[700px]
                                    rounded-[10px]
                                    shadow-[0_4px_8px_rgba(0,0,0,0.1)]
                                    object-cover
                                    block mx-auto
                                    border border-[#ddd]"
                                    />
                                </div>
                            )}

                            <div className="flex justify-center items-center gap-[10px] mt-3">
                                <button className="bg-[#f5ebd5] text-black px-4 py-1 rounded-[8px] font-bold text-[1.2rem] cursor-pointer"
                                    onClick={() => addItem({ productId: item.id, clientId: guestId })}>
                                    +
                                </button>

                                {quantityMap[item.id] > 0 && (
                                    <>
                                        <span className="text-[#f5ebd5] font-black text-xl w-6 text-center">
                                            {quantityMap[item.id]}
                                        </span>
                                        <button className="bg-[#e74c3c] text-white px-4 py-1 rounded-[8px] font-bold text-[1.2rem] cursor-pointer"
                                            onClick={() => deleteItem({ productId: item.id, clientId: guestId })}>
                                            -
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </main>
    );
}