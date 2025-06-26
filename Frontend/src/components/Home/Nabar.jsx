import React, { useState, useEffect, useRef } from "react";
import {
  CiSearch,
  CiShoppingCart,
  CiMenuBurger,
} from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { PiBellBold } from "react-icons/pi";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import { History } from "lucide-react";
import { RiCustomerService2Fill } from "react-icons/ri";

function Header() {
  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
const [searchResults, setSearchResults] = useState([]);


  const profileRef = useRef(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchNotifications();
  // }, []);

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
  if (!searchQuery.trim()) {
    setSearchResults([]);
    return;
  }

  const delayDebounce = setTimeout(async () => {
    try {
      const res = await fetch(`https://hardware-hive-backend.vercel.app/api/user/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      console.log("Search Results:", data);
      setSearchResults(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  }, 400); // 400ms debounce

  return () => clearTimeout(delayDebounce);
}, [searchQuery]);




  const handleNotification = () =>{
    console.log("notiification clicked!!!")
    navigate("/notification")
  }


  return (
    <header className="bg-white top-0 z-50 shadow-sm sticky">
      <div className="sm:h-12 p-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-10 h-full">

          {/* Logo & Icons */}
          <div className="flex items-center justify-between w-full sm:w-auto h-full">

            {/* Logo */}
            <button  onClick={() => navigate("/home")} className=" cursor-pointer flex items-center space-x-2">

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
              <button aria-label="Notifications"><PiBellBold size={22} strokeWidth={0.5} onClick={() => handleNotification()} /></button>
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

          {/* Search Bar */}
          <div className="relative w-full sm:max-w-3xl">
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-[#0D2F4B] rounded-full py-2 pl-5 pr-20 text-sm"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-12 top-1/2 -translate-y-1/2 text-[#0D2F4B]">
              <FaMicrophone size={18} />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0D2F4B]">
              <CiSearch size={22} />
            </button>
          </div>

          {/* Desktop Icons */}
          <div className="hidden sm:flex items-center space-x-4 text-black mr-6">
            <button aria-label="Cart"><CartIcon size={22} strokeWidth={0.5} /></button>
              <button aria-label="Notifications" className="cursor-pointer" onClick={() => handleNotification()}><PiBellBold size={22} strokeWidth={0.5} /></button>
            <button aria-label="User" onClick={() => setShowProfile(!showProfile)}>
              <FaRegUser size={22} strokeWidth={0.5} className="cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-[#013E70] text-[#000000] py-2 sm:block hidden ">
        <div className="w-full mx-auto flex flex-row justify-center items-center gap-4">
          <nav className="w-full flex flex-nowrap justify-start sm:justify-center gap-2 relative scroll-width-none overflow-x-scroll sm:overflow-visible whitespace-nowrap px-4">
            <h1 className="text-white font-semibold text-lg ">Item Add to List</h1>
          </nav>

          <div className="text-white font-semibold text-[16px] whitespace-nowrap  sm:flex justify-center items-center sm:gap-1 absolute right-5">
            <RiCustomerService2Fill size={20} />
            <span className="font-bold">+91 9804611111</span>
          </div>
        </div>
      </div>


      <div className="bg-[#013E70] text-[#000000] py-2 sm:hidden block ">
        <div className="w-full mx-auto flex flex-row justify-center items-center gap-4">
            <h1 className="text-white font-semibold text-lg ">Item Add to List</h1>
        </div>
      </div>
    </header>
  );
}

export default Header;
