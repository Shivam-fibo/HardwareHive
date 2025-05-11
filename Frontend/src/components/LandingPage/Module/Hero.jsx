import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

const Hero = () => {
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPopup, setShowForgotPopup] = useState(false);
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [changePasswordData, setChangePasswordData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const [showChangeOldPassword, setShowChangeOldPassword] = useState(false);
  const [showChangeNewPassword, setShowChangeNewPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handelRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (showPopup) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showPopup]);

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
        sessionStorage.setItem("user", JSON.stringify(result.user));
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

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://hardware-hive.vercel.app/api/login/user/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Reset email sent successfully!");
      } else {
        toast.error(result.message || "Invalid email");
      }
    } catch (error) {
      toast.error("Password reset failed");
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://hardware-hive.vercel.app/api/login/user/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changePasswordData),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Password changed successfully!");
        setShowChangePasswordPopup(false);
      } else {
        toast.error(result.message || "Failed to change password");
      }
    } catch (error) {
      toast.error("Change password failed");
    }
  };

  const handleChangePasswordInput = (e) => {
    const { name, value } = e.target;
    setChangePasswordData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-[#013E70] text-white h-120 flex flex-col items-center justify-center border-b-4  border-[#D8D9D8]">
      <div
        className="relative text-center w-full flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/noise.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center">
          <h2 className="text-4xl mt-4 font-bold uppercase">Multi-Brand Power Tools</h2>
          <h1 className="text-lg mt-2 text-[#72B6EC]">SPARE PARTS B2B PORTAL</h1>
          <p className="text-lg mt-2 text-[#72B6EC]">Need help with register, login, and purchasing?</p>
          <p className="text-lg font-semibold mt-2 text-[#72B6EC]">Contact Us +91 9804611111</p>
          <button
            onClick={() => setShowPopup(true)}
            className="mt-6 bg-white rounded-xl w-34 text-lg cursor-pointer text-[#013E70] font-bold h-10"
          >
            Login
          </button>
          <p className="mt-4 text-lg cursor-pointer italic">
            <a onClick={handelRegister} className="text-blue-300 underline">
              Click here to register
            </a>
          </p>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent p-4 z-10">
          <div className="relative bg-white p-8 rounded-xl w-full max-w-md shadow-lg border border-gray-200 text-gray-900">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1"
              onClick={() => setShowPopup(false)}
              aria-label="Close login modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-lg font-semibold mb-6 text-center text-gray-800">Login</h2>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-700"
                onChange={handleLoginInputChange}
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 pr-12 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-700"
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

              <div className="flex justify-between text-sm mt-2">
                <div
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setShowForgotPopup(true)}
                >
                  Forgot Password?
                </div>
                <div
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setShowChangePasswordPopup(true)}
                >
                  Change Password
                </div>
              </div>


              <button
                type="submit"
                className="bg-[#013E70] text-white w-full p-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:bg-[#013E70]"
              >
                Login
              </button>
            </form>

            {/* Forgot Password Popup */}
            {showForgotPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-transparent z-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">
                  <h3 className="text-lg font-semibold text-center">Reset Password</h3>
                  <form onSubmit={handleForgotSubmit} className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                    <button type="submit" className="bg-[#013E70] text-white w-full p-3 rounded-lg font-semibold">
                      Send Reset Link
                    </button>
                    <p className="text-center text-sm text-gray-500 cursor-pointer" onClick={() => setShowForgotPopup(false)}>Cancel</p>
                  </form>
                </div>
              </div>
            )}

            {/* Change Password Popup */}
            {showChangePasswordPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-transparent z-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">
                  <h3 className="text-lg font-semibold text-center">Change Password</h3>
                  <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                      value={changePasswordData.email}
                      onChange={handleChangePasswordInput}
                      required
                    />
                    <div className="relative">
                      <input
                        type={showChangeOldPassword ? "text" : "password"}
                        name="oldPassword"
                        placeholder="Enter old password"
                        className="w-full p-3 pr-12 border border-gray-300 rounded-lg text-gray-800"
                        value={changePasswordData.oldPassword}
                        onChange={handleChangePasswordInput}
                        required
                      />
                      <button type="button" onClick={() => setShowChangeOldPassword((prev) => !prev)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        {showChangeOldPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type={showChangeNewPassword ? "text" : "password"}
                        name="newPassword"
                        placeholder="Enter new password"
                        className="w-full p-3 pr-12 border border-gray-300 rounded-lg text-gray-800"
                        value={changePasswordData.newPassword}
                        onChange={handleChangePasswordInput}
                        required
                      />
                      <button type="button" onClick={() => setShowChangeNewPassword((prev) => !prev)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        {showChangeNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                      </button>
                    </div>

                    <button type="submit" className="bg-green-600 text-white w-full p-3 rounded-lg font-semibold">
                      Change Password
                    </button>
                    <p className="text-center text-sm text-gray-500 cursor-pointer" onClick={() => setShowChangePasswordPopup(false)}>Cancel</p>
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
