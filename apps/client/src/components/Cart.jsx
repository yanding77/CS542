import React from 'react';

function Cart({ cart }) {
    const groupCartItems = (cartItems) => {
        const groupedItems = {};
        cartItems.forEach((item) => {
            if (groupedItems[item.name]) {
                groupedItems[item.name].quantity += 1;
                groupedItems[item.name].totalPrice += item.price;
            } else {
                groupedItems[item.name] = {
                    ...item,
                    quantity: 1,
                    totalPrice: item.price,
                };
            }
        });
        return Object.values(groupedItems);
    };

    const groupedItems = groupCartItems(cart);

    return (
        <div style={{ fontFamily: 'Georgia, serif', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Tu Orden!!</h2>
            {groupedItems.length === 0 ? (
                <p style={{ fontSize: '18px', marginBottom: '5px', paddingLeft: '20px' }}>
                    -Tu carrito está vacío-
                </p>
            ) : (
                <ul style={{ paddingLeft: '20px' }}>
                    {groupedItems.map((item, index) => (
                        <li key={index} style={{ fontSize: '18px', marginBottom: '5px' }}>
                            {item.name} (x{item.quantity}) - ${item.totalPrice.toFixed(2)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default Cart;
