import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find(item => item._id === product._id);
    if (existingProduct) {
      setCart(prevCart => 
        prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setCart(prevCart => [...prevCart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    const confirmRemove = window.confirm('Are you sure you want to remove the item from the cart?');
    if (confirmRemove) {
      setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    }
  };

  const clearCart = () => {
    const confirmRemove = window.confirm('Are you sure you want to clear the cart?');
    if (confirmRemove) {
      setCart([]);
    }
  };

  const updateCartQuantity = (id, quantity) => {
    setCart((prevCart) => 
      prevCart.map((item) => 
        item._id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
