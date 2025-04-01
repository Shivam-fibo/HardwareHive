import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:5000/api/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setUpdatedUser(data);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, [userId]);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/update/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        setUser(updatedUser);
        setIsEditing(false);
      } else {
        alert("Error updating profile");
      }
    } catch (error) {
      alert("Update failed");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      
      {/* User Info Display */}
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        {Object.entries(user).map(([key, value]) =>
          key !== "_id" && key !== "password" && key !== "__v" ? (
            <p key={key} className="mb-2">
              <strong>{key.toUpperCase()}:</strong> {value}
            </p>
          ) : null
        )}
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Popup */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button className="absolute top-2 right-2 text-gray-600" onClick={() => setIsEditing(false)}>✖</button>
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            
            {Object.keys(updatedUser).map(
              (key) =>
                key !== "_id" && key !== "password" && key !== "__v" && (
                  <input
                    key={key}
                    className="w-full p-2 border mb-2"
                    name={key}
                    value={updatedUser[key]}
                    onChange={handleChange}
                    placeholder={key.replace(/([A-Z])/g, " $1").toUpperCase()}
                  />
                )
            )}
            <button
              className="bg-green-500 text-white px-4 py-2 mt-4"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
// 


















// import { useEffect, useState } from "react";

// export default function Profile() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold">User Profile</h2>
//       {user ? (
//         <div className="mt-4">
//           <p><strong>Name:</strong> {user.name}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Company:</strong> {user.companyName}</p>
//           <p><strong>Mobile:</strong> {user.mobile}</p>
//           <p><strong>Address:</strong> {user.address}, {user.city}, {user.state}</p>
//         </div>
//       ) : (
//         <p>No user logged in</p>
//       )}
//     </div>
//   );
// }
