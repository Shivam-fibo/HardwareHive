import React, { useState, useEffect } from "react";
import {
  CiSearch,
  CiShoppingCart,
  CiMenuBurger,
} from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { PiBellBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import { IoLogOutOutline } from "react-icons/io5";


function Header() {
  const [showProfile, setShowProfile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user || !user._id) return;

    try {
      const res = await fetch(
        `https://hardware-hive.vercel.app/api/user/notifications/${user._id}`
      );
      const data = await res.json();
      if (Array.isArray(data)) setNotifications(data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  return (
    <header className="bg-white top-0 z-50 shadow-sm">
      <div className="sm:h-12 p-2">
        {/* Top Row: Logo + Icons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-10 h-full">

          {/* Logo & Actions in Row */}
          <div className="flex items-center justify-between w-full sm:w-auto h-full">
            {/* Logo */}
            <button  onClick={() => navigate("/")} className=" cursor-pointer flex items-center space-x-2"> 
              <img
                src="/logo/ss_power_tool_logo.svg"
                width={"150px"}
                className="sm:ml-6"
                alt="SS Power Tools Logo"
              />
            </button>


            {/* Icons for mobile view */}
            <div className="flex sm:hidden items-center space-x-3 text-black mr-2 sm:mr-0">
              <button aria-label="Cart"><CartIcon size={20} strokeWidth={0.5} /></button>
              <button aria-label="Notifications"><PiBellBold size={22} strokeWidth={0.5} /></button>
              <button aria-label="User" onClick={() => setShowProfile(!showProfile)}><FaRegUser size={20} strokeWidth={0.5} className=" cursor-pointer" /></button>
            </div>

            {showProfile && (
              <div className="absolute border-gray-500 w-32 top-10 sm:top-11 right-4 sm:right-8 bg-white text-black shadow-lg rounded-lg z-50 overflow-hidden text-sm font-medium">
                <p onClick={() => navigate("/user")} className="cursor-pointer hover:bg-gray-300 flex items-center gap-2 px-4 p-1.5 text-nowrap">
                  <FaRegUser size={12} strokeWidth={0.5} className=" cursor-pointer" />
                  My Account</p>

                <p onClick={() => navigate("/")} className="cursor-pointer hover:bg-gray-300 flex items-center gap-2 px-4 p-1.5">
                  <IoLogOutOutline size={14} strokeWidth={0.5} className=" cursor-pointer" />
                  Logout</p>
              </div>
            )}

          </div>



          {/* Search Bar (on its own row on mobile) */}
          <div className="relative w-full sm:max-w-3xl">
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-[#0D2F4B] rounded-full py-2 pl-5 pr-20 text-sm"
            />
            <button className="absolute right-12 top-1/2 -translate-y-1/2 text-[#0D2F4B]">
              <FaMicrophone size={18} />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0D2F4B]">
              <CiSearch size={22} />
            </button>
          </div>

          {/* Icons for desktop view */}
          <div className="hidden sm:flex items-center space-x-4 text-black mr-6">
            <button aria-label="Cart"><CartIcon size={22} strokeWidth={0.5} /></button>
            <button aria-label="Notifications" onClick={() => setShowDropdown(!showDropdown)}>
              <PiBellBold size={24} strokeWidth={0.5} />
            </button>
            <button aria-label="User" onClick={() => setShowProfile(!showProfile)} ><FaRegUser size={22} strokeWidth={0.5} className=" cursor-pointer" /></button>
          </div>
        </div>

        {/* Notifications Badge */}
        {notifications.length > 0 && (
          <span className="absolute top-3 right-6 bg-white text-black text-xs px-1.5 py-0.5 rounded-full">
            {notifications.length}
          </span>
        )}

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute right-4 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
            <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
            {notifications.map((order) => (
              <p key={order._id} className="text-sm border-b py-1">
                Order #{order._id} is Confirmed ✅
              </p>
            ))}
          </div>
        )}
      </div>
    </header>

  );
}

export default Header;