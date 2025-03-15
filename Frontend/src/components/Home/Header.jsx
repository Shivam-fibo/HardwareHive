import { useState } from "react";
import { FiMenu, FiSearch, FiYoutube } from "react-icons/fi";
import { PiPhoneCallLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { IoIosMic } from "react-icons/io";
import { RiCustomerServiceFill } from "react-icons/ri";
import { FaUserCog } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";






export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-[#2557AB] p-4 flex items-center justify-between h-15">
      {/* Logo Section */}
      <div className=" text-white font-bold text-3xl p-2 rounded">
        SS POWER TOOL
      </div>

      {/* Middle Section: Category & Search */}
      <div className="relative flex-grow mx-4">

        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
          {/* Category Button */}
          <button
            className="flex items-center whitespace-nowrap px-4 py-2 font-semibold bg-gray-100 hover:bg-gray-200 transition"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FiMenu className="mr-2" />
            CATEGORY
          </button>
          <div className="h-6 w-1 bg-gray-300 mx-2"></div>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search for products..."
            className="p-2 w-full outline-none"
          />
         <button className="rounded-sm text-black h-10 mr-1 text-2xl">
          <IoIosMic />
        </button>
        <div className="h-6 w-1 bg-black "></div>
        <button className="rounded-sm text-black h-10 mr-1 p-2 text-2xl">
          <FiSearch />
        </button>

        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white border shadow-lg rounded-md">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Category 1</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Category 2</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Category 3</li>
            </ul>
          </div>
        )}
      </div>

      {/* Right Section: Social & Contact */}
      <div className="flex items-center space-x-3">
  <button className="p-3 text-white shadow-md transition duration-300 transform hover:scale-110 hover:bg-opacity-80">
    <FaYoutube className="text-4xl" />
  </button>
  <button className="p-3 text-white shadow-md transition duration-300 transform hover:scale-110 hover:bg-opacity-80">
    <RiCustomerServiceFill className="text-4xl" />
  </button>
  <button className="p-3 text-white shadow-md transition duration-300 transform hover:scale-110 hover:bg-opacity-80">
    <FaUserCog className="text-4xl" />
  </button>

</div>

    </nav>
  );
}
