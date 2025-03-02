import React, { useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [registrationFormData, setRegistrationFormData] = useState({
    name: "",
    companyName: "",
    mobile: "",
    email: "",
    city: "",
    district: "",
    state: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationFormData({ ...registrationFormData, [name]: value });
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationFormData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Registration submitted! Admin will review it.");
        setIsRegistrationModalOpen(false);
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to submit registration");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        setIsLoginModalOpen(false);
      } else {
        toast.error(result.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  const images = Array.from({ length: 15 }, (_, i) => `/images/img${i + 1}.jpg`);

  return (
    <div className="bg-blue-900 text-white">
      {/* Navbar */}
      <nav className="bg-white text-red-600 font-bold text-xl p-4">
        SS POWER TOOL
      </nav>

      {/* Main Section with Background Image */}
      <div className="relative text-center py-20 px-4 bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/1500x500')" }}>
        <h1 className="text-3xl font-bold">MULTI-BRAND POWER TOOLS</h1>
        <h2 className="text-2xl font-bold">SPARE PARTS B2B PORTAL</h2>

        <div className="flex flex-col items-center gap-4 mt-6">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg font-bold" onClick={() => setIsLoginModalOpen(true)}>
            LOGIN
          </button>
          <button className="bg-red-600 text-white py-2 px-6 rounded-lg text-lg font-bold" onClick={() => setIsRegistrationModalOpen(true)}>
            REGISTER
          </button>
        </div>
      </div>

      {/* Hero Section with Images */}
      <div className="py-8 px-6 text-center bg-blue-800">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {images.map((src, index) => (
            <img key={index} src={src} alt={`Product ${index + 1}`} className="w-24 h-24 object-cover mx-auto" />
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {isRegistrationModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-800 bg-opacity-50">
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
              <button type="button" onClick={() => setIsRegistrationModalOpen(false)} className="bg-gray-500 text-white w-full p-2 rounded mt-2">Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-800 bg-opacity-50">
          <div className="bg-blue-400 text-black p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleLoginInputChange} required />
              <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded" onChange={handleLoginInputChange} required />
              <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded">Login</button>
              <button type="button" onClick={() => setIsLoginModalOpen(false)} className="bg-gray-500 text-white w-full p-2 rounded mt-2">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
