import React, {useState, useEffect, useRef} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from './Nabar';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { FaRegUser } from "react-icons/fa6";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import CartIcon from './CartIcon';
import { History } from 'lucide-react';


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

  return (
    <div className="bg-gray-50 min-h-screen">
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

                    <button aria-label="User" onClick={() => setShowProfile(!showProfile)}>
                      <FaRegUser size={22} strokeWidth={0.5} className="cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
        
        <div className="bg-[#013E70] text-[#000000] py-2 ">
        <div className="w-full mx-auto flex flex-row justify-center items-center gap-4">
          <nav className="w-full flex flex-nowrap justify-start sm:justify-center gap-2 relative scroll-width-none overflow-x-scroll sm:overflow-visible whitespace-nowrap px-4">
            <h1 className="text-white font-bold text-lg">All Notification</h1>
          </nav>

          <div className="text-white font-semibold text-[16px] whitespace-nowrap hidden sm:flex justify-center items-center sm:gap-1 absolute right-5">
            <RiCustomerService2Fill size={20} />
            <span className="font-bold">+91 9804611111</span>
          </div>
        </div>
      </div>
          </header>



      <div className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Order Details</h2>
        <p className="text-gray-600 mb-1">Order ID: {notification._id}</p>
        <p className="text-gray-600 mb-1">
          Status:{' '}
          <span
            className={`font-medium ${
              notification.status === 'Confirm' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {notification.status === 'Confirm'
              ? 'Your order is confirmed'
              : 'Your order is pending'}
          </span>
        </p>
        <p className="text-gray-600 mb-6 font-medium">Total Amount: ₹{notification.totalAmount}</p>

        {/* Items List */}
        <div className="bg-white rounded-lg shadow border">
          {notification.items.map((item, index) => (
            <div
              key={item._id}
              className="flex items-start gap-4 border-b px-6 py-4 last:border-b-0"
            >
              {/* Serial Number */}
              <div className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded text-sm font-semibold mt-1">
                {index + 1}
              </div>

              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain border rounded"
              />

             <div className="flex flex-1 justify-between items-center flex-wrap gap-4 ">
  <h3 className="font-medium text-gray-800 text-base min-w-[150px]">{item.title}</h3>
  {/* <p className="text-sm text-gray-600 min-w-[100px]">Price: ₹{item.price}</p> */}
  <p className="text-sm text-gray-600 min-w-[100px]">Quantity: {item.quantity}</p>
  <p className="text-sm text-green-700 font-semibold min-w-[120px]">
    Total: ₹{item.price * item.quantity}
  </p>
</div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default NotificationDetail;
