import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import Header from "./Nabar";
import Footer from "../LandingPage/Module/Footer";
import { IoHeartSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { PiBellBold } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa6";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import { RiCustomerService2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef(null);

  const navigate = useNavigate()

  const {clearCart} = useCart()
  useEffect(() =>{
clearCart() 
  }, [])

  const handleNotification = () => {
    console.log("notiification clicked!!!")
    navigate("/notification")
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    sessionStorage.removeItem("cart")
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
        const res = await fetch(`https://hardware-hive-backend.vercel.app/api/user/savedItems/${userId}`);
        const data = await res.json();

        if (data?.savedItems) setSavedItems(data.savedItems.reverse());
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
    <div className="min-h-screen  bg-[#F2F5F6]">
      <header className="bg-white top-0 z-50 shadow-sm">
        <div className="sm:h-12 p-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-10 h-full">

            {/* Logo & Icons */}
            <div className="flex items-center justify-between w-full sm:w-auto h-full">

              {/* Logo */}
              <button onClick={() => navigate("/home")} className=" cursor-pointer flex items-center space-x-2">

                <img
                  src="/logo/ss_power_tool_logo.svg"
                  width="150px"
                  className="sm:ml-6"
                  alt="SS Power Tools Logo"
                />
              </button>

              {/* Mobile Icons */}
              <div className="flex sm:hidden items-center space-x-3 text-black mr-2 sm:mr-0">
                <button aria-label="Notifications"><PiBellBold size={22} strokeWidth={0.5} onClick={() => handleNotification()} /></button>
                <button aria-label="User" onClick={() => setShowProfile(!showProfile)}>
                  <FaRegUser size={20} strokeWidth={0.5} className="cursor-pointer" />
                </button>
              </div>

              {showProfile && (
                <div
                  ref={profileRef}
                  className="absolute border-gray-500 top-10 sm:top-11 right-4 sm:right-8 bg-white text-black shadow-lg rounded-lg z-50 overflow-hidden text-sm font-medium"
                >
                  <p onClick={() => navigate("/user")} className="cursor-pointer hover:bg-gray-300 flex items-center gap-2 px-4 p-1.5 text-nowrap">
                    <FaRegUser size={12} /> My Account
                  </p>
                  <p onClick={() => navigate("/")} className="cursor-pointer hover:bg-gray-300 flex items-center gap-2 px-4 p-1.5">
                    <IoLogOutOutline size={14} /> Logout
                  </p>
                </div>
              )}
            </div>


            {/* Desktop Icons */}
            <div className="hidden sm:flex items-center space-x-4 text-black mr-6">
              <button aria-label="Notifications" className="cursor-pointer" onClick={() => handleNotification()}><PiBellBold size={22} strokeWidth={0.5} /></button>
              <button aria-label="User" onClick={() => setShowProfile(!showProfile)}>
                <FaRegUser size={22} strokeWidth={0.5} className="cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-[#013E70] text-[#000000] py-2 ">
        <div className="w-full mx-auto flex flex-row justify-center items-center gap-4">
          <nav className="w-full flex flex-nowrap justify-start sm:justify-center gap-2 relative scroll-width-none overflow-x-scroll sm:overflow-visible whitespace-nowrap px-4">
            <h1 className="text-white font-semibold text-lg">My Orders</h1>
          </nav>

          <div className="text-white font-semibold text-[16px] whitespace-nowrap hidden sm:flex justify-center items-center sm:gap-1 absolute right-5">
            <RiCustomerService2Fill size={20} />
            <span className="font-bold">+91 9804611111</span>
          </div>
        </div>
      </div>

      {/* My Orders Section */}

      <div className="max-w-6xl mx-auto px-4 py-2">
        {cartItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm  mb-6">
            {/* Header */}
            

            <div className="flex flex-col lg:flex-row w-full ">
              {/* Left Side - Cart Items */}
              <div className="flex-1 px-6 py-2 hidden sm:block">
                {cartItems.map((item, index) => (
                  <div key={item._id} className="flex items-start gap-4 border-b py-1 w-full">
                    {/* Serial Number */}
                    <div className="w-8 h-8 sm:bg-blue-100 sm:text-blue-600 flex items-center justify-center rounded text-sm font-medium mt-2">
                      {index + 1}
                    </div>

                    {/* Product Image */}

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16  object-contain rounded border mt-1"
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
                            className="text-red-500 hover:text-red-600 p-2 border rounded-md"
                            title="Save for later"
                          >
                            <IoHeartSharp size={18} />
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item)}
                            className="text-black-500 hover:text-black-600 p-2 border rounded-md"
                            title="Remove item"
                          >
                            <MdDelete size={18} />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
                <h1 className="text-center my-4">Place order </h1>
              </div>





              {/* mobile -------------------------- */}
              <div className="flex-1 px-4 py-2 block sm:hidden w-full">
  {cartItems.map((item, index) => (
    <div key={item._id} className="flex items-start gap-3 border-b py-2 w-full flex-wrap">
      {/* Serial Number */}
      <div className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded text-sm font-medium mt-2">
        {index + 1}
      </div>

      {/* Product Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 object-contain rounded border mt-1"
      />

      {/* Product Info + Price + Actions (stacked in small screen) */}
      <div className="flex flex-col flex-1 gap-2 mt-1 w-full">

        {/* Product Title + Price */}
        <div className="flex justify-between w-full">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-800 text-sm truncate">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-1">₹{item.price}</p>
          </div>
          <div className="text-right text-green-600 font-semibold whitespace-nowrap">
            ₹ {item.price * item.quantity}
          </div>
        </div>

        {/* Quantity and Action buttons */}
        <div className="flex justify-between items-center gap-2 flex-wrap">
          
          {/* Quantity Selector */}
          <div className="flex items-center border rounded text-sm w-[100px] justify-between">
            <button
              onClick={() => handleDecrease(item._id)}
              className="px-2 py-0.5 border-r"
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <span className="px-2 py-0.5 text-center w-6">{item.quantity}</span>
            <button
              onClick={() => handleIncrease(item._id)}
              className="px-2 py-0.5 border-l"
            >
              +
            </button>
          </div>

          {/* Save + Delete Buttons */}
          <div className="flex gap-1">
            <button
              onClick={() => handleSaveForLater(item)}
              className="text-red-500 hover:text-red-600 p-1 border rounded"
              title="Save for later"
            >
              <IoHeartSharp size={14} />
            </button>
            <button
              onClick={() => handleRemoveItem(item)}
              className="text-black-500 hover:text-black-600 p-1 border rounded"
              title="Remove item"
            >
              <MdDelete size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}

  <h1 className="text-center my-4">Place order</h1>
</div>




              {/* Right Side - Price Details */}
              <div className="w-full lg:w-80  p-6">

                <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Details</h3>

                <div className="space-y-3 mb-6">
                  {cartItems.map((item, index) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.title}</span>
                      <span className="font-medium">₹ {item.price * item.quantity}</span>
                    </div>
                  ))}



                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span>Total Amount</span>
                    <span>₹ {totalPrice.toFixed(2)}</span>
                  </div>

                </div>
                <div className="border-t my-4"></div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-green-600  hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}

        {cartItems.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border mb-6 px-6 py-8 text-center text-gray-500 flex flex-col items-center justify-center">
            <img
              src="/images/empty-cart.webp" // Make sure to place your image in the `public/images` folder
              alt="Empty cart"
              className="w-48 h-auto mb-6"
            />
            <h2 className="text-xl font-semibold text-gray-700">Your cart is empty!</h2>
            <p className="text-sm text-gray-500 mb-4">Add items to it now.</p>
            <button
              onClick={() => navigate("/home")}
              className="bg-[#003E71] cursor-pointer text-white font-medium py-2 px-4 rounded-xl"
            >
              Shop now
            </button>
          </div>
        )}


        {savedItems.length > 0 &&
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

                    </div>

                    {/* Product Info */}
                    <div className="mb-3">
                      <h3 className="font-medium text-sm text-gray-800 mb-1">{item.title}</h3>

                      <p className="text-lg font-semibold text-gray-800">₹ {item.price}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRemoveSavedItem(item)}
                        className="p-2 border border-gray-300 hover: text-gray-700 rounded text-sm transition-colors"
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
        }
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;