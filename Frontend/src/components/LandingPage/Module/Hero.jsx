import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
const Hero = () => {
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPopup, setShowForgotPopup] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const handelRegister = () => {
    navigate("/register");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch(
        "https://hardware-hive-backend.vercel.app/api/login/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginFormData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Login successful!");
        localStorage.setItem("user", JSON.stringify(result.user));
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

  const handleForgotSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://hardware-hive-backend.vercel.app/api/login/user/password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: forgotEmail }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Email send successful!");
    
      } else {
        toast.error(result.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Password Reset failed");
    }
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
        <div
          className="absolute top-36 left-8 w-44 h-44 bg-[#014F7A] rounded-full opacity-60 hidden md:block"
          style={{ transform: "perspective(500px) rotateX(-130deg)" }}
        ></div>
        <div
          className="absolute top-36 right-8 w-44 h-44 bg-[#014F7A] rounded-full opacity-60 hidden md:block"
          style={{ transform: "perspective(500px) rotateX(-130deg)" }}
        ></div>
        <div
          className="absolute bottom-8 left-8 w-44 h-44 bg-[#014F7A] rounded-full opacity-60 hidden md:block"
          style={{ transform: "perspective(500px) rotateX(-130deg)" }}
        ></div>
        <div
          className="absolute bottom-8 right-8 w-44 h-44 bg-[#014F7A] rounded-full opacity-60 hidden md:block"
          style={{ transform: "perspective(500px) rotateX(-130deg)" }}
        ></div>

        {/* Plate-Like Positioned Images (Hidden on Mobile) */}
        <img
          src="/images/bearing.png"
          alt="Bearing"
          className="absolute top-40 left-10 w-40 hidden md:block"
        />
        <img
          src="/images/coupling.png"
          alt="Coupling"
          className="absolute top-40 right-10 w-40 hidden md:block"
          style={{ transform: "perspective(500px) rotateX(25deg)" }}
        />
        <img
          src="/images/motor.png"
          alt="Motor"
          className="absolute bottom-10 left-10 w-40 hidden md:block"
          style={{ transform: "perspective(500px) rotateX(25deg)" }}
        />
        <img
          src="/images/armature.png"
          alt="Armature"
          className="absolute bottom-10 right-10 w-40 hidden md:block"
          style={{ transform: "perspective(500px) rotateX(25deg)" }}
        />

        {/* Text Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold uppercase">
            Multi-Brand Power Tools
          </h2>
          <h1 className="text-3xl mt-2">SPARE PARTS B2B PORTAL</h1>
          <p className="text-lg mt-2">
            Need help with register, login, and purchasing?
          </p>
          <p className="text-lg font-bold mt-2">Contact Us +91 9804611111</p>

          <button
            onClick={() => setShowPopup(true)}
            className="mt-6 bg-white text-black px-6 py-2"
          >
            Login with Single Key
          </button>

          <p className="mt-4 text-sm italic">
            <a onClick={handelRegister} className="text-blue-300 underline">
              Don’t have a single key ID yet? Click here to register
            </a>
          </p>
        </div>
      </div>
      {showPopup &&   (
        // Overlay: Kept bg-transparent as requested
        <div className="fixed inset-0 flex items-center justify-center bg-transparent p-4 z-10">
          {/* Modal Box: Increased padding, softer shadow, potentially more rounded */}
          <div className="relative bg-white p-8 rounded-xl w-full max-w-md shadow-lg border border-gray-200 text-gray-900">
            {" "}
            {/* Changed text color default for modal */}
            {/* Close Button: Using SVG, subtle styling */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1 transition duration-150 ease-in-out"
              onClick={() => setShowPopup(false)}
              aria-label="Close login modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Modal Title: Larger, darker text, more bottom margin */}
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Login
            </h2>
            {/* Login Form: Increased spacing */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150 ease-in-out"
                onChange={handleLoginInputChange}
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 pr-12 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150 ease-in-out"
                  onChange={handleLoginInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
             <div
          className="text-blue-500 cursor-pointer text-sm"
          onClick={() => setShowForgotPopup(true)}
        >
          Forget Password?
        </div>

              <button
                type="submit"
                className="bg-blue-800 text-white w-full p-3 rounded-lg font-semibold hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Login
              </button>
            </form>
            {showForgotPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-100">
          <div className="bg-white p-18 rounded-lg shadow-lg w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold text-center">Reset Password</h3>
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150 ease-in-out"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-blue-800 text-white w-full p-3 rounded-lg font-semibold hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Send Reset Link
              </button>
              <p
                className="text-center text-sm text-gray-500 cursor-pointer"
                onClick={() => setShowForgotPopup(false)}
              >
                Cancel
              </p>
            </form>
          </div>
        </div>
       )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
