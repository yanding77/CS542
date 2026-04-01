
export default function Cart() {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-[#e4c9a6] font-serif">
            {/* Header with a subtle "Shared" indicator */}
            <div className="bg-[#f5ebd5] px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-extrabold uppercase text-[#2a2a2a] tracking-tight">
                    Tu Orden!!
                </h2>
                <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
            </div>

            <div className="p-6">
                {groupedItems.length === 0 ? (
                    <div className="text-center py-10 italic text-gray-500 border-2 border-dashed border-gray-100 rounded-lg">
                        - Tu carrito está vacío -
                    </div>
                ) : (
                    <>
                        <ul className="space-y-4 mb-6">
                            {groupedItems.map((item, index) => (
                                <li
                                    key={`${item.name}-${index}`}
                                    className="flex justify-between items-center border-b border-gray-50 pb-2 animate-in fade-in slide-in-from-right-2 duration-300"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-[#2a2a2a]">{item.name}</span>
                                        <span className="text-sm text-gray-500">Cantidad: {item.quantity}</span>
                                    </div>
                                    <span className="text-lg font-semibold tabular-nums text-[#2a2a2a]">
                    ${item.totalPrice.toFixed(2)}
                  </span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4 border-t-2 border-[#e4c9a6] flex justify-between items-center">
                            <span className="text-xl font-extrabold uppercase">Total</span>
                            <span className="text-2xl font-black text-[#2a2a2a]">
                ${grandTotal.toFixed(2)}
              </span>
                        </div>

                        <button className="w-full mt-6 bg-[#ffcc00] hover:bg-[#e6b800] text-[#2a2a2a] font-black py-3 rounded-lg shadow-lg transition-transform active:scale-95 uppercase tracking-widest">
                            Confirmar Pedido
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}