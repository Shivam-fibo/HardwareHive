import React, { useState } from "react";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  // FaTwitter,  // Corrected
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import toast from 'react-hot-toast';

const Footer = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async () => {
    try {
      const res = await fetch("https://hardware-hive.vercel.app/api/admin/getQuery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        console.log("Query submitted:", data);
        toast.success("Submitted successfully!");
        setForm({ name: "", email: "", subject: "", message: "" }); // clear form
      } else {
        console.error("Server error:", data.message);
        toast.error("Submission failed: " + data.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Submission failed. Please try again later.");
    }
  };
  
  return (
    <div className="bg-[#013E70]">
      <div className="bg-[#013E70] text-white px-4 md:px-10 flex flex-col md:flex-row gap-20">
      {/* Address Section */}
      <div className="flex-1 text-sm space-y-4">
        <div className="flex items-center gap-2 font-bold text-base">
          <div className="border p-2 rounded-sm">
          <FaMapMarkerAlt />
          </div>
          ADDRESS
        </div>
        <div>
          <p>S S GROUP</p>
          <p>GST NO. 06ADRPG7908H1Z9</p>
          <p>SHOP NO. 259/E</p>
          <p>GAUSHALA MARKET NEAR SHYAM MANDIR,</p>
          <p>NARNAUL, DISTRICT MAHENDRAGARH</p>
          <p>PIN NO. 123001 HARYANA</p>
        </div>

        <div className="flex items-center gap-2 font-bold text-base mt-4">
        <div className="border p-2 rounded-sm">
          <FaPhoneAlt />
          </div>
          CONTACT
        </div>
        <div>
          <p>Email: <span className="lowercase">sspowertool.in@gmail.com</span></p>
          <p>CONTACT NO: +91 9804611111, 9992707172</p>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex-1">
        <h3 className="font-bold mb-2">Map</h3>
        <iframe
    title="SS Tools Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3480.497160657592!2d76.1126022!3d28.0511907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3912b502333c1949%3A0xe88f77393bd85f0d!2z4KS44KS-4KSmIOCkquCljeCksuCkviDgpK_gpYLgpKrgpYHgpL4!5e0!3m2!1sen!2sin!4v1713975621723!5m2!1sen!2sin"
    width="100%"
    height="200"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="rounded-md"
  ></iframe>
      </div>

      {/* Form Section */}
      <div className="flex-1 space-y-3">
        <h3 className="font-bold mb-2">For Query</h3>
        <input
  type="text"
  name="name"
  value={form.name}
  onChange={handleChange}
  placeholder="Name"
  className="w-full px-3 py-2 rounded-md bg-white text-black"
/>
<input
  type="email"
  name="email"
  value={form.email}
  onChange={handleChange}
  placeholder="Email"
  className="w-full px-3 py-2 rounded-md bg-white text-black"
/>
<input
  type="text"
  name="subject"
  value={form.subject}
  onChange={handleChange}
  placeholder="Subject"
  className="w-full px-3 py-2 rounded-md bg-white text-black"
/>
<textarea
  name="message"
  value={form.message}
  onChange={handleChange}
  rows={4}
  placeholder="Type your message.."
  className="w-full px-3 py-2 rounded-md bg-white text-black"
/>

        <button   onClick={handleSubmit}  className="bg-yellow-400 text-black px-6 py-2 rounded-md w-full font-semibold">
          Submit
        </button>
      </div>
      

      {/* Social Section */}
      <div className=" text-lg">
      <h3 className="font-bold mb-4">Follow Us</h3>
      <div className="space-y-4 text-sm">
        <div className="flex items-center gap-2 text-xl">
          <FaFacebookF className="text-blue-400" /> Facebook
        </div>
        <div className="flex items-center gap-2 text-xl">
          <FaInstagram className="text-pink-400" /> Instagram
        </div>
        <div className="flex items-center gap-2 text-xl">
          <FaLinkedinIn className="text-blue-300" /> LinkedIn
        </div>
        <div className="flex items-center gap-2 text-xl">
          <FaYoutube className="text-red-500" /> Youtube
        </div>
      </div>
      </div>
    </div>
    <div className="pt-10 mt-6 left-0 w-full border-t-4 border-[#D8D9D8]"></div>

    </div>
  );
};

export default Footer;
