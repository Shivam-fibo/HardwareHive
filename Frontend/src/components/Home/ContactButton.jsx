import { useState } from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";

const ContactButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <div
        className="relative flex flex-col items-center group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        <div
          className={`flex flex-col items-center gap-2 transition-all duration-500 ease-in-out ${
            isHovered ? "opacity-100 translate-y-[-40px]" : "opacity-0 translate-y-0 pointer-events-none"
          }`}
        >

          <a
            href="tel:+919804611111"
            className="bg-blue-500 p-3 rounded-full text-white shadow-lg hover:scale-110 transition"
            title="Call"
          >
            <FaPhone size={20} />
          </a>

          <a
            href="https://wa.me/919804611111"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 p-3 rounded-full text-white shadow-lg hover:scale-110 transition"
            title="WhatsApp"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>

        <div className="bg-white p-3.5 rounded-full shadow-xl">
          <div className="text-[#013E70] text-xl flex flex-col items-center">
            <MdOutlineSupportAgent size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}


export default ContactButton;