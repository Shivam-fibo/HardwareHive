import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [registrationFormData, setRegistrationFormData] = useState({
    name: "", companyName: "", mobile: "", whatsapp: "", email: "",
    city: "", district: "", state: "", pincode: "", gstType: "non-gst", gstNumber: ""
  });

  const [bgImage, setBgImage] = useState("");
  const [visitingCard, setVisitingCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateBackground = () => {
      setBgImage(window.innerWidth < 768 ? "/images/background3.jpg" : "/images/background2.jpg");
    };
    updateBackground();
    window.addEventListener("resize", updateBackground);
    return () => window.removeEventListener("resize", updateBackground);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationFormData({ ...registrationFormData, [name]: value });
  };

  const handleFileChange = (e) => {
    setVisitingCard(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(registrationFormData).forEach((key) => {
        formData.append(key, registrationFormData[key]);
      });
      if (visitingCard) {
        formData.append("visitingCard", visitingCard);
      }

      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Registration submitted! Admin will review it.");
        navigate("/");
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to submit registration");
    }
  };

  return (
    
    <div className="flex justify-center items-center h-[934px]  overflow-hidden" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
      <div className="bg-gray-600 bg-opacity-60 text-white p-6 rounded-lg w-96 shadow-2xl">
        <h2 className="text-xl font-bold mb-4 text-center">REGISTER</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" placeholder="Full Name" className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white" onChange={handleInputChange} required />
          <input type="text" name="companyName" placeholder="Company Name*" className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white" onChange={handleInputChange} required />
          <input type="tel" name="mobile" placeholder="Mobile Number*" className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white" onChange={handleInputChange} required />
          <input type="tel" name="whatsapp" placeholder="WhatsApp Number*" className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white" onChange={handleInputChange} required />
          <input type="email" name="email" placeholder="Email*" className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white" onChange={handleInputChange} required />
          <input type="text" name="city" placeholder="City*" className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white" onChange={handleInputChange} required />
          <input type="text" name="district" placeholder="District*" className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white" onChange={handleInputChange} required />
          <input type="text" name="pincode" placeholder="Pincode*" className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white" onChange={handleInputChange} required />
          <input type="text" name="state" placeholder="State*" className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white" onChange={handleInputChange} required />

          <label className="my-2">Visiting Card</label>
          <input type="file" name="visitingCard" className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white" onChange={handleFileChange} accept="image/*" />

          <p className="text-white mt-2">GST Type:</p>
          <div className="flex space-x-4">
          <label className="flex items-center">
              <input type="radio" name="gstType" value="gst" checked={registrationFormData.gstType === "gst"} onChange={handleInputChange} className="mr-2" /> GST
            </label>
            <label className="flex items-center">
              <input type="radio" name="gstType" value="non-gst" checked={registrationFormData.gstType === "non-gst"} onChange={handleInputChange} className="mr-2" /> Non-GST
            </label>
           
          </div>

          {registrationFormData.gstType === "gst" && (
            <input type="text" name="gstNumber" placeholder="Enter GST Number" className="w-full p-2 border bg-gray-600 bg-opacity-50 text-white" onChange={handleInputChange} required />
          )}


          <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded">Submit</button>
          <button type="button" onClick={() => navigate(-1)} className="bg-gray-500 text-white w-full p-2 rounded mt-2">Back</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
