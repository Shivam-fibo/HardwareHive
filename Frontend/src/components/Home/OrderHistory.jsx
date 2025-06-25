import React, { useEffect, useState, useRef } from "react";
import { FaRegUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import CartIcon from './CartIcon';
import { useNavigate } from "react-router-dom";
import { RiCustomerService2Fill } from 'react-icons/ri';
import Footer from "../LandingPage/Module/Footer";
import { PiBellBold } from "react-icons/pi";
import { PiFilePdfDuotone } from "react-icons/pi";


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
                <button aria-label="Notifications"><PiBellBold size={22} strokeWidth={0.5} onClick={() => navigate("/notification")} /></button>
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
              <button aria-label="Notifications"><PiBellBold size={22} strokeWidth={0.5} onClick={() => navigate("/notification")} /></button>
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
            <h1 className="text-white font-bold text-lg"> Order History</h1>
          </nav>

          <div className="text-white font-semibold text-[16px] whitespace-nowrap hidden sm:flex justify-center items-center sm:gap-1 absolute right-5">
            <RiCustomerService2Fill size={20} />
            <span className="font-bold">+91 9804611111</span>
          </div>
        </div>
      </div>
      <div className="p-4 bg-[#F3F4F6]">


        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No confirmed orders found</p>
        ) : (
          <div className="space-y-2 mx-auto max-w-4xl  ">
            {orders.map((order, orderIndex) => (
              <div>
                <div key={order._id} className="border mx-auto rounded-xl shadow-sm bg-white p-4 space-y-2 hidden sm:block ">

                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Order #{orderIndex + 1}</h2>

                    </div>
                    <div className="text-right sm:text-left mt-2 sm:mt-0">
                      <div className="text-sm text-black ">
                        <div className="flex gap-13">
                          <strong>Total:₹{order.totalAmount}</strong>
                          <PiFilePdfDuotone size={25} className="text-red-500 " />
                        </div>
                      </div>

                      <p className="text-xs text-black mt-1">
                        <strong>  Date: {new Date(order.createdAt).toLocaleString()}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-base  font-bold"> Items</h3>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 border rounded-md p-3 shadow-sm flex-wrap bg-gray-50">

                        {/* Index Number */}
                        <div className="w-8 h-8 bg-blue-100 text-black border flex items-center justify-center rounded text-sm font-medium mt-1">
                          {index + 1}
                        </div>

                        {/* Item Image */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-contain border rounded bg-white"
                        />

                        {/* Info Section */}
                        <div className="flex flex-1 justify-between items-center flex-wrap gap-4">

                          <div className="flex flex-col font-medium text-gray-800 mb-8 min-w-[150px]">
                            <div>
                              {item.title}

                            </div>
                            <div>
                              {item.price}

                            </div>

                          </div>

                          <p className="text-sm font-bold min-w-[120px] my-auto">
                            Quantity: {item.quantity}
                          </p>

                          <p className="text-sm text-green-700 font-bold min-w-[120px] my-auto">
                            Total: ₹{item.price * item.quantity}
                          </p>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

                <div key={`math.randome()`} className="border mx-auto rounded-xl shadow-sm bg-white p-4 space-y-2 block sm:hidden ">

                  {/* Order Header */}
                  <div className="flex flex-col ">
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Order #{orderIndex + 1}</h2>
                    </div>
                    <div className="text-right sm:text-left mt-2 sm:mt-0">
                      <div className="text-sm text-black ">
                        <div className="flex gap-13">
                          <strong>Total:₹{order.totalAmount}</strong>
                          <PiFilePdfDuotone size={25} className="text-red-500 " />
                        </div>
                      </div>

                      <p className="text-xs text-black mt-1">
                        <strong>  Date: {new Date(order.createdAt).toLocaleString()}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-base  font-bold"> Items</h3>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 border rounded-md p-3 shadow-sm flex-wrap bg-gray-50">

                        {/* Index Number */}
                        <div className="w-8 h-8 bg-blue-100 text-black border flex items-center justify-center rounded text-sm font-medium mt-1">
                          {index + 1}
                        </div>

                        {/* Item Image */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-contain border rounded bg-white"
                        />

                        {/* Info Section */}
                        <div className="flex flex-1 justify-between items-center flex-wrap gap-4">

                          <div className="flex flex-col font-medium text-gray-800 mb-8 min-w-[150px]">
                            <div>
                              {item.title}

                            </div>
                            <div>
                              {item.price}

                            </div>

                          </div>

                          <p className="text-sm font-bold min-w-[120px] my-auto">
                            Quantity: {item.quantity}
                          </p>

                          <p className="text-sm text-green-700 font-bold min-w-[120px] my-auto">
                            Total: ₹{item.price * item.quantity}
                          </p>
                        </div>

                      </div>
                    ))}
                  </div>
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

export default OrderHistory;
