import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa"; // Import edit icon

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData(parsedUser);
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (API call)
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/update/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold flex items-center">
        User Profile
        <FaEdit 
          className="ml-2 text-blue-500 cursor-pointer" 
          onClick={() => setIsEditing(!isEditing)} 
        />
      </h2>

      {user ? (
  <div className="mt-4 space-y-2">
    {isEditing ? (
      <>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="city" value={formData.city} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="district" value={formData.district} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="state" value={formData.state} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className="border p-2 w-full" />

        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
      </>
    ) : (
      <>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Company:</strong> {user.companyName}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>WhatsApp:</strong> {user.whatsapp}</p>
        <p><strong>Address:</strong> {user.address}, {user.city}, {user.state}</p>
        <p><strong>District:</strong> {user.district}</p>
        <p><strong>Pincode:</strong> {user.pincode}</p>
        <p><strong>GST Number:</strong> {user.gstNumber}</p>
      </>
    )}
  </div>
) : (
  <p>No user logged in</p>
)}

    </div>
  );
}
