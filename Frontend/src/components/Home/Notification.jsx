import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from './Nabar';
// import React from 'react';
import { RiCustomerService2Fill } from 'react-icons/ri';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

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

  const renderMessage = (status) => {
    return status === 'Confirm'
      ? 'Your Order is Confirmed.'
      : "Sorry, we don't ship in your area. Thank you for shopping with us.";
  };

  return (
    <div>
      
      <div className="p-6 max-w-4xl mx-auto">
     
         <div className="w-full mx-auto flex flex-row justify-center items-center gap-4">
          <nav className="w-full flex flex-nowrap justify-start sm:justify-center gap-2 relative scroll-width-none overflow-x-scroll sm:overflow-visible whitespace-nowrap px-4">
            <h1 className="text-white text-lg">Notification</h1>
          </nav>

          <div className="text-white font-semibold text-[16px] whitespace-nowrap hidden sm:flex justify-center items-center sm:gap-1 absolute right-5">
            <RiCustomerService2Fill size={20} />
            <span className="font-bold">+91 9804611111</span>
          </div>
        </div>




        <h2 className="text-xl font-bold mb-4">All Notifications</h2>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              onClick={() => handleClick(notification)}
              className="flex items-center justify-between border rounded-md px-4 py-3 shadow-sm hover:shadow-md transition duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <FaUserCircle className="text-3xl text-gray-600" />
                <div>
                  <div className="font-semibold text-md">Order ID: {notification._id}</div>
                  <div className="text-sm text-gray-600">
                    {renderMessage(notification.status)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
