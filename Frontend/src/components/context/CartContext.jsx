import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartItemLenght, setCartItemLenght] = useState(0);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  // Function to fetch cart items from server
  // const fetchCartItems = async () => {
  //   try {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     const userId = user?._id;
  //     if (userId) {
  //       const response = await fetch(`https://hardware-hive-backend.vercel.app/api/user/getCartItems/${userId}`);
  //       const data = await response.json();
  //       if (data && data.items) {
  //         setCartItemLenght(data.items.length);
  //       } else {
  //         setCartItemLenght(0);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching cart items:", error);
  //     setCartItemLenght(0);
  //   }
  // };

  // useEffect(() => {
  //   fetchCartItems();
  // }, []);

  const cartItemCount = cartItemLenght;

  const addToCart = (newItem) => {
   
    setCart((prevCart) => {
      const alreadyExists = prevCart.some(item => item._id === newItem._id);
      if (alreadyExists) {
        return prevCart; 
      } else {
        return [...prevCart, newItem]; 
      }
    });

    // setTimeout(() => {
    //   fetchCartItems();
    // }, 500);
  };

  const clearCart = () => {
    setCart([]);
    setCartItemLenght(0);
    localStorage.removeItem("cart");
  };

  // Function to refresh cart count (can be called from other components)
  const refreshCartCount = () => {
    fetchCartItems();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        clearCart,
        addToCart,
        cartItemCount,
        cartItemLenght,
        refreshCartCount, // Export this function
        // fetchCartItems   
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