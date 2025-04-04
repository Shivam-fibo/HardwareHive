import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const updateItemQuantity = (orderId, itemId, newQuantity) => {
    fetch(`http://localhost:5000/api/admin/updateQuantity`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, itemId, quantity: newQuantity })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Quantity updated:", data);
        // Optionally show a success message
      })
      .catch((error) => console.error("Error updating quantity:", error));
  };

  

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/getPlacedOrder")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const confirmOrder = (orderId) => {
    fetch(`http://localhost:5000/api/admin/confirm/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Confirm" })
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "Confirm" } : order
          )
        );
      })
      .catch((error) => console.error("Error confirming order:", error));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-lg shadow-md bg-white">
              <div className="mb-3">
                <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
                <p className="text-gray-700"><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                <p className="text-gray-700"><strong>Status:</strong> <span className="font-semibold text-blue-600">{order.status}</span></p>
                <p className="text-gray-500 text-sm"><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <hr className="my-3" />
              <div className="mb-3">
                <h3 className="text-lg font-semibold">User Details</h3>
                <p><strong>Name:</strong> {order.userId.name} ({order.userId.companyName})</p>
                <p><strong>Email:</strong> {order.userId.email}</p>
                <p><strong>Mobile:</strong> {order.userId.mobile}</p>
                <p><strong>Address:</strong> {order.userId.address}, {order.userId.city}, {order.userId.state} - {order.userId.pincode}</p>
                <p><strong>GST Number:</strong> {order.userId.gstNumber}</p>
              </div>
              <hr className="my-3" />
              <h3 className="text-lg font-semibold mb-2">Ordered Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {order.items.map((item, index) => (
  <div key={item._id} className="flex items-center border p-3 rounded-md shadow-sm">
    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
    <div className="ml-4 flex-1">
      <h4 className="font-semibold">{item.title}</h4>
      <p className="text-gray-500">{item.subheading}</p>
      <div className="flex items-center gap-2 mt-1">
        <label className="font-medium">Qty:</label>
        <input
          type="number"
          value={item.quantity}
          min="1"
          onChange={(e) => {
            const newQuantity = parseInt(e.target.value);
            setOrders((prevOrders) =>
              prevOrders.map((o) =>
                o._id === order._id
                  ? {
                      ...o,
                      items: o.items.map((i, idx) =>
                        idx === index ? { ...i, quantity: newQuantity } : i
                      )
                    }
                  : o
              )
            );
          }}
          className="w-20 border rounded px-2 py-1"
        />
        <button
          onClick={() => updateItemQuantity(order._id, item._id, item.quantity)}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </div>
      <p className="mt-2 font-bold">₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
    </div>
  </div>
))}

              </div>
              <button
                onClick={() => confirmOrder(order._id, order.userId.mobile)}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Confirm Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
