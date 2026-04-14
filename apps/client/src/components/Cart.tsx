import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from "react";
import { useCart } from "../hooks/CartHook.tsx";
import { useSession } from '../hooks/GuestIDContext.tsx';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const isDragged = useRef(false);
    const constraintsRef = useRef(null);

    const { guestId, tableId } = useSession();

    const { cart, addItem, deleteItem } = useCart(tableId);



    return (
        <div ref={constraintsRef} className="fixed inset-0 pointer-events-none">
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        drag // Enables dragging
                        dragConstraints={constraintsRef} // Keeps it on screen
                        dragMomentum={true}
                        dragTransition={{
                            power: 0.1
                        }}

                        onDragStart={() => {
                            isDragged.current = true;
                        }}
                        onDragEnd={() => {
                            setTimeout(() => {
                                isDragged.current = false
                            }, 100);
                        }}
                        onClick={() => {
                            if (!isDragged.current) {
                                setIsOpen(true);
                            }
                        }}


                        className="pointer-events-auto absolute bottom-10 right-10 cursor-grab active:cursor-grabbing select-none"

                    >
                        <div className="relative bg-[#ffcc00] p-5 rounded-full shadow-2xl border-4 border-white">
                            <span className="text-3xl">🛒</span> {/* Placeholder */}
                            {cart?.itemCount && cart.itemCount > 0 ? (
                                <div className="absolute -top-2 -right-2 bg-[#e74c3c] text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center border-2 border-white tabular-nums">
                                    {cart.itemCount}
                                </div>
                            ) : null}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        // Close when clicking the backdrop
                        onClick={() => setIsOpen(false)}
                        className="pointer-events-auto fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            className="flex flex-col max-h-[85vh] bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-[#e4c9a6]"
                        >
                            <div className="p-5 bg-[#f5ebd5] flex justify-between items-center border-b border-[#e4c9a6]">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsOpen(false)}
                                    className="bg-[#2a2a2a] text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-red-600 transition-colors"
                                >
                                    ← Menu
                                </motion.button>
                                <h3 className="font-serif italic font-bold text-[#2a2a2a] text-lg">Tu Pedido</h3>
                            </div>
                            <div className="flex-1 p-6 flex flex-col min-h-0">
                                {cart?.itemCount && cart.itemCount > 0 ? (
                                    <>
                                        <ul className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
                                            {cart.items.map((item) => (
                                                <motion.li
                                                    key={item.id}
                                                    className="flex justify-between items-center bg-gray-50/50 p-3 rounded-2xl border border-transparent hover:border-[#ffcc00] transition-colors"
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-[#2a2a2a] leading-tight">{item.name}</span>
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                onClick={() => addItem({ productId: item.id, clientId: guestId })}
                                                                className="w-6 h-6 flex items-center justify-center hover:bg-green-50 rounded-md transition-colors font-bold"
                                                            >
                                                                ＋
                                                            </button>
                                                            <span className="leading-6 text-xs text-gray-400 font-mono uppercase">{item.quantity}</span>
                                                            <button
                                                                onClick={() => deleteItem({ productId: item.id, clientId: guestId })}
                                                                className="w-6 h-6 flex items-center justify-center hover:bg-red-50 rounded-md transition-colors font-bold"
                                                            >
                                                                －
                                                            </button>
                                                            <span className="leading-6 text-xs text-gray-400 font-mono uppercase ml-4">${item.price}</span>

                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-black text-[#2a2a2a] tabular-nums">${(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                </motion.li>
                                            ))}
                                        </ul>
                                        <div className="mt-8 pt-5 border-t-2 border-[#e4c9a6] flex justify-between items-center">
                                            <span className="font-black text-xl uppercase tracking-tighter">Total a Pagar </span>
                                            <span className="text-3xl font-black text-[#2a2a2a] tabular-nums">{`$ ${cart?.totalPrice}`}</span>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full mt-8 bg-[#ffcc00] hover:bg-[#e6b800] text-[#2a2a2a] font-black py-4 rounded-xl shadow-lg uppercase tracking-widest text-sm"
                                        >
                                            Confirmar Pedido!
                                        </motion.button>
                                    </>) :
                                    <span className="font-black text-xl uppercase tracking-tighter">Esta vacia tu hvd!</span>
                                }
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}