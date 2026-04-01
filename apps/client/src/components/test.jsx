import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);

    // 1. We use this Ref to track if the movement was a drag or a click
    const isDragging = useRef(false);

    // 2. We use this Ref to define the "World" the button can move in
    const constraintsRef = useRef(null);

    return (
        /* The container needs to cover the viewport so the button can go anywhere */
        <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-50">
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        drag
                        // 3. This tells the button "Stay within this Ref's boundaries"
                        dragConstraints={constraintsRef}
                        dragMomentum={false}
                        dragElastic={0} // Prevents "rubber banding" back

                        onDragStart={() => {
                            isDragging.current = true;
                        }}
                        onDragEnd={() => {
                            // Small delay so the 'click' event doesn't trigger immediately
                            setTimeout(() => {
                                isDragging.current = false;
                            }, 100);
                        }}

                        onClick={() => {
                            if (!isDragging.current) {
                                setIsOpen(true);
                            }
                        }}

                        // Re-enable pointer events for the button itself
                        className="pointer-events-auto absolute bottom-10 right-10 cursor-grab active:cursor-grabbing select-none"
                    >
                        <div className="relative bg-[#ffcc00] p-5 rounded-full shadow-2xl border-4 border-white">
                            <span className="text-3xl">🛒</span>
                            <div className="absolute -top-2 -right-2 bg-[#e74c3c] text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center border-2 border-white">
                                3
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 4. OVERLAY - Needs pointer-events-auto to block the screen */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto"
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            initial={{ y: 50, scale: 0.9, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: 50, scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-[#e4c9a6]"
                        >
                            <div className="p-5 bg-[#f5ebd5] flex justify-between items-center border-b border-[#e4c9a6]">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="bg-[#2a2a2a] text-white px-5 py-2 rounded-xl font-bold text-xs uppercase"
                                >
                                    ← Regresar
                                </button>
                                <h3 className="font-serif italic font-bold text-[#2a2a2a]">Tu Pedido</h3>
                            </div>

                            <div className="p-8 max-h-[60vh] overflow-y-auto font-serif text-[#2a2a2a]">
                                <p>Contenido del carrito...</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}