import { useState } from "react";
import Header from "../LandingPage/Module/Header";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import Footer from "../LandingPage/Module/Footer";

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
      const response = await fetch("https://hardware-hive.vercel.app/api/users/register", {
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
    <div className="bg-[#013E70] min-h-screen w-full overflow-x-hidden">
      {/* Top Header */}
      <div className="h-12">
        <header
          className="w-full h-full flex justify-between items-center p-2 bg-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/logo/ss_power_tool_logo.png"
            width={"150px"}
            className="sm:ml-6"
            alt="SS Power Tools Logo"
          />
          <div className="flex gap-1 text-nowrap font-semibold text-[14px] text-right sm:mr-6">
            <img src="icons/customer-service.svg" alt="" /><p> +91 9804611111</p>
          </div>
        </header>
      </div>

      {/* Main Form Section */}
      <div className="flex justify-center items-center px-4 py-4">
        <div className="bg-white bg-opacity-90 p-6 rounded-lg w-full max-w-sm shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#013E70] tracking-widest">
            {Title}
          </h2>

          {step === 1 ? (
            <form className="space-y-2">
              {[
                { label: "Full Name", name: "name", type: "text" },
                { label: "Company Name", name: "companyName", type: "text" },
                { label: "Mobile Number", name: "mobile", type: "tel" },
                { label: "WhatsApp Number", name: "whatsapp", type: "tel" },
                { label: "Email", name: "email", type: "email" },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block mb-1 font-medium text-[14px]">{label} *</label>
                  <input
                    type={type}
                    name={name}
                    className="w-full p-2 border rounded-lg bg-white text-black outline-none text-[14px]"
                    value={formData[name]}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full p-3 mt-2 bg-[#013E70] text-white rounded-lg transition hover:bg-[#012a4d] cursor-pointer"
              >
                Next
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              {[
                { label: "Address", name: "address" },
                { label: "City", name: "city" },
                { label: "District", name: "district" },
                { label: "State", name: "state" },
                { label: "Pincode", name: "pincode" },
                { label: "Enter GST Number", name: "gstNumber" },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block mb-1 font-medium text-[14px]">{label}</label>
                  <input
                    type="text"
                    name={name}
                    className="w-full p-2 border rounded-lg bg-white text-black outline-none text-[14px]"
                    value={formData[name]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}

              <div className="flex flex-row gap-2 pt-2">
                <button
                  type="submit"
                  className="w-full p-3 border border-[#013E70] text-[#013E70] bg-white rounded-lg transition hover:bg-gray-100 text-[14px] cursor-pointer"
                >
                  Skip to Next
                </button>
                <button
                  type="submit"
                  className="w-full p-3 bg-[#013E70] text-white rounded-lg transition hover:bg-[#012a4d] text-[14px] cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
