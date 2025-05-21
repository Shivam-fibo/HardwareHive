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
import { CiMenuKebab } from "react-icons/ci"; 
import { RiCustomerService2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Header from "./Nabar";

export default function Profile() {
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
      <Header />
      <div className="bg-[#013E70] text-[#000000] py-2 flex">
        <div className="w-full flex flex-nowrap justify-start sm:justify-center">
          <p className="text-yellow-400 font-semibold ml-6">Welcome, User</p>
        </div>
        <div className="text-white font-semibold text-[12px] sm:text-base whitespace-nowrap flex sm:gap-1 absolute right-5">
          <RiCustomerService2Fill size={22} />
          <span className="font-bold">+91 9804611111</span>
        </div>
      </div >

      <div className="flex sm:px-20 sm:p-12">
        {/* Sidebar */}
        <div className="hidden sm:flex flex-col items-start w-1/3 max-w-sm text-white px-6 space-y-6">
          <div className="relative w-full bg-[#013E70] p-6 rounded-xl">
            <div className="text-2xl font-bold">{user?.name}</div>
            <div className="text-sm">{user?.companyName}</div>
            <div className="text-xs">Customer ID: {user?._id}</div>
            <button className="absolute top-4 right-4 cursor-pointer">
              <Pencil size={16} />
            </button>
            <div className="mt-4 text-xs space-y-1">
              <div>Email ID: {user?.email}</div>
              <div>Contact No: {user?.mobile}</div>
              <div>WhatsApp No: {user?.whatsapp}</div>
              <div>Address: {user?.address}</div>
              <div>District:  {user?.district}</div>
              <div>Pincode: {user?.pincode}</div>
              <div>GST Number: {user?.gstNumber}</div>
            </div>
          </div>

          <div className="relative space-y-2  w-full bg-[#013E70] p-6 rounded-xl">
            <h2 className="text-lg font-semibold">Account Setting</h2>
            <ul className="space-y-1 text-sm">
              <li className="text-white hover:underline cursor-pointer">Profile Information</li>
              <li className="text-yellow-300 font-semibold">To Shipping Address</li>
            </ul>
          </div>

          <div className="relative space-y-2  w-full bg-[#013E70] p-6 rounded-xl">
            <h2 className="text-lg font-semibold">My Account</h2>
            <ul className="space-y-1 text-sm">
              <li className="hover:underline cursor-pointer">All Notification</li>
              <li className="hover:underline cursor-pointer">My Orders</li>
            </ul>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 p-6 bg-white rounded-xl">
          {/* Shipping Form */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">To Shipping Address</h2>
            <button onClick={() => setIsEditing(!isEditing)} className="text-[#013E70] cursor-pointer flex items-center gap-1 text-sm">
              Edit <Pencil size={14} />
            </button>
          </div>

          <form className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <input type="text" placeholder="Enter Company Name" className="col-span-2 border p-2 rounded" />
            <input type="text" placeholder="GST Number" className="col-span-2 border p-2 rounded" />
            <input type="text" placeholder="Enter Your Address" className="col-span-2 border p-2 rounded" />
            <input type="text" placeholder="District Name" className="border p-2 rounded" />
            <input type="text" placeholder="City Name" className="border p-2 rounded" />
            <input type="text" placeholder="Pin Code" className="border p-2 rounded" />
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 cursor-pointer text-black font-semibold px-4 py-2 rounded col-span-2 w-32">Submit</button>
          </form>

          {/* Saved Addresses */}
          <h3 className="text-md font-semibold mt-10 mb-4">Saved Address</h3>
          <div className="space-y-4">
            {[1, 2].map((_, i) => (
              <div key={i} className="border border-gray-300 rounded-md p-4 shadow-sm relative">
                <h4 className="font-semibold text-sm">S... SHOP</h4>
                <p className="text-xs text-gray-600">
                  Suresh Das 7xxxxxxxxx <br />
                  Baradfmasi lane, Nafvgdfg Sdfg District, Odifgfa - 75fg69
                </p>
                <button className="absolute cursor-pointer top-2 right-2 text-gray-400 hover:text-black">
                  <CiMenuKebab size={18}/>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
}
