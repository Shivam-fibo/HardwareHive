import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const { cart, setCart, removeFromCart, updateQuantity, clearCart, addToCart } = useCart();
  const [savedItems, setSavedItems] = useState([]);
  
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user && user._id) {
          const res = await fetch(`https://hardware-hive.vercel.app/api/user/getCartItem/${user._id}`)
          const data = await res.json();
          if (res.ok) {
            setCart(data.items);
          } else {
            toast.error("Failed to fetch cart from server");
          }
        }
      } catch (err) {
        console.error("Error loading cart:", err);
        toast.error("Could not load cart");
      }
    };

    loadCart();
  }, [setCart]);


  const loadSavedItems = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user && user._id) {
        const res = await fetch(`https://hardware-hive.vercel.app/api/user/savedItems/${user._id}`);
        const data = await res.json();
        if (res.ok) {
          setSavedItems(data.savedItems);
        } else {
          toast.error("Failed to fetch saved items");
        }
      }
    } catch (err) {
      console.error("Error loading saved items:", err);
      toast.error("Could not load saved items");
    }
  };
  
  useEffect(() => {
    loadSavedItems();
  }, []);
  

  const handleIncrease = (id) => {
    const item = cart.find((item) => item._id === id);
    updateQuantity(id, item.quantity + 1);
  };

  const handleDecrease = (id) => {
    const item = cart.find((item) => item._id === id);
    if (item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(1, parseInt(value) || 1);
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = async (item) => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user) {
        toast.error("User not logged in");
        return;
      }

      const response = await fetch("https://hardware-hive.vercel.app/api/user/deleteCartItem", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: item.productId,
          userId: user._id,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        console.error("Error response:", errorText);
        toast.error("Failed to remove item");
        return;
      }

      const data = await response.json();

      if (data.message === "Item deleted successfully") {
        toast.success("Item removed from cart");
        removeFromCart(item._id);
      } else {
        toast.error(data.message || "Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Error removing item");
    }
  };

  const handleSaveForLater = async (item) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      toast.error("User not logged in");
      return;
    }
    
    try {
      const response = await fetch("https://hardware-hive.vercel.app/api/user/saveItemForLater", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.productId,
          userId: user._id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSavedItems((prevSavedItems) => [...prevSavedItems, item]);
        removeFromCart(item._id);
        toast.success("Item saved for later");
      } else {
        toast.error(data.message || "Failed to save item for later");
      }
    } catch (error) {
      console.error("Error saving item for later:", error);
      toast.error("Failed to save item for later");
    }
  };

  const handleRemoveSavedItem = async (itemId) => {
    try {
      const response = await fetch("https://hardware-hive.vercel.app/api/user/deleteSavedItem", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });

      const data = await response.json();
      if (response.ok) {
        setSavedItems((prevSavedItems) =>
          prevSavedItems.filter((item) => item._id !== itemId)
        );
        toast.success("Item removed from saved items");
      } else {
        toast.error(data.message || "Failed to remove saved item");
      }
    } catch (error) {
      console.error("Error removing saved item:", error);
      toast.error("Failed to remove saved item");
    }
  };

  const handleMoveToCart = async (item) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      toast.error("User not logged in");
      return;
    }

    try {
      const response = await fetch("https://hardware-hive.vercel.app/api/user/addSavedItemToCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.productId,
          userId: user._id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        addToCart(item);
        setSavedItems((prevSavedItems) =>
          prevSavedItems.filter((savedItem) => savedItem._id !== item._id)
        );
        toast.success("Item moved to cart");
      } else {
        toast.error(data.message || "Failed to move item to cart");
      }
    } catch (error) {
      console.error("Error moving item to cart:", error);
      toast.error("Failed to move item to cart");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user) {
        toast.error("User not logged in. Please log in first.");
        return;
      }

      const response = await fetch("https://hardware-hive.vercel.app/api/admin/placeOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          items: cart,
          totalAmount: totalPrice,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Order placed successfully!");
        clearCart();
        sessionStorage.removeItem("cart");
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Order List Card */}
      <div className="border rounded-lg shadow-md p-4 bg-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Order list</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
          <span>25th June 2025</span>
          <span>05:43 pm</span>
          <span className="text-blue-600">Order Number: hwh54hhh3h4</span>
          <span className="text-green-600 font-semibold ml-auto">Confirmed</span>
        </div>

        {cart.length === 0 ? (
          <div className="text-center text-lg text-gray-500">Your cart is empty</div>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item._id} className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-1">
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <div className="text-sm text-gray-500">Variant</div>
                  <div className="text-lg font-semibold">₹{item.price}</div>
                </div>

                <div className="flex flex-col gap-2 items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-semibold">Ordered Quantity</span>
                    <div className="flex items-center border rounded overflow-hidden">
                      <button onClick={() => handleDecrease(item._id)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200">-</button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                        className="w-14 text-center border-x outline-none"
                        min="1"
                      />
                      <button onClick={() => handleIncrease(item._id)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200">+</button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="text-lg font-bold text-green-600">₹{item.price * item.quantity}</div>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleSaveForLater(item)} className="bg-yellow-400 hover:bg-yellow-500 text-sm px-3 py-1 rounded-md">Save for Later</button>
                    <button onClick={() => handleRemoveItem(item)} className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md">Remove</button>
                  </div>
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className="pt-6">
              <div className="flex justify-between text-xl font-bold mb-2">
                <span>Total Amount:</span>
                <div>
                  <span className="line-through text-gray-400 mr-2">₹{totalPrice}</span>
                  <span className="text-green-600">₹{totalPrice}</span>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button onClick={handlePlaceOrder} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">Confirm</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Saved for Later Card */}
      {savedItems.length > 0 && (
        <div className="border rounded-lg shadow-md p-4 bg-white mt-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Saved for Later</h1>
          <div className="space-y-6">
            {savedItems.map((item) => (
              <div key={item._id} className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-1">
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <div className="text-sm text-gray-500">Variant</div>
                  <div className="text-lg font-semibold">₹{item.price}</div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="text-lg font-bold text-green-600">₹{item.price}</div>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleMoveToCart(item)} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md">Add to Cart</button>
                    <button onClick={() => handleRemoveSavedItem(item._id)} className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
