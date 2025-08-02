import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  const fetchCartItems = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;
      if (userId) {
        const response = await fetch(`https://hardware-hive-backend.vercel.app/api/user/getCartItems/${userId}`);
        const data = await response.json();
        if (data?.items) {
          setCart(data.items);
          setCartItemCount(data.items.length);
        }
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addToCart = async (newItem) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;
      
      if (!userId) {
        toast.error("Please login to add items to cart");
        return;
      }

      const cartItem = {
        productId: newItem._id,
        title: newItem.title,
        price: newItem.price,
        image: newItem.image,
        quantity: newItem.quantity || 1,
        userId,
      };

      const response = await fetch("https://hardware-hive-backend.vercel.app/api/user/addCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // Update local state after successful API call
      await fetchCartItems();
      return data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  const refreshCartCount = async () => {
    await fetchCartItems();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItemCount,
        addToCart,
        refreshCartCount,
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