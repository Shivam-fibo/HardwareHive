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

  return (
    <>
      <Header />
      <div
        className="flex items-center justify-center h-screen w-full bg-[#013E70] px-4 mt-4"
        style={{
          backgroundImage: "url('/images/noise.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-[#013E70] bg-opacity-80 text-white p-6 rounded-lg w-full max-w-md shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center underline tracking-widest">
            REGISTER
          </h2>

          {step === 1 ? (
            <form className="space-y-4">
              <input type="text" name="name" placeholder="Full Name" className="w-full p-3 border bg-[#013E70] text-white outline-none" value={formData.name} onChange={handleInputChange} required />
              <input type="text" name="companyName" placeholder="Company Name" className="w-full p-3 border bg-[#013E70] text-white outline-none" value={formData.companyName} onChange={handleInputChange} required />
              <input type="tel" name="mobile" placeholder="Mobile Number" className="w-full p-3 border bg-[#013E70] text-white outline-none" value={formData.mobile} onChange={handleInputChange} required />
              <input type="tel" name="whatsapp" placeholder="WhatsApp Number" className="w-full p-3 border bg-[#013E70] text-white outline-none" value={formData.whatsapp} onChange={handleInputChange} required />
              <input type="email" name="email" placeholder="Email" className="w-full p-3 border bg-[#013E70] text-white outline-none" value={formData.email} onChange={handleInputChange} required />
              <button type="button" className="w-full p-3 mt-2 bg-blue-600 hover:bg-blue-500 transition-all" onClick={() => setStep(2)}>Next</button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="address" placeholder="Address" className="w-full p-3 border bg-[#013E70] text-white outline-none" value={formData.address} onChange={handleInputChange} />
              <input type="text" name="city" placeholder="City" className="w-full p-3 border bg-[#013E70] text-white outline-none" value={formData.city} onChange={handleInputChange} />
              <input type="text" name="district" placeholder="District" className="w-full p-3 border bg-[#013E70] text-white outline-none" value={formData.district} onChange={handleInputChange} />
              <input type="text" name="state" placeholder="State" className="w-full p-3 border bg-[#013E70] text-white outline-none" value={formData.state} onChange={handleInputChange} />
              <input type="text" name="pincode" placeholder="Pincode" className="w-full p-3 border bg-[#013E70] text-white outline-none" value={formData.pincode} onChange={handleInputChange} />
              <input type="text" name="gstNumber" placeholder="Enter GST Number" className="w-full p-3 border bg-[#013E70] text-white outline-none" value={formData.gstNumber} onChange={handleInputChange} />
              <div className="flex gap-2">
                <button type="button" className="w-full p-3 bg-gray-600 hover:bg-gray-500 transition-all" onClick={() => setStep(1)}>Back</button>
                <button type="submit" className="w-full p-3 bg-blue-600 hover:bg-blue-500 transition-all">Submit</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
