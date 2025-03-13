import React, { useState, useEffect } from "react";
import Footer from "../Home/Footer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const [bgImage, setBgImage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [registrationFormData, setRegistrationFormData] = useState({
    name: "",
    companyName: "",
    mobile: "",
    whatsapp: "",
    email: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    gstType: "non-gst",
    gstNumber: "",
  });
  const [visitingCard, setVisitingCard] = useState(null);
  const [isStepTwo, setIsStepTwo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateBackground = () => {
      setBgImage(
        window.innerWidth < 768
          ? "/images/background3.jpg"
          : "/images/background2.jpg"
      );
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
      const response = await fetch(
        "https://hardware-hive.vercel.app/api/login/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginFormData),
        }
      );

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



  const handleInputChange = (e) => {
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

      const response = await fetch(
        "https://hardware-hive.vercel.app/api/user/register",
        {
          method: "POST",
          body: formData,
        }
      );

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
          <h1 className="text-xl sm:text-3xl font-bold">
            MULTI-BRAND POWER TOOLS
          </h1>
          <h2 className="text-base sm:text-2xl font-bold">
            SPARE PARTS B2B PORTAL
          </h2>
          <h3 className="text-sm sm:text-xl font-semibold">
            <p>NEED HELP WITH REGISTER, LOGIN, AND PURCHASING?</p>
            <p>CONTACT US +91 9804611111</p>
          </h3>

          <div className="flex flex-col items-center gap-6 mt-12">
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg font-bold transition-transform duration-600 ease-out"
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
  <div className="fixed inset-0 flex items-center justify-center bg-transparent">
    <div className="relative bg-white p-6 rounded-lg w-96 shadow-2xl border border-gray-300">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-600 text-xl hover:text-gray-800"
        onClick={() => setShowLoginModal(false)}
      >
        ✖
      </button>

      {/* Header */}
      <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
        LOGIN
      </h2>

      {/* Form */}
      <form onSubmit={handleLoginSubmit} className="space-y-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none"
          onChange={handleLoginInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none"
          onChange={handleLoginInputChange}
          required
        />

        {/* Forgot Password */}
        <div className="text-left">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-blue-500 text-sm hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-3 rounded-lg font-semibold hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  </div>
)}


      {/* Register Modal */}
      {showRegisterModal && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black/30 
               transition-opacity duration-300 ease-out"
  >
    <div
      className="relative bg-white/90 p-6 rounded-lg w-96 shadow-lg border border-gray-300
                 backdrop-blur-lg transition-transform duration-300 ease-out scale-100"
      style={{
        maxHeight: "90vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 text-gray-600 text-xl hover:text-gray-800 
                   transition-transform duration-300 ease-out active:scale-90"
        onClick={() => {
          setShowRegisterModal(false);
          setIsStepTwo(false);
        }}
      >
        ✖
      </button>

      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
        REGISTER
      </h2>

      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        {!isStepTwo ? (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-400"
            />
             <input
              type="text"
              name="city"
              placeholder="Address"
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setIsStepTwo(true)}
              className="bg-blue-500 text-white w-full p-3 rounded-lg 
                         transition-transform duration-300 ease-out active:scale-95 shadow-md"
            >
              Next
            </button>
          </>
        ) : (
          <>
           
            <input
              type="text"
              name="district"
              placeholder="District"
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-400"
            />
            <label className="my-2">Visiting Card</label>
          <input type="file" name="visitingCard" className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-400" onChange={handleFileChange} accept="image/*" />

          <p className="text-black mt-2">GST Type:</p>
          <div className="flex space-x-4">
          <label className="flex items-center">
              <input type="radio" name="gstType" value="gst" checked={registrationFormData.gstType === "gst"} onChange={handleInputChange} className="mr-2" /> GST
            </label>
            <label className="flex items-center">
              <input type="radio" name="gstType" value="non-gst" checked={registrationFormData.gstType === "non-gst"} onChange={handleInputChange} className="mr-2" /> Non-GST
            </label>
           
          </div>

          {registrationFormData.gstType === "gst" && (
            <input type="text" name="gstNumber" placeholder="Enter GST Number" className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-400" onChange={handleInputChange} required />
          )}
            <button
              type="submit"
              className="bg-blue-500 text-white w-full p-3 rounded-lg 
                         transition-transform duration-300 ease-out active:scale-95 shadow-md"
            >
              Submit
            </button>
          </>
        )}
      </form>
      
    </div>
  </div>
)}


      <Footer mt="0px" />
    </div>
  );
};

export default Home;
