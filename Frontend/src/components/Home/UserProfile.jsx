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
    <div className="min-h-screen sm:bg-gray-100 bg-white">
      {/* Header */}
      
      <div className="h-12">
        <header
          className="w-full h-full flex justify-between items-center p-2 ">
          <img
            src="/logo/ss_power_tool_logo.svg"
            width={"150px"}
            className="sm:ml-6 cursor-pointer"
            alt="SS Power Tools Logo"
            onClick={() => navigate("/home")}
          />
          <div className="flex gap-1 text-nowrap font-semibold text-[14px] text-right sm:mr-6">
            <img src="icons/customer-service.svg" alt="" /><p> +91 9804611111</p>
          </div>
        </header>
      </div>


      {/* Page Title */}
      <h1 className="text-center bg-[#013E70] text-white py-1.5 text-2xl font-bold">
        Welcome, {user?.name || "User"}
      </h1>

      <div className="flex sm:flex-row flex-col-reverse sm:px-20 sm:p-12 ">
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
