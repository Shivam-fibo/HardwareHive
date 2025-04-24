import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const { cart, setCart, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);


  useEffect(() => {
    const loadCart = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user && user._id) {
          const res = await fetch(`https://hardware-hive.vercel.app/api/user/getCartItem/${user._id}`);
          const data = await res.json();
          if (res.ok) {
            setCart(data.items); // assuming the API returns { items: [...] }
          } else {
            toast.error("Failed to fetch cart from server");
          }
        }
      } catch (err) {
        console.error("Error loading cart from API:", err);
        toast.error("Could not load cart");
      }
    };
  
    loadCart();
  }, [setCart]);
  

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
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">All List Items ({cart.length})</h1>

      {cart.length === 0 ? (
        <div className="text-center p-6 border rounded-lg shadow-sm bg-white">
          <p className="text-lg sm:text-xl text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg shadow-sm p-4 flex flex-col sm:flex-row bg-white"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full sm:w-28 h-28 object-cover rounded-md"
                />
                <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold">{item.title}</h2>
                    <p className="text-gray-500">{item.subheading}</p>
                    <p className="text-base font-bold mt-1">₹{item.price}</p>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item._id, Number(e.target.value))
                        }
                        className="border p-2 w-16 text-center rounded-md"
                      />
                      <p className="text-sm sm:text-base">
                        Total: ₹{item.price * item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="mt-2 text-red-600 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="w-full lg:w-80 border rounded-lg shadow-md p-4 bg-white h-fit">
            <h2 className="text-xl font-bold mb-4">Price Details</h2>
            <div className="space-y-2">
              {cart.map((item) => (
                <p key={item._id} className="text-gray-700 text-sm">
                  {item.title} ({item.quantity}×) — ₹{item.price * item.quantity}
                </p>
              ))}
            </div>
            <hr className="my-3" />
            <h3 className="text-lg font-bold">Total Amount: ₹{totalPrice}</h3>
            <button
              className="mt-4 bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-md w-full"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
