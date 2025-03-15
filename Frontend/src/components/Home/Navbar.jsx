import { useState } from "react";
import { FaFileDownload } from "react-icons/fa";


import { FaCartArrowDown } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";





export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
// bg-[#2557AB]
  return (
    <nav className=" bg-gray-200 h-12 p-4 border-1 border-t-0 border-l-0 border-r-0  flex items-center justify-between">
      {/* Left Section: Home & Categories */}
      <div className="flex items-center space-x-4">
        <button className="px-4  text-black text-2xl font-bold ">
          HOME
        </button>
        <div className="h-12 w-0.5 bg-gray-400 "></div>
        <div className="flex space-x-2">
        
  
          <button className="px-3  font-bold text-xl  ">
            MACHINE WISE
          </button>
          <div className="h-12 w-0.5 bg-gray-400"></div>
          <button className="px-3 py-1  font-bold text-xl ">
            SPHARE PART WISE
          </button>
          <div className="h-12 w-0.5 bg-gray-400 "></div>
          <button className="px-3 py-1  font-bold text-xl ">
            BRAND WISE
          </button>
          <div className="h-12 w-0.5 bg-gray-400 "></div>
          <button className="px-3 py-1  font-bold text-xl ">
           ACCESSORIES
          </button>
          <div className="h-12 w-0.5 bg-gray-400 "></div>
          <button className="px-3 py-1  font-bold text-xl ">
          ANY REQUIREMENT
          </button>
        </div>
        <div className="h-12 w-0.5 bg-gray-400 "></div>
      </div>

      {/* Middle Section: Category & Search Bar */}
      

      {/* Right Section: User Options */}

      <div className="flex items-center space-x-6">

      <button className=" py-1 border border-gray-200 rounded flex items-center text-3xl">
          <FaFileDownload className="mr-2" />
        </button>

      <button className=" border border-gray-200 rounded flex items-center text-3xl">
          <img src="./logo/history.png" className="h-7 w-7" />
        </button>
        
        <button className=" border border-gray-200 rounded flex items-center text-3xl">
          <IoMdNotifications className="mr-2" />
        </button>

        <button className=" border border-gray-200 rounded flex items-center text-3xl">
          <FaCartArrowDown className="mr-2" />
        </button>
      </div>

    </nav>
  );
}
