import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/registrations");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (id, userEmail, userName) => {
    console.log("Sending email to:", userEmail);
    setIsLoading(true);
  
    try {
      const randomPassword = Math.floor(100000 + Math.random() * 900000).toString();
  
      // Step 1: Send email first
      const emailResponse = await fetch("http://localhost:5000/api/admin/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, name: userName, password: randomPassword }),
      });
  
      if (!emailResponse.ok) {
        toast.error("Email sending failed. Approval aborted.");
        setIsLoading(false);
        return;
      }
  
      toast.success("Email sent successfully! Now approving the user...");
  
      // Step 2: Approve user only after successful email
      const approveResponse = await fetch(`http://localhost:5000/api/admin/registrations/${id}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, name: userName, password: randomPassword }),
      });
  
      if (approveResponse.ok) {
        toast.success("User approved successfully!");
        fetchUsers();
      } else {
        toast.error("Approval failed.");
      }
    } catch (error) {
      console.error("Error in approval process:", error);
      toast.error(`Error: ${error.message || "Failed to approve user"}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-md rounded">
        {users.length === 0 ? (
          <p className="text-center text-gray-600">No pending registrations</p>
        ) : (
          <ul className="space-y-6">
            {users.map((user) => (
              <li key={user._id} className="p-4 border rounded">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleApprove(user._id, user.email, user.name)}
                      disabled={isLoading}
                      className={`${
                        isLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                      } text-white px-4 py-2 rounded transition-colors duration-200`}
                    >
                      {isLoading ? "Processing..." : "Approve"}
                    </button>
                    <button
                      onClick={() => handleReject(user._id)}
                      disabled={isLoading}
                      className={`${
                        isLoading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
                      } text-white px-4 py-2 rounded transition-colors duration-200`}
                    >
                      Reject
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="border-t pt-2">
                    <p>
                      <span className="font-semibold">Company:</span> {user.companyName}
                    </p>
                    <p>
                      <span className="font-semibold">Mobile:</span> {user.mobile}
                    </p>
                    <p>
                      <span className="font-semibold">WhatsApp:</span> {user.whatsapp}
                    </p>
                    <p>
                      <span className="font-semibold">Registration Date:</span>{" "}
                      {new Date(user.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="border-t pt-2">
                    <p>
                      <span className="font-semibold">City:</span> {user.city}
                    </p>
                    <p>
                      <span className="font-semibold">District:</span> {user.district}
                    </p>
                    <p>
                      <span className="font-semibold">State:</span> {user.state}
                    </p>
                    <p>
                      <span className="font-semibold">Pincode:</span> {user.pincode}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-2 mt-2">
                  <p>
                    <span className="font-semibold">GST Type:</span> {user.gstType}
                  </p>
                  {user.gstType === "gst" && (
                    <p>
                      <span className="font-semibold">GST Number:</span> {user.gstNumber || "N/A"}
                    </p>
                  )}
                </div>

                {user.visitingCardUrl && (
                  <div className="mt-4">
                    <p className="font-semibold">Visiting Card:</p>
                    <img
                      src={user.visitingCardUrl}
                      alt="Visiting Card"
                      className="w-40 h-auto border rounded-lg"
                    />
                  </div>
                )}

                <div className="mt-2 pt-2 border-t">
                  <p>
                    <span className="font-semibold">Status:</span>
                    <span
                      className={user.isApproved ? "text-green-600 ml-1" : "text-yellow-600 ml-1"}
                    >
                      {user.isApproved ? "Approved" : "Pending"}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
