import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { RiCustomerService2Fill } from "react-icons/ri";

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
      const response = await fetch("https://hardware-hive-backend.vercel.app/api/login/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginFormData),
      });
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

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://hardware-hive-backend.vercel.app/api/login/user/password", {
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
      const response = await fetch("https://hardware-hive-backend.vercel.app/api/login/user/change-password", {
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
    <div className="">
      <div className="sm:h-12">
        <div className="bg-[#013E70] text-[#000000] py-2 sm:block hidden ">
          <div className="w-full mx-auto flex flex-row justify-center items-center gap-4">
            <nav className="w-full flex flex-nowrap justify-start sm:justify-center gap-2 relative scroll-width-none overflow-x-scroll sm:overflow-visible whitespace-nowrap px-4">
              <h1 className="text-white font-semibold text-lg uppercase">Spare Parts B2B Portel</h1>
            </nav>

            <div className="text-white font-semibold text-[16px] whitespace-nowrap  sm:flex justify-center items-center sm:gap-1 absolute right-5">
              <RiCustomerService2Fill size={20} />
              <span className="font-bold">+91 9804611111</span>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default Hero;
