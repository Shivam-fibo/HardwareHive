import React, { useState, useEffect } from "react";
import {
  CiSearch,
  CiShoppingCart,
  CiHeart,
  CiBellOn,
  CiUser,
  CiMenuBurger,
} from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";

function Header() {
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
    <header className="bg-white border-t-8 border-t-[#013E70] sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* --- Top Row: Logo, Search, Actions --- */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="md:hidden order-1">
            <button onClick={toggleMobileMenu} aria-label="Toggle menu">
              {isMobileMenuOpen ? <IoClose size={28} /> : <CiMenuBurger size={28} />}
            </button>
          </div>

          <div className="order-2 md:order-1">
            <a href="/" className="text-xl lg:text-2xl font-bold text-red-600">
              SS Power Tool
            </a>
          </div>

          <div className="relative flex-grow order-4 md:order-2 w-full md:max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-[#0D2F4B] rounded-4xl py-2 pl-5 pr-20 text-sm"
            />
            <button className="absolute right-12 top-1/2 transform -translate-y-1/2 text-blue-700">
              <FaMicrophone size={18} />
            </button>
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-700">
              <CiSearch size={22} />
            </button>
          </div>

          <div className="flex items-center space-x-3 order-3 md:order-3">
            <button className="text-blue-700">
              <CartIcon size={26} strokeWidth={0.5} />
            </button>
            <button className="text-blue-700">
              <CiHeart size={26} strokeWidth={0.5} />
            </button>
            <button className="text-blue-700">
              <CiBellOn size={26} strokeWidth={0.5} onClick={() => setShowDropdown(!showDropdown)} />
            </button>
            <button className="text-blue-700" onClick={() => navigate("/user")}>
              <CiUser size={26} strokeWidth={0.5} />
            </button>
          </div>
        </div>

        {notifications.length > 0 && (
          <span className="absolute top-1 right-10 md:right-[8.5rem] bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {notifications.length}
          </span>
        )}

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4">
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
