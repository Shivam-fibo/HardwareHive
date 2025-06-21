import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Header from "../LandingPage/Module/Header";
import Footer from "../LandingPage/Module/Footer";
import { IoHeartSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      const id = parsedUser._id;
      setUserId(id);

      fetch(`https://hardware-hive-backend.vercel.app/api/user/userInfo/${id}`)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => console.error("Error fetching user info:", err));
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchCartItems = async () => {
      try {
        const res = await fetch(`https://hardware-hive-backend.vercel.app/api/user/getCartItems/${userId}`);
        const data = await res.json();
        if (data?.items) setCartItems(data.items.reverse());
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const fetchSavedItems = async () => {
      try {
        const res = await fetch(`https://hardware-hive-backend.vercel.app/api/user/getSavedItems/${userId}`);
        const data = await res.json();
        if (data?.items) setSavedItems(data.items.reverse());
      } catch (error) {
        console.error("Error fetching saved items:", error);
      }
    };

    fetchCartItems();
    fetchSavedItems();
  }, [userId]);

  const handleSaveForLater = async (item) => {
    if (!userId) {
      toast.error("Please wait while we load your user information");
      return;
    }

    try {
      const response = await fetch("https://hardware-hive-backend.vercel.app/api/user/saveItemForLater", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId: item.productId }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to save item");

      setCartItems(prev => prev.filter(i => i.productId !== item.productId));
      setSavedItems(prev => [...prev, item]);
      toast.success("Item saved for later");
    } catch (error) {
      console.error("Error saving item:", error);
      toast.error("Could not save item");
    }
  };

  const handleRemoveItem = async (item) => {
    try {
      const res = await fetch("https://hardware-hive-backend.vercel.app/api/user/deleteCartItem", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId: item.productId }),
      });

      if (!res.ok) throw new Error("Failed to remove item");

      toast.success("Item removed");
      setCartItems((prev) => prev.filter((ci) => ci.productId !== item.productId));
    } catch (err) {
      toast.error("Error removing item");
      console.error(err);
    }
  };

  const moveToCart = async (productId) => {
    try {
      const res = await fetch("https://hardware-hive-backend.vercel.app/api/user/addSavedItemToCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, userId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    } catch (err) {
      console.error("Error moving item to cart:", err);
      throw err;
    }
  };

  const handleMoveToCart = async (item) => {
    try {
      await moveToCart(item.productId);
      toast.success("Moved to cart");
      setSavedItems((prev) => prev.filter((si) => si.productId !== item.productId));
      setCartItems(prev => [...prev, item]);
    } catch {
      toast.error("Failed to move item");
    }
  };

  const handleRemoveSavedItem = async (item) => {
    try {
      const res = await fetch("https://hardware-hive-backend.vercel.app/api/user/deleteSavedItem", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId: item.productId }),
      });

      if (!res.ok) throw new Error("Failed to remove saved item");
      toast.success("Item removed");
      setSavedItems((prev) => prev.filter((si) => si.productId !== item.productId));
    } catch (err) {
      toast.error("Error removing item");
      console.error(err);
    }
  };

  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 10;
  const discountedPrice = totalPrice - totalPrice * (discount / 100);

  const handlePlaceOrder = async () => {
    try {
      const res = await fetch("https://hardware-hive-backend.vercel.app/api/admin/placeOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          items: cartItems,
          totalAmount: discountedPrice,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Order placed successfully!");
      const resCart = await fetch(`https://hardware-hive-backend.vercel.app/api/user/getCartItems/${userId}`);
      const updatedCart = await resCart.json();
      setCartItems(updatedCart?.items || []);
    } catch (error) {
      toast.error("Failed to place order");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* My Orders Section */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          {/* Header */}
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">My Orders</h2>
          </div>

          {cartItems.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              Your cart is empty
            </div>
          ) : (
            <div className="flex ">
              {/* Left Side - Cart Items */}
              <div className="flex-1 px-6 py-4">
                {cartItems.map((item, index) => (
                  <div key={item._id} className="flex items-start gap-4 border-b py-4 w-full">
  {/* Serial Number */}
  <div className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded text-sm font-medium mt-2">
    {index + 1}
  </div>

  {/* Product Image */}
  <img
    src={item.image}
    alt={item.title}
    className="w-16 h-16 object-contain rounded border mt-2"
  />

  {/* Product Info + Quantity + Actions */}
  <div className="flex flex-1 justify-between items-start gap-4">
    {/* Product Info */}
    <div className="flex-1">
      <h3 className="font-medium text-gray-800 text-sm mb-1">{item.title}</h3>
      <p className="text-sm text-gray-600 mb-2">₹ {item.price}</p>
    </div>

    {/* Quantity Selector */}
    <div className="flex-1 flex flex-col items-center">
      <div className="text-sm mb-1">Please select quantity</div>
      <div className="flex items-center border rounded-md w-fit mb-3">
        <button
          onClick={() => handleDecrease(item._id)}
          className="px-3 py-1 border-r"
          disabled={item.quantity <= 1}
        >
          −
        </button>
        <span className="px-4 py-1">{item.quantity}</span>
        <button
          onClick={() => handleIncrease(item._id)}
          className="px-3 py-1 border-l"
        >
          +
        </button>
      </div>
    </div>

    <div className="flex-1 flex flex-col items-end">
      <p className="text-lg font-semibold text-green-600 mb-2">
        ₹ {item.price * item.quantity}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => handleSaveForLater(item)}
          className="text-orange-500 hover:text-orange-600 p-2 border rounded-md"
          title="Save for later"
        >
          <IoHeartSharp size={18} />
        </button>
        <button
          onClick={() => handleRemoveItem(item)}
          className="text-red-500 hover:text-red-600 p-2 border rounded-md"
          title="Remove item"
        >
          <MdDelete size={18} />
        </button>
      </div>
    </div>
  </div>
</div>            
                ))}
              </div>

              {/* Right Side - Price Details */}
              <div className="w-80 bg-gray-50 p-6 border-l">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Details</h3>

                <div className="space-y-3 mb-6">
                  {cartItems.map((item, index) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.title}</span>
                      <span className="font-medium">₹ {item.price * item.quantity}</span>
                    </div>
                  ))}

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹ {totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Discount ({discount}%)</span>
                      <span className="font-medium text-green-600">-₹ {(totalPrice * (discount / 100)).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-3">
                      <span>Total Amount</span>
                      <span>₹ {discountedPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Saved for Later Section */}
        {savedItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Header */}
            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">Saved for Later</h2>
            </div>

            {/* Saved Items Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {savedItems.map((item) => (
                  <div key={item._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    {/* Product Image */}
                    <div className="relative mb-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-32 object-contain rounded"
                      />
                      <button
                        onClick={() => handleRemoveSavedItem(item)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                      >
                        <IoHeartSharp size={20} />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="mb-3">
                      <h3 className="font-medium text-sm text-gray-800 mb-1">{item.title}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-yellow-400">★</span>
                        <span className="text-xs text-gray-600">4.5</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-800">₹ {item.price}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRemoveSavedItem(item)}
                        className="p-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-sm transition-colors"
                      >
                        <MdDelete size={16} />
                      </button>
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded text-sm font-medium transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;