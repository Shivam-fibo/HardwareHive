import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import CartIcon from './CartIcon';
import Header from './Nabar';
import { RiCustomerService2Fill } from 'react-icons/ri';
import Footer from '../LandingPage/Module/Footer';
import { History } from 'lucide-react';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  // Filter notifications based on status
  const filteredNotifications = notifications.filter((n) => 
    !filterStatus || n.status === filterStatus
  );

  // Calculate pagination variables
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const currentNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className='bg-[#F2F5F6]'>
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
           
      <div className="p-6 mt-4 max-w-4xl mx-auto bg-white rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-500 bg-[003F70] px-4 py-2 rounded-md shadow-sm border-l-4 border-[#003F70]">
            You can view up to the last 30 notifications
          </h1>
          <select
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1); // Reset to first page when filter changes
            }}
            className="ml-4 border rounded-md px-2 py-1 text-sm text-[#003F70] shadow-sm"
          >
            <option value="">All</option>
            <option value="Confirm">Confirmed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="space-y-2 block sm:hidden">
          {currentNotifications.map((notification) => (
            <div
              key={notification._id}
              onClick={() => handleClick(notification)}
              className="flex items-center justify-between border rounded-md px-4 py-3 shadow-sm hover:shadow-md transition duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <FaUserCircle className="text-3xl text-gray-600" />
                <div>
                  <div className="font-semibold text-md">Order ID: {notification._id}</div>
                  <div className="text-sm ">
                    <p className="text-gray-600 mb-1">
                      Status:{' '}
                      <span
                        className={`font-medium ${notification.status === 'Confirm' ? 'text-green-600' : 'text-[#003F70]'
                          }`}
                      >
                        {notification.status === 'Confirm'
                          ? 'Your order is confirmed'
                          : 'Your order is pending'}
                      </span>
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Placed on: {formatDate(notification.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 hidden sm:block">
          {currentNotifications.map((notification) => (
            <div
              key={notification._id}
              onClick={() => handleClick(notification)}
              className="flex items-center justify-between border rounded-md px-4 py-3 shadow-sm hover:shadow-md transition duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <FaUserCircle className="text-3xl text-gray-600" />
                <div>
                  <div className="font-semibold text-md">Order ID: {notification._id}</div>
                  <div className="text-sm text-gray-500">
                    Placed on: {formatDate(notification.createdAt)}
                  </div>
                </div>
              </div>

              <div className="text-sm ">
                <p className="text-gray-600 mb-1">
                  Status:{' '}
                  <span
                    className={`font-medium ${notification.status === 'Confirm' ? 'text-green-600' : 'text-[#003F70]'
                      }`}
                  >
                    {notification.status === 'Confirm'
                      ? 'Your order is confirmed'
                      : 'Your order is pending'}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <ul className="flex justify-center gap-1 text-gray-900 my-10">
            <li>
              <a
                href="#"
                className={`grid size-8 place-content-center rounded border border-black transition-colors rtl:rotate-180 ${currentPage === 1 && "pointer-events-none"}`}
                onClick={() => handlePageChange(currentPage - 1)}
                aria-disabled={currentPage === 1}
              >
                ‹
              </a>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <a
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                  className={`flex justify-center items-center size-8 rounded border text-sm font-medium ${currentPage === index + 1 ? "bg-[#013E70] text-white" : ""}`}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                className={`grid size-8 place-content-center rounded border border-black transition-colors rtl:rotate-180 ${currentPage === totalPages && "pointer-events-none"}`}
                onClick={() => handlePageChange(currentPage + 1)}
                aria-disabled={currentPage === totalPages}
              >
                ›
              </a>
            </li>
          </ul>
        )}
      </div>
      
 
      <Footer />
    </div>
  );
};

export default NotificationPage;