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
} from "lucide-react";


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
      const response = await fetch(
        `https://hardware-hive.vercel.app/api/user/update/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

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
  const handleCancel = () =>{
    setIsEditing(false);
  }

  return (
    <> 

<div className="bg-white rounded-lg shadow-lg p-4 mx-auto">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h2 className="text-xl font-bold flex items-center text-gray-800">
          <User className="mr-2 text-blue-600" size={20} />
          User Profile
        </h2>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)} 
            className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
          >
            <Edit size={14} className="mr-1" />
            Edit
          </button>
        ) : (
          <div className="flex space-x-2">
            <button 
              onClick={handleSave} 
              className="flex items-center bg-green-600 text-white px-3 py-1 rounded-md text-sm"
            >
              <Save size={14} className="mr-1" />
              Save
            </button>
            <button 
              onClick={handleCancel} 
              className="flex items-center bg-gray-600 text-white px-3 py-1 rounded-md text-sm"
            >
              <X size={14} className="mr-1" />
              Cancel
            </button>
          </div>
        )}
      </div>

      {user ? (
        <div className="mt-3">
          {isEditing ? (
            <div className="space-y-3">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full text-sm"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full text-sm"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full text-sm"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full text-sm"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">WhatsApp</label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full text-sm"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full text-sm"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">District</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full text-sm"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">GST Number</label>
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full text-sm"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-semibold text-md text-blue-800 mb-2 border-b border-blue-200 pb-1">Personal Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="text-blue-600 mr-2 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-xs text-gray-600">Name</p>
                      <p className="font-medium text-sm">{user.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="text-blue-600 mr-2 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="font-medium text-sm">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Building className="text-blue-600 mr-2 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-xs text-gray-600">Company</p>
                      <p className="font-medium text-sm">{user.companyName}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg">
                <h3 className="font-semibold text-md text-green-800 mb-2 border-b border-green-200 pb-1">Contact Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="text-green-600 mr-2 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-xs text-gray-600">Mobile</p>
                      <p className="font-medium text-sm">{user.mobile}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MessageSquare className="text-green-600 mr-2 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-xs text-gray-600">WhatsApp</p>
                      <p className="font-medium text-sm">{user.whatsapp}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-lg">
                <h3 className="font-semibold text-md text-purple-800 mb-2 border-b border-purple-200 pb-1">Address</h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPin className="text-purple-600 mr-2 flex-shrink-0 mt-1" size={16} />
                    <div>
                      <p className="text-xs text-gray-600">Full Address</p>
                      <p className="font-medium text-sm">
                        {user.address}, {user.city}, {user.district}, {user.state} - {user.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h3 className="font-semibold text-md text-yellow-800 mb-2 border-b border-yellow-200 pb-1">Business Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CreditCard className="text-yellow-600 mr-2 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-xs text-gray-600">GST Number</p>
                      <p className="font-medium text-sm">{user.gstNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6">
          <User className="mx-auto text-gray-300" size={48} />
          <p className="mt-3 text-gray-500 text-sm">No user logged in</p>
          <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
            Sign In
          </button>
        </div>
      )}
    </div>
    </>
  );
}
