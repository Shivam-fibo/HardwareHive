import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Pending");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://hardware-hive.vercel.app/api/admin/getPlacedOrder");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const confirmOrder = async (orderId) => {
    try {
      const res = await fetch(`https://hardware-hive.vercel.app/api/admin/confirm/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Confirm" }),
      });
      await res.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Confirm" } : order
        )
      );
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  const filteredOrders = orders.filter((order) => order.status === statusFilter);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            statusFilter === "Pending"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setStatusFilter("Pending")}
        >
          Pending
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            statusFilter === "Confirm"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setStatusFilter("Confirm")}
        >
          Confirmed
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">
          No {statusFilter.toLowerCase()} orders found
        </p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg shadow-md bg-white"
            >
              <div className="mb-3">
                <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
                <p className="text-gray-700">
                  <strong>Total Amount:</strong> ₹{order.totalAmount}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong>{" "}
                  <span className="font-semibold text-blue-600">
                    {order.status}
                  </span>
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Ordered On:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <hr className="my-3" />
              <div className="mb-3">
                <h3 className="text-lg font-semibold">User Details</h3>
                <p>
                  <strong>Name:</strong> {order.userId.name} ({order.userId.companyName})
                </p>
                <p><strong>Email:</strong> {order.userId.email}</p>
                <p><strong>Mobile:</strong> {order.userId.mobile}</p>
                <p><strong>Whatsapp:</strong> {order.userId.whatsapp}</p>
                <p>
                  <strong>Address:</strong> {order.userId.address},{" "}
                  {order.userId.city}, {order.userId.state} - {order.userId.pincode}
                </p>
                <p><strong>GST Number:</strong> {order.userId.gstNumber}</p>
              </div>
              <hr className="my-3" />
              <h3 className="text-lg font-semibold mb-2">Ordered Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center border p-3 rounded-md shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="ml-4 flex-1">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-gray-500">{item.subheading}</p>
                      <p className="mt-2 font-bold">
                        ₹{item.price} x {item.quantity} = ₹
                        {item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {order.status === "Pending" && (
                <button
                  onClick={() => confirmOrder(order._id)}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Confirm Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
