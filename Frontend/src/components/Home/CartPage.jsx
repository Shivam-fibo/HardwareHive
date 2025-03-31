import { useEffect } from "react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    console.log("CartPage mounted, cart:", cart);
    
    // Debug check: verify localStorage directly
    try {
      const storedCart = localStorage.getItem("cart");
      console.log("Direct localStorage check in CartPage:", storedCart ? JSON.parse(storedCart) : "No cart found");
    } catch (error) {
      console.error("Error reading localStorage:", error);
    }
  }, [cart]);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All List Items ({cart.length})</h1>
      
   

      {cart.length === 0 ? (
        <div className="text-center p-8 border rounded-lg">
          <p className="text-xl text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {/* Cart Items */}
          <div className="col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="border p-4 rounded-lg shadow-md flex">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-md" />
                <div className="ml-4 flex-1">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-500">{item.subheading}</p>
                  <p className="text-lg font-bold">₹{item.price}</p>
                  <div className="flex items-center mt-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                      className="border p-2 w-16 text-center rounded-md"
                    />
                    <p className="ml-4">Total Price: ₹{item.price * item.quantity}</p>
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="bg-black text-white px-4 py-2 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Price Details</h2>
            {cart.map((item) => (
              <p key={item._id} className="text-gray-700">
                {item.title} ({item.quantity} items) ₹{item.price * item.quantity}
              </p>
            ))}
            <hr className="my-2" />
            <h2 className="text-xl font-bold">Total Amount ₹{totalPrice}</h2>
            <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md w-full">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;