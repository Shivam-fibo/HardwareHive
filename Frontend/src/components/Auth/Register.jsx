import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [registrationFormData, setRegistrationFormData] = useState({
    name: "", companyName: "", mobile: "", email: "", city: "", district: "", state: ""
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationFormData({ ...registrationFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationFormData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Registration submitted! Admin will review it.");
        navigate("/home");
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to submit registration");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-blue-400 text-black p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" placeholder="Name" className="w-full p-2 border rounded" onChange={handleInputChange} required />
          <input type="text" name="companyName" placeholder="Company Name*" className="w-full p-2 border rounded" onChange={handleInputChange} required />
          <input type="tel" name="mobile" placeholder="Mobile Number*" className="w-full p-2 border rounded" onChange={handleInputChange} required />
          <input type="email" name="email" placeholder="Email*" className="w-full p-2 border rounded" onChange={handleInputChange} required />
          <input type="text" name="city" placeholder="City*" className="w-full p-2 border rounded" onChange={handleInputChange} required />
          <input type="text" name="district" placeholder="District*" className="w-full p-2 border rounded" onChange={handleInputChange} required />
          <input type="text" name="state" placeholder="State*" className="w-full p-2 border rounded" onChange={handleInputChange} required />
          <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded">Submit</button>
          <button type="button" onClick={() => navigate(-1)} className="bg-gray-500 text-white w-full p-2 rounded mt-2">
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
