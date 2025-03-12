import React, { useState, useEffect } from "react";
import Footer from "../Home/Footer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const [bgImage, setBgImage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
  const [registrationFormData, setRegistrationFormData] = useState({
    name: "", companyName: "", mobile: "", whatsapp: "", email: "",
    city: "", district: "", state: "", pincode: "", gstType: "non-gst", gstNumber: ""
  });
  const [visitingCard, setVisitingCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateBackground = () => {
      setBgImage(window.innerWidth < 768 ? "/images/background3.jpg" : "/images/background2.jpg");
    };
    updateBackground();
    window.addEventListener("resize", updateBackground);
    return () => window.removeEventListener("resize", updateBackground);
  }, []);

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://hardware-hive.vercel.app/api/login/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginFormData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Login successful!");
        setShowLoginModal(false); // Close modal on success
      } else {
        toast.error(result.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  // Registration form handlers
  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationFormData({ ...registrationFormData, [name]: value });
  };

  const handleFileChange = (e) => {
    setVisitingCard(e.target.files[0]);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(registrationFormData).forEach((key) => {
        formData.append(key, registrationFormData[key]);
      });
      if (visitingCard) {
        formData.append("visitingCard", visitingCard);
      }

      const response = await fetch("https://hardware-hive.vercel.app/api/user/register", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Registration submitted! Admin will review it.");
        setShowRegisterModal(false); // Close modal on success
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to submit registration");
    }
  };

  return (
    <div
      className="h-[934px] bg-gray-800"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        minHeight: "100vh",
      }}
    >
      <nav className="flex justify-between items-center text-xl sm:text-3xl font-bold text-white p-4">
        <div className="sm:text-yellow-200 text-yellow-100">SS POWER TOOL</div>
        <div className="flex items-center">
          <button
            className="flex flex-col items-center bg-zinc-700 hover:bg-zinc-600 border-1 sm:border-2 sm:text-yellow-200 text-yellow-100 py-1 px-2 sm:px-2 rounded-lg text-sm sm:text-xl font-bold cursor-pointer"
            onClick={() => navigate("/allProductShow")}
          >
            PRODUCT
          </button>
        </div>
      </nav>

      <div className="sm:text-yellow-200 text-yellow-100 h-[816px]">
        <div className="text-center py-20 mt-10 px-4 bg-center">
          <h1 className="text-xl sm:text-3xl font-bold">MULTI-BRAND POWER TOOLS</h1>
          <h2 className="text-base sm:text-2xl font-bold">SPARE PARTS B2B PORTAL</h2>
          <h3 className="text-sm sm:text-xl font-semibold">
            <p>NEED HELP WITH REGISTER, LOGIN, AND PURCHASING?</p>
            <p>CONTACT US +91 9804611111</p>
          </h3>

          <div className="flex flex-col items-center gap-6 mt-12">
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg font-bold"
              onClick={() => setShowLoginModal(true)}
            >
              LOGIN
            </button>
            <button
              className="bg-red-600 text-white py-2 px-6 rounded-lg text-lg font-bold"
              onClick={() => setShowRegisterModal(true)}
            >
              REGISTER
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center ">
        <div className="relative bg-gray-700 p-6 rounded-lg w-96 shadow-2xl">
            {/* Close Button - Moved to top right */}
            <button
              className="absolute top-2 right-2 text-white text-xl hover:text-gray-300"
              onClick={() => setShowLoginModal(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4 text-white text-center">LOGIN</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border bg-gray-600 text-white"

                onChange={handleLoginInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border bg-gray-600 text-white"

                onChange={handleLoginInputChange}
                required
              />
              <div className="text-left">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-blue-400 text-sm"
                >
                  Forgot Password?
                </button>
              </div>
              <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded">
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="relative bg-gray-700 bg-opacity-90 p-6 rounded-lg w-96 shadow-2xl my-8 overflow-y-auto"
               style={{ maxHeight: "90vh", scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {/* Hide scrollbar for Chrome, Safari, and Opera */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white text-xl hover:text-gray-300"
              onClick={() => setShowRegisterModal(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4 text-white text-center">REGISTER</h2>
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <input 
                type="text" 
                name="name" 
                placeholder="Full Name" 
                className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white rounded" 
                onChange={handleRegisterInputChange} 
                required 
              />
              <input 
                type="text" 
                name="companyName" 
                placeholder="Company Name*" 
                className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white rounded" 
                onChange={handleRegisterInputChange} 
                required 
              />
              <input 
                type="tel" 
                name="mobile" 
                placeholder="Mobile Number*" 
                className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white rounded" 
                onChange={handleRegisterInputChange} 
                required 
              />
              <input 
                type="tel" 
                name="whatsapp" 
                placeholder="WhatsApp Number*" 
                className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white rounded" 
                onChange={handleRegisterInputChange} 
                required 
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email*" 
                className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white rounded" 
                onChange={handleRegisterInputChange} 
                required 
              />
              <input 
                type="text" 
                name="city" 
                placeholder="City*" 
                className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white rounded" 
                onChange={handleRegisterInputChange} 
                required 
              />
              <input 
                type="text" 
                name="district" 
                placeholder="District*" 
                className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white rounded" 
                onChange={handleRegisterInputChange} 
                required 
              />
              <input 
                type="text" 
                name="pincode" 
                placeholder="Pincode*" 
                className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white rounded" 
                onChange={handleRegisterInputChange} 
                required 
              />
              <input 
                type="text" 
                name="state" 
                placeholder="State*" 
                className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white rounded" 
                onChange={handleRegisterInputChange} 
                required 
              />

              <label className="block text-white">Visiting Card</label>
              <input 
                type="file" 
                name="visitingCard" 
                className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white rounded" 
                onChange={handleFileChange} 
                accept="image/*" 
              />

              <p className="text-white">GST Type:</p>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="gstType" 
                    value="gst" 
                    checked={registrationFormData.gstType === "gst"} 
                    onChange={handleRegisterInputChange} 
                    className="mr-2" 
                  /> 
                  GST
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="gstType" 
                    value="non-gst" 
                    checked={registrationFormData.gstType === "non-gst"} 
                    onChange={handleRegisterInputChange} 
                    className="mr-2" 
                  /> 
                  Non-GST
                </label>
              </div>

              {registrationFormData.gstType === "gst" && (
                <input 
                  type="text" 
                  name="gstNumber" 
                  placeholder="Enter GST Number" 
                  className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white rounded" 
                  onChange={handleRegisterInputChange} 
                  required 
                />
              )}

              <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer mt="0px" />
    </div>
  );
};

export default Home;