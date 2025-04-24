// First, modify your CartContext.jsx to expose the cart item count
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  // Load cart from sessionStorage on initial render
  useEffect(() => {
    try {
      const storedCart = sessionStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Error loading cart from sessionStorage:", error);
    }
  }, []);

  // Save cart to sessionStorage whenever it changes
  useEffect(() => {
    try {
      sessionStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to sessionStorage:", error);
    }
  }, [cart]);

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (newItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(item => item._id === newItem._id);
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        return updatedCart;
      } else {
        return [...prevCart, newItem];
      }
    });
  
    sessionStorage.setItem("cart", JSON.stringify(
      (prevCart) => {
        const existingItemIndex = prevCart.findIndex(item => item._id === newItem._id);
        if (existingItemIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex].quantity += newItem.quantity;
          return updatedCart;
        } else {
          return [...prevCart, newItem];
        }
      }
    ));
  };

  const clearCart = () => {
    setCart([]);
    sessionStorage.removeItem("cart");
  };
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        setCart,
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        cartItemCount // Include cart item count
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};