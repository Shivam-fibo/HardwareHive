import { useState } from "react";
import Header from "../LandingPage/Module/Header";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    mobile: "",
    whatsapp: "",
    email: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    gstNumber: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
// https://hardware-hive.vercel.app/
    try {
      const response = await fetch("https://hardware-hive.vercel.app/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Registration Successful:", data);
        toast.success("Registration Successful! Please wait until the admin approves the request");
        navigate("/");
      } else {
        console.error("Registration Failed:", data);
        toast.error(data.message || "Registration Failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const Title = step === 1 ? "Register" : "Address Detail"

  return (
    <>
    
    <div className="flex items-center justify-center h-screen w-full bg-[#013E70] ">
      <div className="bg-white bg-opacity-80 text-black p-6 rounded-lg w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold mb-4 text-center text-[#013E70] tracking-widest">
          {Title}
        </h2>
  
        {step === 1 ? (
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Full Name *</label>
              <input type="text" name="name" className="w-full p-3 border bg-white text-black outline-none" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <label className="block mb-1">Company Name *</label>
              <input type="text" name="companyName" className="w-full p-3 border bg-white text-black outline-none" value={formData.companyName} onChange={handleInputChange} required />
            </div>
            <div>
              <label className="block mb-1">Mobile Number *</label>
              <input type="tel" name="mobile" className="w-full p-3 border bg-white text-black outline-none" value={formData.mobile} onChange={handleInputChange} required />
            </div>
            <div>
              <label className="block mb-1">WhatsApp Number *</label>
              <input type="tel" name="whatsapp" className="w-full p-3 border bg-white text-black outline-none" value={formData.whatsapp} onChange={handleInputChange} required />
            </div>
            <div>
              <label className="block mb-1">Email *</label>
              <input type="email" name="email" className="w-full p-3 border bg-white text-black outline-none" value={formData.email} onChange={handleInputChange} required />
            </div>
            <button type="button" className="w-full p-3 mt-2 bg-[#013E70] text-white" onClick={() => setStep(2)}>Next</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Address</label>
              <input type="text" name="address" className="w-full p-3 border bg-white text-black outline-none" value={formData.address} onChange={handleInputChange} />
            </div>
            <div>
              <label className="block mb-1">City</label>
              <input type="text" name="city" className="w-full p-3 border bg-white text-black outline-none" value={formData.city} onChange={handleInputChange} />
            </div>
            <div>
              <label className="block mb-1">District</label>
              <input type="text" name="district" className="w-full p-3 border bg-white text-black outline-none" value={formData.district} onChange={handleInputChange} />
            </div>
            <div>
              <label className="block mb-1">State</label>
              <input type="text" name="state" className="w-full p-3 border bg-white text-black outline-none" value={formData.state} onChange={handleInputChange} />
            </div>
            <div>
              <label className="block mb-1">Pincode</label>
              <input type="text" name="pincode" className="w-full p-3 border bg-white text-black outline-none" value={formData.pincode} onChange={handleInputChange} />
            </div>
            <div>
              <label className="block mb-1">Enter GST Number</label>
              <input type="text" name="gstNumber" className="w-full p-3 border bg-white text-black outline-none" value={formData.gstNumber} onChange={handleInputChange} />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="w-full p-3 text-[#013E70] bg-white border border-[#013E70]">Skip to Next</button>
              <button type="submit" className="w-full p-3 text-white bg-[#013E70] transition-all">Submit</button>
            </div>
          </form>
        )}
      </div>
    </div>
  </>
  
  );
}
