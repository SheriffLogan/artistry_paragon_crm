// src/pages/ecommerce/Cart.jsx
import React, { useEffect, useState } from 'react';
import { fetchCart, removeCartItem, clearCart } from '../../config/ApiConfig';

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    fetchCart().then(setCart);
  }, []);

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.items.map(item => (
          <li key={item.id}>
            {item.variant.sku} × {item.quantity}
            <button onClick={() => removeCartItem(item.id).then(() => fetchCart().then(setCart))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => clearCart().then(() => setCart({ items: [] }))}>
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
