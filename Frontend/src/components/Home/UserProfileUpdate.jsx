import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserProfileUpdate = ({ data }) => {
  const { setEditProfile, editProfile, user } = data;
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    companyName: user?.companyName || "",
    mobile: user?.mobile || "",
    whatsapp: user?.whatsapp || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    district: user?.district || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
    gstNumber: user?.gstNumber || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser._id;

  const updatedFields = {};
  for (const key in formData) {
    if (formData[key] !== user[key]) {
      updatedFields[key] = formData[key];
    }
  }

  if (Object.keys(updatedFields).length === 0) {
    toast.error("No changes detected.");
    return;
  }

  try {
    const res = await fetch("https://hardware-hive-backend.vercel.app/api/profile/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        oldData: user,
        newData: updatedFields,
      }),
    });

    if (res.ok) {
      toast.success("Update request submitted. Awaiting admin approval.");
      setEditProfile(false);
      setTimeout(() => {
        navigate("/")
      }, 1000);
    } else {
      alert("Failed to submit update request.");
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert("An error occurred while submitting the request.");
  }
};


  return (
    <div className="flex-1 p-6 bg-white rounded-xl">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <button
          onClick={() => setEditProfile(!editProfile)}
          className="text-[#013E70] cursor-pointer flex items-center gap-1 text-sm"
        >
          <RxCross2 size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-2 gap-4 text-sm">
        {/* Full Name */}
        <div className="col-span-2">
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
           
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Company Name */}
        <div className="col-span-2">
          <label className="block mb-1 font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
         
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Mobile */}
        <div className="col-span-2">
          <label className="block mb-1 font-medium">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
           
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* WhatsApp */}
        <div className="col-span-2">
          <label className="block mb-1 font-medium">WhatsApp Number</label>
          <input
            type="tel"
            name="whatsapp"
           
            value={formData.whatsapp}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Email */}
        <div className="col-span-2">
          <label className="block mb-1 font-medium">Email Address</label>
          <input
            type="email"
            name="email"
           
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Address Section */}
        <div className="col-span-2">
          <label className="block mb-1 font-medium">Full Address</label>
          <input
            type="text"
            name="address"

            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* City and District in one row */}
        <div className="col-span-1">
          <label className="block mb-1 font-medium">City</label>
          <input
            type="text"
            name="city"

            value={formData.city}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="col-span-1">
          <label className="block mb-1 font-medium">District</label>
          <input
            type="text"
            name="district"
           
            value={formData.district}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* State and Pin Code in next row */}
        <div className="col-span-1">
          <label className="block mb-1 font-medium">State</label>
          <input
            type="text"
            name="state"

            value={formData.state}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="col-span-1">
          <label className="block mb-1 font-medium">Pin Code</label>
          <input
            type="text"
            name="pincode"

            value={formData.pincode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="col-span-2">
          <label className="block mb-1 font-medium">GST Number</label>
          <input
            type="text"
            name="gstNumber"
          
            value={formData.gstNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>


        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileUpdate;
