import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Cart({ cartItems, clearCart, setView, updateQuantity, removeFromCart, token }) {
  const [placingOrder, setPlacingOrder] = useState(false);
  const [message, setMessage] = useState(null);

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    
    setPlacingOrder(true);
    try {
      // Simulate placing an order by sending to backend
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items: cartItems, totalAmount })
      });

      if (!response.ok) throw new Error('Failed to place order');

      setMessage({ type: 'success', text: 'Order placed successfully!' });
      clearCart();
      
      // Clear message and go back to products after 3 seconds
      setTimeout(() => {
        setMessage(null);
        setView('products');
      }, 3000);

    } catch (error) {
      console.error('Error placing order:', error);
      setMessage({ type: 'error', text: 'Could not place order. Please try again.' });
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      
      {message && (
        <div className={`alert ${message.type}`}>
          {message.text}
        </div>
      )}

      {cartItems.length === 0 && !message ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.product} className="cart-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                
                <div className="item-controls">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.product, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product, 1)}>+</button>
                  </div>
                  
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.product)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {cartItems.length > 0 && (
            <div className="cart-summary">
              <h3>Total: ${totalAmount.toFixed(2)}</h3>
              <button 
                className="btn success-btn place-order-btn" 
                onClick={handlePlaceOrder}
                disabled={placingOrder}
              >
                {placingOrder ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
