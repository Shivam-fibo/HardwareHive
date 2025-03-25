import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from 'react-hot-toast'
const Hero = () => {

  const navigate = useNavigate()
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });

  const [showPopup, setShowPopup] = useState(false);
  const handelRegister  = () =>{
    navigate("/register")
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    try {
      const response = await fetch("http://localhost:5000/api/login/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginFormData),
      });
  
      const result = await response.json();
      if (response.ok) {
        toast.success("Login successful!");
        navigate("/home");
      } else {
        toast.error(result.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };
  

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };
  

  return (
    <div className="bg-[#013E70] text-white flex flex-col items-center justify-center p-6">
      <div
        className="relative text-center mt-16 h-screen w-full flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/noise.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

<div className="absolute top-36 left-8 w-44 h-44 bg-[#014F7A] rounded-full opacity-60 hidden md:block" style={{ transform: "perspective(500px) rotateX(-130deg)" }}></div>
        <div className="absolute top-36 right-8 w-44 h-44 bg-[#014F7A] rounded-full opacity-60 hidden md:block" style={{ transform: "perspective(500px) rotateX(-130deg)" }}></div>
        <div className="absolute bottom-8 left-8 w-44 h-44 bg-[#014F7A] rounded-full opacity-60 hidden md:block" style={{ transform: "perspective(500px) rotateX(-130deg)" }}></div>
        <div className="absolute bottom-8 right-8 w-44 h-44 bg-[#014F7A] rounded-full opacity-60 hidden md:block" style={{ transform: "perspective(500px) rotateX(-130deg)" }}></div>


        {/* Plate-Like Positioned Images (Hidden on Mobile) */}
        <img src="/images/bearing.png" alt="Bearing" className="absolute top-40 left-10 w-40 hidden md:block" />
        <img src="/images/coupling.png" alt="Coupling" className="absolute top-40 right-10 w-40 hidden md:block" style={{ transform: "perspective(500px) rotateX(25deg)" }} />
        <img src="/images/motor.png" alt="Motor" className="absolute bottom-10 left-10 w-40 hidden md:block" style={{ transform: "perspective(500px) rotateX(25deg)" }} />
        <img src="/images/armature.png" alt="Armature" className="absolute bottom-10 right-10 w-40 hidden md:block" style={{ transform: "perspective(500px) rotateX(25deg)" }} />

        {/* Text Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold uppercase">Multi-Brand Power Tools</h2>
          <h1 className="text-3xl mt-2">SPARE PARTS B2B PORTAL</h1>
          <p className="text-lg mt-2">Need help with register, login, and purchasing?</p>
          <p className="text-lg font-bold mt-2">Contact Us +91 9804611111</p>

          <button 
            onClick={() => setShowPopup(true)}
          className="mt-6 bg-white text-black px-6 py-2">Login with Single Key</button>

          <p className="mt-4 text-sm italic">
            <a onClick={handelRegister} className="text-blue-300 underline">
              Don’t have a single key ID yet? Click here to register
            </a>
          </p>
        </div>
      </div>
       {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent">
        <div className="relative bg-white p-6 rounded-lg w-96 shadow-2xl border border-gray-300">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-600 text-xl hover:text-gray-800"
            onClick={() => setShowPopup(false)}
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
                onClick={() => { setShowLoginModal(false); setShowForgotPasswordModal(true); }}
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
    </div>
  );
};

export default Hero;
