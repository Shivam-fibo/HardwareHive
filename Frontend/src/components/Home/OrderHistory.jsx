import React, { useEffect, useState, useRef } from "react";
import { FaRegUser } from "react-icons/fa6";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import CartIcon from './CartIcon';
import { useNavigate } from "react-router-dom";
import { RiCustomerService2Fill } from 'react-icons/ri';



const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);

  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

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
    const userData = sessionStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserId(user._id);

      fetch(`https://hardware-hive-backend.vercel.app/api/user/history/${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(sortedData);
        })
        .catch((error) => console.error("Error fetching order history:", error));
    }
  }, []);


  return (
    <div>
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
                <button aria-label="Cart"><CartIcon size={20} strokeWidth={0.5} /></button>

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
              <button aria-label="Cart"><CartIcon size={20} strokeWidth={0.5} /></button>

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
            <h1 className="text-white text-lg">Your Order History</h1>
          </nav>

          <div className="text-white font-semibold text-[16px] whitespace-nowrap hidden sm:flex justify-center items-center sm:gap-1 absolute right-5">
            <RiCustomerService2Fill size={20} />
            <span className="font-bold">+91 9804611111</span>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default OrderHistory;
