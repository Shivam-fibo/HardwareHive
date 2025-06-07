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

  // Add this new function to save an item for later
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

      // Remove from cart and add to saved items
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
    <div className="min-h-screen">
      <Header />
      <h1 className="text-center bg-[#013E70] text-white py-1.5 text-[18px] font-semibold">
        Cart Products
      </h1>

      <div className="px-4 sm:px-20 mb-10">
        {/* User Info */}
        <div className="w-full bg-white mx-auto mt-10">
          <table className="table-auto w-full border">
            <tbody>
              <tr className="border">
                <td className="border p-2 font-semibold w-1/6">Company Name:</td>
                <td className="border p-2 w-1/3">{userData?.companyName || "Not available"}</td>
                <td className="border p-2 font-semibold w-1/6">Contact No.:</td>
                <td className="border p-2 w-1/3">{userData?.mobile || "Not available"}</td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold" colSpan={1}>Address:</td>
                <td className="border p-2" colSpan={3}>{userData?.address || "Not available"}</td>
              </tr>
            </tbody>
          </table>

        <div className="bg-yellow-400 border border-t-transparent p-2 flex justify-between items-center">
  <h2 className="text-lg font-semibold">Order Id*</h2>
  <h2 className="text-2xl font-semibold underline">Estimate</h2>
  <h2 className="text-lg font-semibold">
    Date: {
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    }
  </h2>
</div>

        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-md shadow-md p-4 mt-6 border">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty</p>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div key={item._id} className="flex flex-wrap md:flex-nowrap items-start md:items-center border-b py-4 gap-4">
                  <span className="w-10 h-10 bg-[#013E70] text-white flex items-center justify-center rounded-xl border">{index + 1}</span>
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">Price: ₹ {item.price}</p>
                  </div>
                  <div className="flex items-center border rounded-md w-fit">
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
                  <div className="text-right w-full md:w-auto">
                    <p className="font-semibold text-lg">Total: ₹ {item.price * item.quantity}</p>
                    <div className="flex gap-2 mt-2 justify-end">
                      <button 
                        onClick={() => handleSaveForLater(item)} 
                        className="text-yellow-500 border p-2 rounded-md"
                      >
                        <IoHeartSharp size={20} />
                      </button>
                      <button 
                        onClick={() => handleRemoveItem(item)} 
                        className="text-red-500 border p-2 rounded-md"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-right mt-6">
                <p className="text-xl font-semibold">Total: ₹ {discountedPrice}</p>
                <p className="text-sm text-gray-500">Discount Applied: {discount}%</p>
                <button 
                  onClick={handlePlaceOrder} 
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md"
                >
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>

        {/* Saved Items */}
        {savedItems.length > 0 && (
          <div className="mt-8 bg-white p-6 border rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Saved for Later</h2>
            {savedItems.map((item, index) => (
              <div key={item._id} className="flex flex-wrap md:flex-nowrap items-start md:items-center border-b py-4 gap-4">
                <span className="w-10 h-10 bg-[#013E70] text-white flex items-center justify-center rounded-xl border">{index + 1}</span>
                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">Price: ₹ {item.price}</p>
                </div>
                <div className="flex gap-2 justify-end w-full md:w-auto">
                  <button 
                    onClick={() => handleMoveToCart(item)} 
                    className="text-blue-500 border p-2 rounded-md"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => handleRemoveSavedItem(item)} 
                    className="text-red-500 border p-2 rounded-md"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;