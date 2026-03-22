import React, { useState, useEffect } from 'react';

const Payment = ({ cartItems, onClearCart }) => {
    const [paymentData, setPaymentData] = useState({ amount: 0, items: [] });
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
        setPaymentData({
            amount: totalAmount,
            items: cartItems
        });
    }, [cartItems]);

    const handlePayment = () => {
        fetch('http://localhost:5001/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                onClearCart();
            })
            .catch(error => alert('Payment failed: ' + error));
        setShowConfirmation(false);
    };

    return (
        <div style={{ fontFamily: 'Lora, serif', marginTop: '40px' }}>
            <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                <p>Valor a Pagar: ${paymentData.amount.toFixed(2)}</p>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <button
                    style={{
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                    onClick={onClearCart}
                >
                    Vaciar Carrito
                </button>

                <button
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                    onClick={() => setShowConfirmation(true)}
                >
                    Pide Ahora!
                </button>
            </div>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}>
                        <h3>¿Confirmar orden?</h3>
                        <p>Total: ${paymentData.amount.toFixed(2)}</p>
                        <div style={{ marginTop: '20px' }}>
                            <button
                                style={{
                                    backgroundColor: 'green',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '10px 20px',
                                    marginRight: '10px',
                                    cursor: 'pointer'
                                }}
                                onClick={handlePayment}
                            >
                                Confirmar
                            </button>
                            <button
                                style={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '10px 20px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setShowConfirmation(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;
