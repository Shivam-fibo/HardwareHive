import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserId(user._id);

      // Fetch order history using user ID
      fetch(`https://hardware-hive.vercel.app/api/user/history/${user._id}`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((error) => console.error("Error fetching order history:", error));
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No confirmed orders found</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-lg shadow-md bg-white">
              
              {/* Order Details */}
              <div className="mb-3">
                <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
                <p className="text-gray-700"><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                <p className="text-green-600 font-semibold"><strong>Status:</strong> {order.status}</p>
                <p className="text-gray-500 text-sm"><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              </div>

              <hr className="my-3" />

              {/* Ordered Items */}
              <h3 className="text-lg font-semibold mb-2">Ordered Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center border p-3 rounded-md shadow-sm">
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                    <div className="ml-4">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-gray-500">{item.subheading}</p>
                      <p className="font-bold">₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
