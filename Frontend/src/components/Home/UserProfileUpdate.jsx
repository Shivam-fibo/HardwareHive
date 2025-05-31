import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const UserProfileUpdate = ({ data }) => {
  const { setEditProfile, editProfile, user } = data;

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
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const userId = storedUser._id;

    const updatedFields = {};
    for (const key in formData) {
      if (formData[key] !== user[key]) {
        updatedFields[key] = formData[key];
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      alert("No changes detected.");
      return;
    }

    try {
      const res = await fetch(`https://hardware-hive.vercel.app/api/user/update/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (res.ok) {
        alert("Profile updated successfully.");
        setEditProfile(false);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating.");
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
            placeholder="Full Name"
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
            placeholder="Enter Company Name"
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
            placeholder="Enter Your Mobile Number"
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
            placeholder="Enter Your WhatsApp Number"
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
            placeholder="Enter Your Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Address Section */}
        <div className="col-span-2">
          <label className="block mb-1 font-medium">Address</label>
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-4">
          <input
            type="text"
            name="address"
            placeholder="Enter Your Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City Name"
            value={formData.city}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="district"
            placeholder="District Name"
            value={formData.district}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pin Code"
            value={formData.pincode}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <div className="col-span-2">
            <input
              type="text"
              name="gstNumber"
              placeholder="GST Number*"
              value={formData.gstNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
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
