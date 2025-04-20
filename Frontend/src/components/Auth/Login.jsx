import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth < 768) {
        setBgImage("/images/background3.jpg");
      } else {
        setBgImage("/images/background2.jpg");
      }
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
        navigate("/home");
      } else {
        toast.error(result.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div
  className="flex justify-center items-center min-h-screen"
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  }}
>
  <div className="bg-gray-600 bg-opacity-60 text-white p-6 rounded-lg w-96 shadow-2xl">
    <h2 className="text-xl font-bold mb-4 text-center">LOGIN</h2>
    <form onSubmit={handleLoginSubmit} className="space-y-3">
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-2 border border-gray-300 bg-gray-600 bg-opacity-50 text-white rounded "
        onChange={handleLoginInputChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-2 border border-gray-300 bg-gray-600 bg-opacity-50 text-white rounded "
        onChange={handleLoginInputChange}
        required
      />
      <div className="text-left">
        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="text-blue-400  text-sm"
        >
          Forgot Password?
        </button>
      </div>
      <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded">
        Login
      </button>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="bg-gray-500 text-white w-full p-2 rounded mt-2"
      >
        Back
      </button>
    </form>
  </div>
</div>


  );
};

export default Login;
