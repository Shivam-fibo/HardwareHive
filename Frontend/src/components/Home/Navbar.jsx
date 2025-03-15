import { useState } from "react";
import { FaFileDownload } from "react-icons/fa";


import { FaCartArrowDown } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";


import { IoMdDownload } from "react-icons/io";



import { FaUserCircle } from "react-icons/fa";





export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
// bg-[#2557AB]
  return (
    <nav className=" bg-[#2557AB] h-12 p-4 border-t-4 border-white  flex items-center justify-between">
      {/* Left Section: Home & Categories */}
      <div className="flex items-center space-x-4">
        <button className="px-4  text-white text-2xl font-bold ">
          HOME
        </button>
        <div className="h-12 w-1 bg-white "></div>
        <div className="flex space-x-2">
        

          <button className="px-3  font-bold text-xl text-white  ">
            MACHINERY
          </button>
          <div className="h-12 w-1 bg-white "></div>
          <button className="px-3 py-1  font-bold text-xl text-white ">
            SPHARE PARTS 
          </button>
          <div className="h-12 w-1 bg-white  "></div>
          <button className="px-3 py-1  font-bold text-xl  text-white">
            BRANDS
          </button>
          <div className="h-12 w-1 bg-white "></div>
          <button className="px-3 py-1  font-bold text-xl text-white ">
           ACCESSORIES
          </button>
          <div className="h-12 w-1 bg-white "></div>

          <button className="px-3 py-1  font-bold   flex items-center text-white ">

            <IoMdDownload className = "mr-2 mt-1"/> DOWNLOAD
          </button>
          <button className="px-3 py-1  font-bold   flex items-center text-white ">

            <FaUserCircle className = "mr-2"/> ACCOUNT
            </button>
  
        </div>
      
      </div>

      {/* Middle Section: Category & Search Bar */}
    

      {/* Right Section: User Options */}

      <div className="flex items-center space-x-6">
      <button className="  border-gray-200  flex items-center text-3xl">
          <FaCartArrowDown className="mr-2 text-white" />
        </button>

      

        
        <button className="  border-gray-200 flex items-center text-3xl">
          <IoMdNotifications className="mr-2 text-white" />
        </button>
        <button className=" py-1  border-gray-200 flex items-center text-3xl">
          <FaUserCircle className="mr-2 text-white" />
        </button>

     
      </div>

    </nav>
  );
}
