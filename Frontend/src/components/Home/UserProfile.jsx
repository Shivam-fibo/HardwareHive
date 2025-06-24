import { useEffect, useState, useRef } from "react";
import {

  Pencil,
  History
} from "lucide-react";


import { FaRegUser } from "react-icons/fa6";
import { RiCustomerService2Fill } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import Footer from "../LandingPage/Module/Footer";
import UserProfileUpdate from "./UserProfileUpdate";
import CartIcon from "./CartIcon";


import { PiBellBold } from "react-icons/pi";
export default function Profile() {
  const [editProfile, setEditProfile] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});


  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData(parsedUser);
    }
  }, []);
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

  const handleNotification = () => {
    console.log("notiification clicked!!!")
    navigate("/notification")
  }


  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (API call)
  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://hardware-hive-backend.vercel.app/api/users/update/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);

        setIsEditing(false); // Exit edit mode
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}

      <header className="bg-white top-0 z-50 shadow-sm">
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

              <button aria-label="Notifications" className="cursor-pointer" onClick={() => handleNotification()}><PiBellBold size={22} strokeWidth={0.5} /></button>
              <button aria-label="User" onClick={() => setShowProfile(!showProfile)}>
                <FaRegUser size={22} strokeWidth={0.5} className="cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-[#013E70] text-[#000000] py-2 ">
        <div className="w-full mx-auto flex flex-row justify-center items-center gap-4">




          <nav className="w-full flex flex-nowrap justify-start sm:justify-center gap-2 relative scroll-width-none overflow-x-scroll sm:overflow-visible whitespace-nowrap px-4">
            <h1 className="text-white font-bold text-lg">My Account</h1>
          </nav>

          <div className="text-white font-semibold text-[16px] whitespace-nowrap hidden sm:flex justify-center items-center sm:gap-1 absolute right-5">
            <RiCustomerService2Fill size={20} />
            <span className="font-bold">+91 9804611111</span>
          </div>
        </div>
      </div>

      <div className="flex sm:flex-row flex-col-reverse sm:px-20 sm:p-0 sm:bg-gray-100 ">
        {/* Sidebar */}
        <div className=" sm:flex flex-col items-start sm:w-1/3 sm:max-w-sm text-white px-6 space-y-6 py-4 ">

          <div className="relative w-full bg-[#013E70] p-6 py-8 rounded-xl">
            <button onClick={() => setEditProfile(true)} className="text-white cursor-pointer flex items-center gap-1 text-sm absolute top-4 right-4 ">
              Edit <Pencil size={14} />
            </button>

              <div className="text-3xl font-bold text-yellow-400 mx-4">{user?.companyName}</div>
            <div className="space-y-2 px-4">
              <hr  className="my-1 border-1"/>
              <div>
                <div className="font-semibold text-lg">Email Id</div>
                <div className="text-sm  text-gray-200">{user?.email}</div>
              </div>
                <hr  className="my-1 border-1"/>
              <div>
                <div className=" font-semibold text-lg">Address</div>
                <div className="text-sm  text-gray-200">{user?.address}</div>
              </div>
                <hr  className="mt-1 border-1"/>
            </div>
            <div className="text-sm bg-[#013E70]  rounded-xl p-4 ">
              {[
                { label: "Contact No", value: user?.mobile },
                { label: "WhatsApp No", value: user?.whatsapp },
                { label: "City", value: user?.city },
                { label: "District", value: user?.district },
                { label: "State", value: user?.state },
                { label: "Pincode", value: user?.pincode },
                { label: "GST Number", value: user?.gstNumber },
              ].map((item, index) => (
                <div key={index} className="flex mb-1">
                  <div className="w-30  ">{item.label}:</div>
                  <div>{item.value || "-"}</div>
                </div>
              ))}
            </div>
          </div>

         
        </div>

        {/* Right Panel */}
        {
          editProfile ? (
            <UserProfileUpdate data={{ setEditProfile, editProfile, user }} />
          ) : (
            <div className="hidden sm:flex flex-col justify-center items-center ml-65 h-[300px] text-3xl font-bold text-gray-600 space-y-4">
              <div>
                Thanks For Choosing
              </div>
              <div>

                SS POWER TOOL
              </div>
            </div>
          )
        }


      </div>

      {/* Footer */}
      <Footer />
    </div >
  );
}
