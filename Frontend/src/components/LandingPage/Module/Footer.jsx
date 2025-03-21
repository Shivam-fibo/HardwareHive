import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#013E70] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Address Section */}
        <div>
          <h3 className="font-bold text-lg">ADDRESS</h3>
          <p className="mt-2">
            <strong>S S GROUP</strong> <br />
            GST NO. 06ADRPG7908H1Z9 <br />
            SHOP NO. 259/E <br />
            GAUSHALA MARKET NEAR SHYAM MANDIR, <br />
            NARNAUL, DISTRICT MAHENDRAGARH <br />
            PIN NO. 123001 HARYANA
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="font-bold text-lg">CONTACT</h3>
          <p className="mt-2">
            Email: <a href="mailto:sspowertool.in@gmail.com" className="underline">SSPOWERTOOL.IN@GMAIL.COM</a> <br />
            CONTACT NO: +91 9804611111, 9992707172
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-3 text-lg">
            <FaFacebookF className="cursor-pointer hover:text-gray-300" />
            <FaInstagram className="cursor-pointer hover:text-gray-300" />
            <FaXTwitter className="cursor-pointer hover:text-gray-300" />
            <FaLinkedinIn className="cursor-pointer hover:text-gray-300" />
            <FaYoutube className="cursor-pointer hover:text-gray-300" />
          </div>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="font-bold text-lg">QUICK LINKS</h3>
          <ul className="mt-2 space-y-1">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Products</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <hr className="mt-6 border-gray-400" />
    </footer>
  );
};

export default Footer;
