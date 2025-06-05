import React, { useState } from "react";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  // FaTwitter,  // Corrected
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6"
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
      const res = await fetch("https://hardware-hive-backend.vercel.app/api/admin/getQuery", {
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
    <div className="bg-[#013E70] text-white border-t-4  border-white">
      <div className="px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:gap-20 gap-10">
        {/* Address Section */}
        <div className="text-[12px] space-y-4">
          <div className="flex items-center gap-2 font-bold text-base text-[16px]">
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
            <p>Contact No. : +91 9804611111, 9992707172</p>
          </div>

          <div className="flex gap-4">
            <img src="icons/Google_Play.svg" alt="Google_Play" className="cursor-pointer" />
            <img src="icons/App_Store.png" alt="App_Store" className="cursor-pointer" />
           </div>
        </div>

        {/* Map Section */}
        <div>
          <h2 className="font-bold mb-2 text-[16px]">Map</h2>
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

        {/* Form + Social Section (Wrap in one block and make responsive) */}
        <div className="lg:col-span-2 w-full">
          <div className="flex flex-col lg:flex-row sm:gap-20 gap-10">
            {/* Form Section */}
            <div className="w-full space-y-3 text-[14px]">
              <h2 className="font-bold mb-2 text-[16px]">For Query</h2>
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
                placeholder="Type your message..."
                className="w-full px-3 py-2 rounded-md bg-white text-black"
              />
              <button
                onClick={handleSubmit}
                className="bg-yellow-400 text-black px-6 py-2 rounded-md w-full font-semibold"
              >
                Submit
              </button>
            </div>

            {/* Social Section */}
            <div>
              <h2 className="font-bold mb-4 text-[16px] text-nowrap">Follow Us</h2>
              <div className="text-[14px] flex justify-between sm:flex-col sm:gap-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <img src="icons/facebook.svg" alt="facebook" width={30} height={30}/>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <img src="icons/instagram.svg" alt="instagram" width={30} height={30}/>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                 <img src="icons/x.svg" alt="x" width={30} height={30}/>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <img src="icons/linkedin.svg" alt="linkedin" width={30} height={30}/>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="">
                  <img src="icons/youtube.svg" alt="youtube" width={30} height={30} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Border */}
      <hr className="pb-6 w-[90%] m-auto border-t border-white sm:mt-0 mt-10" />
    </div>

  );
};

export default Footer;
