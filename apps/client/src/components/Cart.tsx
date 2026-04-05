import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {useRef} from "react";
import {useCart} from "../hooks/CartHook.tsx";

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const isDragged = useRef(false);
    const constraintsRef = useRef(null);

    const cartData = useCart("mesa1");


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

                        onDragStart={ () =>{
                            isDragged.current = true;
                        }}
                        onDragEnd={ () =>{
                            setTimeout(()=>{
                                isDragged.current = false
                            }, 100);
                        }}
                        onClick={() => {
                            if(!isDragged.current){
                                setIsOpen(true);
                            }
                        }}


                        className="pointer-events-auto absolute bottom-10 right-10 cursor-grab active:cursor-grabbing select-none"

                    >
                        <div className="relative bg-[#ffcc00] p-5 rounded-full shadow-2xl border-4 border-white">
                            <span className="text-3xl">🛒</span> {/* Placeholder */}
                            {cartData.cart?.itemCount && cartData.cart.itemCount > 0 ? (
                            <div className="absolute -top-2 -right-2 bg-[#e74c3c] text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center border-2 border-white tabular-nums">
                                {cartData.cart.itemCount}
                            </div>
                                ): null}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. THE FIXED OVERLAY SCREEN */}
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

                            // "Pop-up" animation
                            initial={{ y: 50, scale: 0.9, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: 50, scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}

                            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-[#e4c9a6]"
                        >
                            <div className="p-5 bg-[#f5ebd5] flex justify-between items-center border-b border-[#e4c9a6]">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsOpen(false)}
                                    className="bg-[#2a2a2a] text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-red-600 transition-colors"
                                >
                                    ← Regresar
                                </motion.button>
                                <h3 className="font-serif italic font-bold text-[#2a2a2a] text-lg">Tu Pedido</h3>
                            </div>

                            <div className="p-8 max-h-[60vh] overflow-y-auto font-serif">
                                <ul className="space-y-4">
                                    <li className="flex justify-between items-center border-b border-gray-100 pb-3">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[#2a2a2a]">Ceviche de Camarón</span>
                                            <span className="text-sm text-gray-500">x2 - $15.00</span>
                                        </div>
                                        <span className="font-extrabold text-lg tabular-nums">$30.00</span>
                                    </li>
                                </ul>

                                <div className="mt-8 pt-5 border-t-2 border-[#e4c9a6] flex justify-between items-center">
                                    <span className="font-black text-xl uppercase tracking-tighter">Total a Pagar </span>
                                    <span className="text-3xl font-black text-[#2a2a2a] tabular-nums">$30.00</span>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full mt-8 bg-[#ffcc00] hover:bg-[#e6b800] text-[#2a2a2a] font-black py-4 rounded-xl shadow-lg uppercase tracking-widest text-sm"
                                >
                                    Confirmar Pedido!
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}