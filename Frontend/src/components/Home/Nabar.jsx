import React, { useState, useEffect } from 'react';
// Importing icons from different react-icons libraries
import { CiSearch, CiShoppingCart, CiHeart, CiBellOn, CiUser, CiMenuBurger } from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {useNavigate} from "react-router-dom"
import CartIcon from "./CartIcon"

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navLinks = [
        { name: 'Machinery', href: '#' },
        { name: 'Spare Parts', href: '#' },
        { name: 'Brands', href: '#' },
        { name: 'Accessories', href: '#' },
    ];

    const contactNumber = "+91 9804611111"; // Define contact number

 
    const navigate = useNavigate()
    useEffect(() => {
      fetchNotifications();
    }, []);
  
   
const fetchNotifications = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user._id) return console.warn("User ID not found in localStorage");
    
  console.log("Using user ID:", user._id); 
    
  try {
 
    const requestInfo = {
      method: 'GET',
      headers: {
      }
    };
    console.log("Request details:", requestInfo);
        
    const res = await fetch(`http://localhost:5000/api/user/notifications/${user._id}`, requestInfo);
        
    console.log("Full response:", res);
    console.log("Response headers:", Object.fromEntries([...res.headers]));
        
    const newOrders = await res.json();
    console.log("Fetched newOrders:", newOrders);
        
    if (!Array.isArray(newOrders)) {
      console.error("Expected an array but got:", newOrders);
      return;
    }
        
    setNotifications(newOrders);
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};


    return (
        <header className="bg-white  sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
                {/* --- Top Row: Logo, Search, Actions --- */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Mobile Menu Button (appears first on mobile) */}
                    <div className="md:hidden order-1">
                        <button
                            onClick={toggleMobileMenu}
                            aria-label="Toggle menu"
                            className="text-gray-600  "
                        >
                           {isMobileMenuOpen ? <IoClose size={28} /> : <CiMenuBurger size={28} />}
                        </button>
                    </div>

                    {/* Logo / Brand Text */}
                    <div className="order-2 md:order-1">
                        <a href="/" className="text-xl lg:text-2xl font-bold text-red-600 whitespace-nowrap">
                           SS Power Tool
                        </a>
                    </div>

                    {/* Search Bar (grows and centered on medium+, full width on mobile) */}
                    <div className="relative flex-grow min-w-0 order-4 md:order-2 w-full md:w-auto md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full border border-gray-400 rounded-lg py-2 pl-5 pr-20 text-sm"
                        />
                        {/* Microphone Icon */}
                        <button className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-700">
                            <FaMicrophone size={18} />
                        </button>
                        {/* Search Icon */}
                         <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-700">
                            <CiSearch size={22} strokeWidth={1}/>
                        </button>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center space-x-3 sm:space-x-4 order-3 md:order-3">
                        <button aria-label="Shopping Cart" className="text-gray-600 hover:text-blue-700">
                            {/* <CiShoppingCart size={26} strokeWidth={0.5}/> */}
                            <CartIcon size={26} strokeWidth={0.5}/>
                        </button>
                        <button aria-label="Wishlist" className="text-gray-600 hover:text-blue-700">
                            <CiHeart size={26} strokeWidth={0.5}/>
                        </button>
                        <button aria-label="Notifications" className="text-gray-600 hover:text-blue-700">
                            <CiBellOn size={26} strokeWidth={0.5} onClick={() => setShowDropdown(!showDropdown)}
                            />
                        </button>
                        <button
  aria-label="User Profile"
  className="text-gray-600 hover:text-blue-700"
  onClick={() => navigate("/user")} 
>
  <CiUser size={26} strokeWidth={0.5} />
</button>

                    </div>
                </div>


                {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {notifications.length}
            </span>
          )}


        {showDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
            {notifications.length > 0 ? (
              notifications.map((order) => (
                <p key={order._id} className="text-sm border-b py-1">
                  Order #{order._id} is Confirmed ✅
                </p>
              ))
            ) : (
              <p className="text-sm">No new notifications</p>
            )}
          </div>
        )}

                {/* --- Bottom Row: Navigation & Contact (hidden on mobile) --- */}
                <div className="hidden md:flex items-center justify-center md:justify-between mt-4 pt-3 border-t border-gray-200">
                     {/* Navigation Links */}
                    <nav className="flex flex-wrap gap-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="bg-[#0D2F4B] text-white px-4 py-1.5 rounded hover:bg-blue-800 text-sm font-medium whitespace-nowrap"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                     {/* Contact Number */}
                     <div className="hidden lg:block text-[#0D2F4B] font-semibold text-sm ml-6 whitespace-nowrap">
                        Contact No. {contactNumber}
                    </div>
                </div>
            </div>

             {/* --- Mobile Menu --- */}
             {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white  z-40 border-t border-gray-200">
                    <nav className="flex flex-col p-4 space-y-3">
                        {navLinks.map((link) => (
                             <a
                                key={link.name}
                                href={link.href}
                                onClick={toggleMobileMenu} // Close menu on link click
                                className="block bg-[#0D2F4B] text-white px-4 py-2 rounded hover:bg-blue-800 text-center text-sm font-medium"
                            >
                                {link.name}
                            </a>
                        ))}
                         <div className="text-center text-[#0D2F4B] font-semibold text-sm pt-2 border-t mt-2">
                            Contact No. {contactNumber}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;