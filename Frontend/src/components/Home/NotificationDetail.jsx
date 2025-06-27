import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { FaRegUser } from "react-icons/fa6";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import CartIcon from './CartIcon';
import { History } from 'lucide-react';
import { PiBellBold } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";

const NotificationDetail = () => {
  const { state: notification } = useLocation();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
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

  if (!notification) {
    return (
      <div className="text-center mt-10 text-lg">
        No notification found. <br />
        <button className="text-blue-500 underline mt-2" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="bg-[#F3F5F7] min-h-screen">
      <header className="bg-white top-0 z-50 shadow-sm sticky">
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
                <button aria-label="Notifications"><PiBellBold size={22} strokeWidth={0.5} onClick={() => navigate("/notification")} /></button>
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
                  <p onClick={() => navigate("/history")} className="cursor-pointer hover:bg-gray-300 flex items-center gap-2 px-4 p-1.5 text-nowrap">
                    <History size={12} /> My History
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
              <button aria-label="Notifications"><PiBellBold size={22} strokeWidth={0.5} onClick={() => navigate("/notification")} /></button>
              <button aria-label="User" onClick={() => setShowProfile(!showProfile)}>
                <FaRegUser size={22} strokeWidth={0.5} className="cursor-pointer" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#013E70] text-[#000000] py-2 hidden sm:block">
          <div className="w-full mx-auto flex flex-row justify-center items-center gap-4">
            <nav className="w-full flex flex-nowrap justify-start sm:justify-center gap-2 relative scroll-width-none overflow-x-scroll sm:overflow-visible whitespace-nowrap px-4">
              <h1 className="text-white font-bold text-lg">Order Details</h1>
            </nav>

            <div className="text-white font-semibold text-[16px] whitespace-nowrap hidden sm:flex justify-center items-center sm:gap-1 absolute right-5">
              <RiCustomerService2Fill size={20} />
              <span className="font-bold">+91 9804611111</span>
            </div>
          </div>
        </div>

        <div className="bg-[#013E70] text-[#000000] py-2 sm:hidden block">
          <div className="w-full text-center">
            <h1 className="text-white font-bold text-lg">Order Details</h1>
          </div>
        </div>
      </header>

      <div className="p-4 bg-[#F3F4F6]">
        {/* Desktop Version */}
        <div className="border mx-auto rounded-xl shadow-sm bg-white p-4 space-y-2 hidden sm:block max-w-4xl">
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold">Status:</span>
              <span
                className={`font-medium ${notification.status === 'Confirm' ? 'text-green-600' : 'text-red-600'
                  }`}
              >
                {notification.status === 'Confirm'
                  ? 'Your order is confirmed'
                  : 'Your order is pending'}
              </span>
            </div>
            <div className="text-right sm:text-left mt-2 sm:mt-0">
              <div className="text-sm text-black">
                <strong>Total: ₹{notification.totalAmount}</strong>
              </div>
              <p className="text-xs text-black mt-1">
                <strong>Date: {formatDate(notification.createdAt)}</strong>
              </p>
            </div>
          </div>

          <div className="space-y-3">


            {/* <h3 className="text-base font-bold">Items</h3> */}
            {notification.items.map((item, index) => (
              <div key={item._id} className="flex items-start gap-3 border rounded-md p-3 shadow-sm flex-wrap bg-gray-50">
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
                    <div>{item.title}</div>
                    <div>₹{item.price}</div>
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

        {/* Mobile Version */}
        <div className="border mx-auto rounded-xl shadow-sm bg-white p-4 space-y-2 block sm:hidden">
          {/* Order Header */}
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">Status:</span>
                <span
                  className={`text-sm font-medium ${notification.status === 'Confirm' ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                  {notification.status === 'Confirm'
                    ? 'Confirmed'
                    : 'Pending'}
                </span>
              </div>


            </div>
            <div className="flex flex-col items-end gap-1">
              <strong className="text-sm">Total: ₹{notification.totalAmount}</strong>

            </div>

          </div>

          <div className="space-y-3">


            {/* <h3 className="text-base font-bold">Items</h3> */}
            {notification.items.map((item, index) => (
              <div key={item._id} className="border rounded-md p-3 shadow-sm bg-gray-50">
                <div className="flex gap-3">
                  {/* Index Number */}
                  <div className="w-8 h-8 bg-blue-100 text-black border flex items-center justify-center rounded text-sm font-medium">
                    {index + 1}
                  </div>

                  {/* Item Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain border rounded bg-white"
                  />

                  {/* Info Section */}
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    {/* Left Column - Title and Price */}
                    <div className="col-span-1">
                      <div className="font-medium text-gray-800 line-clamp-2">
                        {item.title}
                      </div>
                      <div className="text-sm font-bold">₹{item.price}</div>
                    </div>

                    {/* Right Column - Quantity and Total */}
                    <div className="col-span-1 text-right">
                      <div className="text-sm">Quantity: {item.quantity}</div>
                      <div className="text-sm text-green-700 font-bold mt-1">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;