import { useEffect, useState } from "react";
import {
  User,
  Edit,
  Save,
  X,
  Mail,
  Building,
  Phone,
  MessageSquare,
  MapPin,
  CreditCard,
  Pencil
} from "lucide-react";
import { IoSettingsSharp } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { RiCustomerService2Fill } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Header from "./Nabar";
import Footer from "../LandingPage/Module/Footer";
import UserProfileUpdate from "./UserProfileUpdate";

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


  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (API call)
  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://hardware-hive.vercel.app/api/users/update/${user._id}`,
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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="h-12">
        <header
          className="w-full h-full flex justify-between items-center p-2 bg-white "
        >
          <button onClick={() => navigate("/home")} className="cursor-pointer">
            <img
              src="/logo/ss_power_tool_logo.svg"
              width={"150px"}
              className="sm:ml-6"
              alt="SS Power Tools Logo"
            />
          </button>


          <div className="flex gap-1 text-nowrap font-semibold text-[14px] text-right sm:mr-6">
            <button aria-label="User" onClick={() => setShowProfile(!showProfile)}><FaRegUser size={20} strokeWidth={0.5} className=" cursor-pointer" /></button>
          </div>

          {showProfile && (
            <div className="absolute border-gray-500 w-32 top-10 sm:top-11 right-4 sm:right-8 bg-white text-black shadow-lg rounded-lg z-50 overflow-hidden text-sm font-medium">
              <p onClick={() => navigate("/user")} className="cursor-pointer hover:bg-gray-300 flex items-center gap-2 px-4 p-1.5 text-nowrap">
                <FaRegUser size={12} strokeWidth={0.5} className=" cursor-pointer" />
                My Account</p>

              <p onClick={() => navigate("/")} className="cursor-pointer hover:bg-gray-300 flex items-center gap-2 px-4 p-1.5">
                <IoLogOutOutline size={14} strokeWidth={0.5} className=" cursor-pointer" />
                Logout</p>
            </div>
          )}

        </header>
      </div>

      <div className="bg-[#013E70] text-[#000000] py-2 flex">
        <div className="w-full hidden sm:flex flex-nowrap justify-start sm:justify-center">
          <p className="text-yellow-400 font-semibold ml-6">Welcome, User</p>
        </div>

        <div className="text-white  sm:hidden w-full flex flex-nowrap justify-end sm:justify-center mr-4">
          <RiCustomerService2Fill size={22} />
          <span className="font-bold">+91 9804611111</span>
        </div>
        <div className="hidden text-white font-semibold text-[12px] sm:text-base whitespace-nowrap sm:flex sm:gap-1 absolute right-5 ">
          <RiCustomerService2Fill size={22} />
          <span className="font-bold">+91 9804611111</span>
        </div>
      </div >

      <div className="flex sm:flex-row flex-col-reverse sm:px-20 sm:p-12">
        {/* Sidebar */}
        <div className=" sm:flex flex-col items-start sm:w-1/3 sm:max-w-sm text-white px-6 space-y-6 py-6 sm:py-0">
          <div className="relative w-full bg-[#013E70] p-6 py-10 rounded-xl">
            <button onClick={() => setEditProfile(!editProfile)} className="text-white cursor-pointer flex items-center gap-1 text-sm absolute top-4 right-4 ">
              Edit <Pencil size={14} />
            </button>

            <div className="text-sm font-semibold ">Customer ID: {user?._id}</div>
            <div className="text-2xl font-bold">{user?.name}</div>
            <div className="text-sm">{user?.companyName}</div>

            <div className=" text-sm space-y-1">
              <div>Contact No: {user?.mobile}</div>
              <div>WhatsApp No: {user?.whatsapp}</div>
              <div>Email ID: {user?.email}</div>
              <div>Address: {user?.address}</div>
              <div>City:  {user?.city}</div>
              <div>District:  {user?.district}</div>
              <div>State: {user?.state}</div>
              <div>Pincode: {user?.pincode}</div>
              <div>GST Number: {user?.gstNumber}</div>
            </div>
          </div>

          <div className="relative space-y-2  w-full bg-[#013E70] p-6 rounded-xl">
            <h2 className="text-lg font-semibold flex gap-2 items-center"> <FaRegUser size={18} strokeWidth={0.5} />My Account</h2>
            <ul className="space-y-1 text-sm ml-7">
              <li className="hover:underline cursor-pointer">All Notification</li>
              <li className="hover:underline cursor-pointer">My Orders</li>
              <li className="hover:underline cursor-pointer">My Wishlist</li>
            </ul>
          </div>
        </div>

        {/* Right Panel */}
        {
          editProfile && <UserProfileUpdate data={{ setEditProfile, editProfile }} />
        }

      </div>

      {/* Footer */}
      <Footer />
    </div >
  );
}
