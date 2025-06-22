import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import CartIcon from './CartIcon';

import Header from './Nabar';
// import React from 'react';
import { RiCustomerService2Fill } from 'react-icons/ri';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
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
    const fetchNotifications = async () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user || !user._id) return;

      try {
        const res = await fetch(`https://hardware-hive-backend.vercel.app/api/user/notifications/${user._id}`);
        const data = await res.json();
        if (Array.isArray(data)) setNotifications(data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  const handleClick = (notification) => {
    navigate(`/notification/${notification._id}`, { state: notification });
  };

  const renderMessage = (status) => {
    return status === 'Confirm'
      ? 'Your Order is Confirmed.'
      : "Sorry, we don't ship in your area. Thank you for shopping with us.";
  };

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
                  <h1 className="text-white text-lg">Notification</h1>
                </nav>
      
                <div className="text-white font-semibold text-[16px] whitespace-nowrap hidden sm:flex justify-center items-center sm:gap-1 absolute right-5">
                  <RiCustomerService2Fill size={20} />
                  <span className="font-bold">+91 9804611111</span>
                </div>
              </div>
            </div>
      
      <div className="p-6 max-w-4xl mx-auto">
     
         <div className="w-full mx-auto flex flex-row justify-center items-center gap-4">
          <nav className="w-full flex flex-nowrap justify-start sm:justify-center gap-2 relative scroll-width-none overflow-x-scroll sm:overflow-visible whitespace-nowrap px-4">
            <h1 className="text-white text-lg">Notification</h1>
          </nav>

          <div className="text-white font-semibold text-[16px] whitespace-nowrap hidden sm:flex justify-center items-center sm:gap-1 absolute right-5">
            <RiCustomerService2Fill size={20} />
            <span className="font-bold">+91 9804611111</span>
          </div>
        </div>




        <h2 className="text-xl font-bold mb-4">All Notifications</h2>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              onClick={() => handleClick(notification)}
              className="flex items-center justify-between border rounded-md px-4 py-3 shadow-sm hover:shadow-md transition duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <FaUserCircle className="text-3xl text-gray-600" />
                <div>
                  <div className="font-semibold text-md">Order ID: {notification._id}</div>
                  <div className="text-sm text-gray-600">
                    {renderMessage(notification.status)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
