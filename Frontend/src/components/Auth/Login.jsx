import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-blue-400 text-black p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLoginSubmit} className="space-y-3">
          <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded"
            onChange={handleLoginInputChange} required />
          <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded"
            onChange={handleLoginInputChange} required />
          <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded">Login</button>
          <button type="button" onClick={() => navigate(-1)} className="bg-gray-500 text-white w-full p-2 rounded mt-2">
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
