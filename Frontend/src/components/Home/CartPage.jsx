import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import Header from "./Nabar";
import Footer from "../LandingPage/Module/Footer";
import { IoHeartSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

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

  const productList = [
    { id: 1, name: 'Product Name', price: 120, ordered: 500, total: 24000 },
    { id: 2, name: 'Product Name', price: 120, ordered: 500, total: 24000 },
    { id: 3, name: 'Product Name', price: 120, ordered: 500, total: 24000 },
    { id: 4, name: 'Product Name', price: 120, ordered: 500, total: 24000 },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <h1 className="text-center bg-[#013E70] text-white py-1.5 text-[18px] font-semibold">
        Welcome, User
      </h1>

      <div className="px-4 sm:px-20 mb-10">
        <div className="w-full  bg-white mx-auto mt-10 ">
          <table className="table-auto w-full">
            <tbody>
              <tr className="border">
                <td className="border p-2 font-semibold w-1/6">Company Name:</td>
                <td className="border p-2 w-1/3">DUMMY C</td>
                <td className="border p-2 font-semibold w-1/6">Contact No.:</td>
                <td className="border p-2 w-1/3">+91 8943345343</td>
              </tr>
              <tr className="border">
                <td className="border p-2 font-semibold" colSpan={1}>Address:</td>
                <td className="border p-2" colSpan={3}>
                  123, ABC Street, Sector 4, New Delhi, India – 110001
                </td>
              </tr>
            </tbody>
          </table>

          <div className="bg-yellow-400 border border-t-transparent p-2 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Order Id*</h2>
            <h2 className="text-2xl font-semibold underline">Estimate</h2>
            <h2 className="text-lg font-semibold">Date: 10/04/2024 </h2>
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-white rounded-md shadow-md p-4 md:p-6 border">

            {/* Product List */}
            {productList.map((item) => (
              <div key={item.id} className="flex flex-wrap md:flex-nowrap items-start md:items-center border-b py-4 gap-4">
                <span className="w-10 h-10 rounded-xl bg-[#013E70] text-white flex justify-center items-center border border-">{item.id}</span>
                <img
                  src=""
                  alt={item.name}
                  className="w-20 h-20 object-contain"
                />
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">Variant<br /><span className="text-black font-medium">₹ {item.price}</span></p>
                </div>
                <div className="text-sm  w-full md:w-1/3">
                  <p className="font-semibold mb-1">Ordered Quantity</p>
                  <div className="flex items-center border rounded-md w-fit">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="px-3 py-1 border-r text-lg hover:bg-gray-200 disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="px-3 py-1 border-l text-lg hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>


                <div className="w-full md:w-auto text-right">
                  <p className="font-semibold text-lg">Total Price: <span className="text-green-600">₹ {item.total.toLocaleString()}</span></p>
                  <div className="flex justify-end gap-2 mt-2">
                    <button className="text-yellow-400 border border-gray-400 text-sm p-2 rounded-md cursor-pointer"><IoHeartSharp size={22} /></button>
                    <button className="text-red-400 border border-gray-400 p-2 rounded-md cursor-pointer"><MdDelete size={22} /></button>
                  </div>
                </div>
              </div>
            ))}

            <div className=" pt-4 mt-2">
              <div className="flex flex-col flex-wrap justify-between gap-4 items-end text-lg font-semibold">
                <div>Total Amount: <span className="line-through text-gray-500">₹ 24,000</span> <span className="text-green-600 text-2xl">₹ 22,800</span></div>
                <div className="text-sm mt-2 md:mt-0">Discount: <span className="bg-blue-100 text-[#013E70] px-2 py-1 rounded-md text-sm font-medium">5%</span></div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button className="px-5 py-2 border border-gray-400 rounded-md">Cancel</button>
                <button className="px-5 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
