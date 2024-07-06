/* jshint esversion: 9 */

import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

const ShoppingCartComponent = () => {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 15 },
    { id: 3, name: 'Product 3', price: 20 },
  ]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          {products.map((product) => (
            <div key={product.id} className="flex justify-between items-center mb-2">
              <span>{product.name} - ${product.price}</span>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                <Plus size={16} />
              </button>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Cart</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>
                {item.name} - ${item.price} x {item.quantity}
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                <Minus size={16} />
              </button>
            </div>
          ))}
          <div className="mt-4">
            <strong>Total: ${getTotalPrice()}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartComponent;
