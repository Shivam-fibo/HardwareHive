import React, { useEffect, useState, useRef } from "react";
import { FaRegUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import CartIcon from './CartIcon';
import { useNavigate } from "react-router-dom";
import { RiCustomerService2Fill } from 'react-icons/ri';
import Footer from "../Home/Footer";
import { PiBellBold } from "react-icons/pi";
import { PiFilePdfDuotone } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";




const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [minimumLoadTimePassed, setMinimumLoadTimePassed] = useState(false);
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const profileRef = useRef(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
  const fetchOrderHistory = async () => {
    const startTime = Date.now();
    const userData = localStorage.getItem("user");

    if (userData) {
      const user = JSON.parse(userData);
      setUserId(user._id);

      try {
        const res = await fetch(`https://hardware-hive-backend.vercel.app/api/user/history/${user._id}`);
        const data = await res.json();

        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedData);
        setFilteredOrders(sortedData);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally{
const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(100 - elapsed, 0);

        setTimeout(() => {
          setMinimumLoadTimePassed(true);
          setIsLoading(false);
        }, remainingTime);
      }
    }
  };

  fetchOrderHistory();
}, []);


  const handleDateFilter = () => {
    if (!fromDate && !toDate) {
      setFilteredOrders(orders);
      setCurrentPage(1); // Reset to first page when filter changes
      return;
    }

    const filtered = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      // Set time to start/end of day for proper comparison
      if (from) from.setHours(0, 0, 0, 0);
      if (to) to.setHours(23, 59, 59, 999);

      if (from && to) {
        return orderDate >= from && orderDate <= to;
      } else if (from) {
        return orderDate >= from;
      } else if (to) {
        return orderDate <= to;
      }
      return true;
    });

    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to first page when filter changes
    setShowCalendar(false);
  };

  const clearDateFilter = () => {
    setFromDate('');
    setToDate('');
    setFilteredOrders(orders);
    setCurrentPage(1); // Reset to first page when filter changes
    setShowCalendar(false);
  };

  // Format date to day/month/year
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Calculate pagination variables
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  const downloadOrderAsPdfCDN = async (order, orderIndex) => {
    try {
      // Load html2pdf from CDN if not already loaded
      if (!window.html2pdf) {
        console.log('Loading html2pdf library...');
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        document.head.appendChild(script);

        // Wait for script to load with proper error handling
        await new Promise((resolve, reject) => {
          script.onload = () => {
            console.log('html2pdf loaded successfully');
            resolve();
          };
          script.onerror = () => {
            console.error('Failed to load html2pdf');
            reject(new Error('Failed to load PDF library'));
          };

          // Timeout after 10 seconds
          setTimeout(() => {
            reject(new Error('PDF library loading timeout'));
          }, 10000);
        });
      }

      // Wait a bit more to ensure the library is fully initialized
      await new Promise(resolve => setTimeout(resolve, 500));

      // Create the PDF content with better styling
      const element = document.createElement('div');
      element.style.width = '210mm'; // A4 width
      element.style.minHeight = '297mm'; // A4 height
      element.style.margin = '0';
      element.style.padding = '20px';
      element.style.boxSizing = 'border-box';

      element.innerHTML = `
      <div style="
        font-family: 'Arial', 'Helvetica', sans-serif; 
        line-height: 1.4;
        color: #333;
        max-width: 100%;
        margin: 0 auto;
        padding: 0;
      ">
        <!-- Header -->
        <div style="
          text-align: center; 
          border-bottom: 3px solid #013E70; 
          padding-bottom: 20px; 
          margin-bottom: 30px;
        ">
          <h1 style="
            margin: 0; 
            color: #013E70; 
            font-size: 28px; 
            font-weight: bold;
          ">Order Receipt</h1>
        </div>
        
        <!-- Order Info -->
        <div style="
          display: flex; 
          justify-content: space-between; 
          margin-bottom: 25px;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 8px;
        ">
          <div>
            <h2 style="margin: 0 0 8px 0; font-size: 20px; color: #013E70;">
              Order #${orderIndex + 1 + ((currentPage - 1) * itemsPerPage)}
            </h2>
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>Date:</strong> ${formatDate(order.createdAt)}
            </p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; font-size: 24px; font-weight: bold; color: #2e7d32;">
              Total: ₹${order.totalAmount}
            </p>
          </div>
        </div>
        
        <!-- Items Header -->
        <h3 style="
          border-bottom: 2px solid #ddd; 
          padding-bottom: 8px; 
          margin-bottom: 20px;
          font-size: 18px;
          color: #013E70;
        ">Ordered Items</h3>
        
        <!-- Items List -->
        <div style="margin-bottom: 30px;">
          ${order.items.map((item, index) => `
            <div style="
              display: flex; 
              margin-bottom: 20px; 
              padding: 15px; 
              border: 1px solid #e0e0e0;
              border-radius: 8px;
              background-color: #fafafa;
              align-items: center;
            ">
              <div style="
                width: 50px; 
                height: 50px; 
                background-color: #013E70; 
                color: white;
                display: flex; 
                align-items: center; 
                justify-content: center; 
                margin-right: 20px; 
                font-weight: bold;
                border-radius: 50%;
                font-size: 18px;
              ">
                ${index + 1}
              </div>
              <div style="flex-grow: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="flex: 1;">
                    <p style="margin: 0 0 8px 0; font-weight: bold; font-size: 16px; color: #333;">
                      ${item.title}
                    </p>
                    <p style="margin: 0; color: #666; font-size: 14px;">
                      <strong>Unit Price:</strong> ₹${item.price}
                    </p>
                  </div>
                  <div style="text-align: right; min-width: 150px;">
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">
                      <strong>Quantity:</strong> ${item.quantity}
                    </p>
                    <p style="margin: 0; font-weight: bold; color: #2e7d32; font-size: 16px;">
                      <strong>Subtotal: ₹${item.price * item.quantity}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <!-- Footer -->
        <div style="
          margin-top: 40px; 
          text-align: center; 
          border-top: 2px solid #013E70;
          padding-top: 20px;
          color: #666;
          font-size: 14px;
        ">
          <p style="margin: 0;">Thank you for your order!</p>
          <p style="margin: 5px 0 0 0;">For any queries, contact us at +91 9804611111</p>
        </div>
      </div>
    `;

      // Append to body temporarily to ensure proper rendering
      document.body.appendChild(element);

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `order_${order._id}_${new Date().getTime()}.pdf`,
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          height: element.scrollHeight,
          width: element.scrollWidth
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
          compress: true
        },
        pagebreak: {
          mode: ['avoid-all', 'css', 'legacy']
        }
      };

      console.log('Generating PDF...');

      // Generate and save PDF
      await window.html2pdf().from(element).set(opt).save();

      console.log('PDF generated successfully');

      // Remove the temporary element
      document.body.removeChild(element);

    } catch (error) {
      console.error('Error generating PDF:', error);

      // More specific error messages
      let errorMessage = 'Failed to generate PDF. ';
      if (error.message.includes('timeout')) {
        errorMessage += 'The PDF library took too long to load. Please check your internet connection and try again.';
      } else if (error.message.includes('Failed to load')) {
        errorMessage += 'Could not load the PDF library. Please check your internet connection and try again.';
      } else {
        errorMessage += 'Please try again. If the problem persists, try refreshing the page.';
      }

      alert(errorMessage);

    };



  };



   if (isLoading || !minimumLoadTimePassed) {
    return (
      <div>
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

        <div className="bg-[#013E70] text-[#000000] py-2 hidden sm:block ">
          <div className="w-full mx-auto flex flex-row justify-center items-center gap-4">
            <nav className="w-full flex flex-nowrap justify-start sm:justify-center gap-2 relative scroll-width-none overflow-x-scroll sm:overflow-visible whitespace-nowrap px-4">
              <div className="flex items-center gap-4">
                <h1 className="text-white font-bold text-lg">Order History</h1>

                {/* Calendar Filter Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="flex items-center gap-2 bg-white text-[#013E70] px-3 py-1 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
                  >
                    <MdDateRange size={16} />

                  </button>

                  {/* Calendar Dropdown */}
                  {showCalendar && (
                    <div>
                      <div
                        ref={calendarRef}
                        className="absolute hidden sm:block top-full mt-6.5 left-0 bg-white rounded-lg shadow-lg border p-4 z-50 min-w-[300px]"
                      >
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-800 text-sm">Select Date</h3>

                          <div className="grid grid-cols-1 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">From Date:</label>
                              <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013E70] focus:border-transparent text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">To Date:</label>
                              <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013E70] focus:border-transparent text-sm"
                              />
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">

                            <button
                              onClick={clearDateFilter}
                              className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                            >
                              Clear
                            </button>
                            <button
                              onClick={handleDateFilter}
                              className="flex-1 bg-[#013E70] text-white px-3 py-2 rounded-md hover:bg-[#012a52] transition-colors text-sm font-medium"
                            >
                              Apply
                            </button>
                          </div>

                          {(fromDate || toDate) && (
                            <div className="text-xs text-gray-600 pt-1">
                              {fromDate && toDate ? (
                                `Showing orders from ${formatDate(fromDate)} to ${formatDate(toDate)}`
                              ) : fromDate ? (
                                `Showing orders from ${formatDate(fromDate)} onwards`
                              ) : (
                                `Showing orders up to ${formatDate(toDate)}`
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        ref={calendarRef}
                        className="fixed  block sm:hidden mt-6.5 sm:w-auto sm:min-w-[300px] bg-white rounded-lg shadow-lg border p-4 z-50"
                      >
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-800 text-sm">Filter Orders by Date Range</h3>

                          <div className="grid grid-cols-1 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">From Date:</label>
                              <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013E70] focus:border-transparent text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">To Date:</label>
                              <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013E70] focus:border-transparent text-sm"
                              />
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={handleDateFilter}
                              className="flex-1 bg-[#013E70] text-white px-3 py-2 rounded-md hover:bg-[#012a52] transition-colors text-sm font-medium"
                            >
                              Apply Filter
                            </button>
                            <button
                              onClick={clearDateFilter}
                              className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                            >
                              Clear
                            </button>
                          </div>

                          {(fromDate || toDate) && (
                            <div className="text-xs text-gray-600 pt-1">
                              {fromDate && toDate ? (
                                `Showing orders from ${formatDate(fromDate)} to ${formatDate(toDate)}`
                              ) : fromDate ? (
                                `Showing orders from ${formatDate(fromDate)} onwards`
                              ) : (
                                `Showing orders up to ${formatDate(toDate)}`
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </nav>

            <div className="text-white font-semibold text-[16px] whitespace-nowrap hidden sm:flex justify-center items-center sm:gap-1 absolute right-5">
              <RiCustomerService2Fill size={20} />
              <span className="font-bold">+91 9804611111</span>
            </div>
          </div>
        </div>


        <div className="bg-[#013E70] text-[#000000] py-2 block sm:hidden ">
          <div className="w-full mx-auto flex flex-row justify-center items-center gap-4">

            <div className="flex items-center gap-4">
              <h1 className="text-white font-bold text-lg">Order History</h1>

              {/* Calendar Filter Button */}
              <div className="relative">
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="flex items-center gap-2 bg-white text-[#013E70] px-3 py-1 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
                >
                  <MdDateRange size={16} />

                </button>

                {/* Calendar Dropdown */}
                {showCalendar && (
                  <div>
                    <div
                      ref={calendarRef}
                      className="absolute hidden sm:block top-full mt-6.5 left-0 bg-white rounded-lg shadow-lg border p-4 z-50 min-w-[300px]"
                    >
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800 text-sm">Select Date</h3>

                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">From Date:</label>
                            <input
                              type="date"
                              value={fromDate}
                              onChange={(e) => setFromDate(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013E70] focus:border-transparent text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">To Date:</label>
                            <input
                              type="date"
                              value={toDate}
                              onChange={(e) => setToDate(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013E70] focus:border-transparent text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">

                          <button
                            onClick={clearDateFilter}
                            className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                          >
                            Clear
                          </button>
                          <button
                            onClick={handleDateFilter}
                            className="flex-1 bg-[#013E70] text-white px-3 py-2 rounded-md hover:bg-[#012a52] transition-colors text-sm font-medium"
                          >
                            Apply
                          </button>
                        </div>

                        {(fromDate || toDate) && (
                          <div className="text-xs text-gray-600 pt-1">
                            {fromDate && toDate ? (
                              `Showing orders from ${formatDate(fromDate)} to ${formatDate(toDate)}`
                            ) : fromDate ? (
                              `Showing orders from ${formatDate(fromDate)} onwards`
                            ) : (
                              `Showing orders up to ${formatDate(toDate)}`
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      ref={calendarRef}
                      className="fixed  block sm:hidden mt-6.5 sm:w-auto sm:min-w-[300px] bg-white rounded-lg shadow-lg border p-4 z-50"
                    >
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800 text-sm">Filter Orders by Date Range</h3>

                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">From Date:</label>
                            <input
                              type="date"
                              value={fromDate}
                              onChange={(e) => setFromDate(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013E70] focus:border-transparent text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">To Date:</label>
                            <input
                              type="date"
                              value={toDate}
                              onChange={(e) => setToDate(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013E70] focus:border-transparent text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={handleDateFilter}
                            className="flex-1 bg-[#013E70] text-white px-3 py-2 rounded-md hover:bg-[#012a52] transition-colors text-sm font-medium"
                          >
                            Apply Filter
                          </button>
                          <button
                            onClick={clearDateFilter}
                            className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                          >
                            Clear
                          </button>
                        </div>

                        {(fromDate || toDate) && (
                          <div className="text-xs text-gray-600 pt-1">
                            {fromDate && toDate ? (
                              `Showing orders from ${formatDate(fromDate)} to ${formatDate(toDate)}`
                            ) : fromDate ? (
                              `Showing orders from ${formatDate(fromDate)} onwards`
                            ) : (
                              `Showing orders up to ${formatDate(toDate)}`
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>



          </div>
        </div>
      </header>
        <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div
                className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#013F71] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
              <p className="mt-4 text-xl font-medium text-[#013F71]">Loading products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F3F5F7]">
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

        <div className="bg-[#013E70] text-[#000000] py-2 hidden sm:block ">
          <div className="w-full mx-auto flex flex-row justify-center items-center gap-4">
            <nav className="w-full flex flex-nowrap justify-start sm:justify-center gap-2 relative scroll-width-none overflow-x-scroll sm:overflow-visible whitespace-nowrap px-4">
              <div className="flex items-center gap-4">
                <h1 className="text-white font-bold text-lg">Order History</h1>

                {/* Calendar Filter Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="flex items-center gap-2 bg-white text-[#013E70] px-3 py-1 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
                  >
                    <MdDateRange size={16} />

                  </button>

                  {/* Calendar Dropdown */}
                  {showCalendar && (
                    <div>
                      <div
                        ref={calendarRef}
                        className="absolute hidden sm:block top-full mt-6.5 left-0 bg-white rounded-lg shadow-lg border p-4 z-50 min-w-[300px]"
                      >
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-800 text-sm">Select Date</h3>

                          <div className="grid grid-cols-1 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">From Date:</label>
                              <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013E70] focus:border-transparent text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">To Date:</label>
                              <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013E70] focus:border-transparent text-sm"
                              />
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">

                            <button
                              onClick={clearDateFilter}
                              className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                            >
                              Clear
                            </button>
                            <button
                              onClick={handleDateFilter}
                              className="flex-1 bg-[#013E70] text-white px-3 py-2 rounded-md hover:bg-[#012a52] transition-colors text-sm font-medium"
                            >
                              Apply
                            </button>
                          </div>

                          {(fromDate || toDate) && (
                            <div className="text-xs text-gray-600 pt-1">
                              {fromDate && toDate ? (
                                `Showing orders from ${formatDate(fromDate)} to ${formatDate(toDate)}`
                              ) : fromDate ? (
                                `Showing orders from ${formatDate(fromDate)} onwards`
                              ) : (
                                `Showing orders up to ${formatDate(toDate)}`
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        ref={calendarRef}
                        className="fixed  block sm:hidden mt-6.5 sm:w-auto sm:min-w-[300px] bg-white rounded-lg shadow-lg border p-4 z-50"
                      >
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-800 text-sm">Filter Orders by Date Range</h3>

                          <div className="grid grid-cols-1 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">From Date:</label>
                              <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013E70] focus:border-transparent text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">To Date:</label>
                              <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013E70] focus:border-transparent text-sm"
                              />
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={handleDateFilter}
                              className="flex-1 bg-[#013E70] text-white px-3 py-2 rounded-md hover:bg-[#012a52] transition-colors text-sm font-medium"
                            >
                              Apply Filter
                            </button>
                            <button
                              onClick={clearDateFilter}
                              className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                            >
                              Clear
                            </button>
                          </div>

                          {(fromDate || toDate) && (
                            <div className="text-xs text-gray-600 pt-1">
                              {fromDate && toDate ? (
                                `Showing orders from ${formatDate(fromDate)} to ${formatDate(toDate)}`
                              ) : fromDate ? (
                                `Showing orders from ${formatDate(fromDate)} onwards`
                              ) : (
                                `Showing orders up to ${formatDate(toDate)}`
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </nav>

            <div className="text-white font-semibold text-[16px] whitespace-nowrap hidden sm:flex justify-center items-center sm:gap-1 absolute right-5">
              <RiCustomerService2Fill size={20} />
              <span className="font-bold">+91 9804611111</span>
            </div>
          </div>
        </div>


        <div className="bg-[#013E70] text-[#000000] py-2 block sm:hidden ">
          <div className="w-full mx-auto flex flex-row justify-center items-center gap-4">

            <div className="flex items-center gap-4">
              <h1 className="text-white font-bold text-lg">Order History</h1>

              {/* Calendar Filter Button */}
              <div className="relative">
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="flex items-center gap-2 bg-white text-[#013E70] px-3 py-1 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
                >
                  <MdDateRange size={16} />

                </button>

                {/* Calendar Dropdown */}
                {showCalendar && (
                  <div>
                    <div
                      ref={calendarRef}
                      className="absolute hidden sm:block top-full mt-6.5 left-0 bg-white rounded-lg shadow-lg border p-4 z-50 min-w-[300px]"
                    >
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800 text-sm">Select Date</h3>

                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">From Date:</label>
                            <input
                              type="date"
                              value={fromDate}
                              onChange={(e) => setFromDate(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013E70] focus:border-transparent text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">To Date:</label>
                            <input
                              type="date"
                              value={toDate}
                              onChange={(e) => setToDate(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013E70] focus:border-transparent text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">

                          <button
                            onClick={clearDateFilter}
                            className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                          >
                            Clear
                          </button>
                          <button
                            onClick={handleDateFilter}
                            className="flex-1 bg-[#013E70] text-white px-3 py-2 rounded-md hover:bg-[#012a52] transition-colors text-sm font-medium"
                          >
                            Apply
                          </button>
                        </div>

                        {(fromDate || toDate) && (
                          <div className="text-xs text-gray-600 pt-1">
                            {fromDate && toDate ? (
                              `Showing orders from ${formatDate(fromDate)} to ${formatDate(toDate)}`
                            ) : fromDate ? (
                              `Showing orders from ${formatDate(fromDate)} onwards`
                            ) : (
                              `Showing orders up to ${formatDate(toDate)}`
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      ref={calendarRef}
                      className="fixed  block sm:hidden mt-6.5 sm:w-auto sm:min-w-[300px] bg-white rounded-lg shadow-lg border p-4 z-50"
                    >
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800 text-sm">Filter Orders by Date Range</h3>

                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">From Date:</label>
                            <input
                              type="date"
                              value={fromDate}
                              onChange={(e) => setFromDate(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013E70] focus:border-transparent text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">To Date:</label>
                            <input
                              type="date"
                              value={toDate}
                              onChange={(e) => setToDate(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#013E70] focus:border-transparent text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={handleDateFilter}
                            className="flex-1 bg-[#013E70] text-white px-3 py-2 rounded-md hover:bg-[#012a52] transition-colors text-sm font-medium"
                          >
                            Apply Filter
                          </button>
                          <button
                            onClick={clearDateFilter}
                            className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                          >
                            Clear
                          </button>
                        </div>

                        {(fromDate || toDate) && (
                          <div className="text-xs text-gray-600 pt-1">
                            {fromDate && toDate ? (
                              `Showing orders from ${formatDate(fromDate)} to ${formatDate(toDate)}`
                            ) : fromDate ? (
                              `Showing orders from ${formatDate(fromDate)} onwards`
                            ) : (
                              `Showing orders up to ${formatDate(toDate)}`
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>



          </div>
        </div>
      </header>

      <div className="p-4 bg-[#F3F4F6]">
        {/* Filter Status */}
        {(fromDate || toDate) && (
          <div className="max-w-4xl mx-auto mb-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-800 text-sm">
                <MdDateRange size={16} />
                <span>
                  {fromDate && toDate ? (
                    `Filtered: ${formatDate(fromDate)} - ${formatDate(toDate)}`
                  ) : fromDate ? (
                    `From: ${formatDate(fromDate)}`
                  ) : (
                    `Until: ${formatDate(toDate)}`
                  )}
                </span>
                <span className="font-medium">({filteredOrders.length} orders)</span>
              </div>
              <button
                onClick={clearDateFilter}
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Clear Filter
              </button>
            </div>
          </div>
        )}

        {filteredOrders.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {(fromDate || toDate) ? (
              <div>
                <p>No orders found for the selected date range</p>
                <button
                  onClick={clearDateFilter}
                  className="mt-2 text-blue-600 hover:text-blue-800 underline"
                >
                  Show all orders
                </button>
              </div>
            ) : (
              <p>No confirmed orders found</p>
            )}
          </div>
        ) : (
          <div className="space-y-2 mx-auto max-w-4xl">
            {currentOrders.map((order, orderIndex) => (
              <div key={order._id}>
                <div className="border mx-auto rounded-xl shadow-sm bg-white p-4 space-y-2 hidden sm:block">

                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Order #{orderIndex + 1 + ((currentPage - 1) * itemsPerPage)}</h2>
                    </div>
                    <div className="text-right sm:text-left mt-2 sm:mt-0">
                      <div className="text-sm text-black">
                        <div className="flex gap-13">
                          <strong>Total:₹{order.totalAmount}</strong>

                          <PiFilePdfDuotone
                            size={25}
                            className="text-red-500 cursor-pointer"
                            onClick={() => downloadOrderAsPdfCDN(order, orderIndex)}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-black mt-1">
                        <strong>Date: {formatDate(order.createdAt)}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-bold">Items</h3>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 border rounded-md p-3 shadow-sm flex-wrap bg-gray-50">

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
                            <div>{item.price}</div>
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
                  {/* Order Header - Improved layout for mobile */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        Order #{orderIndex + 1 + ((currentPage - 1) * itemsPerPage)}
                      </h2>
                      <p className="text-xs text-black mt-1">
                        <strong>Date: {formatDate(order.createdAt)}</strong>
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <strong className="text-sm">Total: ₹{order.totalAmount}</strong>
                      <PiFilePdfDuotone
                        size={20}
                        className="text-red-500 cursor-pointer"
                        onClick={() => downloadOrderAsPdfCDN(order, orderIndex)}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-bold">Items</h3>
                    {order.items.map((item, index) => (
                      <div key={index} className="border rounded-md p-3 shadow-sm bg-gray-50">
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

                          {/* Info Section - Split into two columns */}
                          <div className="flex-1 grid grid-cols-2 gap-2">
                            {/* Left Column - Title and Subtitle */}
                            <div className="col-span-1">
                              <div className="font-medium text-gray-800 line-clamp-2">
                                {item.title}
                              </div>
                              <div className="text-sm font-bold">₹{item.price}</div>
                            </div>

                            {/* Right Column - Price and Quantity */}
                            <div className="col-span-1 text-right">

                              <div className="text-sm">Quantity:{item.quantity}</div>
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
            ))}

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
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;