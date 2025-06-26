import React, { useState, useEffect, useRef } from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";

const ContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-50" ref={containerRef}>
      {/* Desktop view */}
      <div className="hidden sm:block rounded-full">
        <div className="text-[#013E70] text-xl flex flex-col items-center">
          <a
            href="https://wa.me/919804611111"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 p-4 rounded-full text-white hover:scale-110 transition"
            title="WhatsApp"
          >
            <FaWhatsapp size={22} />
          </a>
        </div>
      </div>

      {/* Mobile view */}
      <div className="relative sm:hidden flex flex-col items-center">
        {/* Floating options */}
        <div
          className={`flex flex-col items-center gap-2 transition-all duration-300 ${
            isOpen ? "opacity-100 translate-y-[-30px]" : "opacity-0 translate-y-0 pointer-events-none"
          }`}
        >
          <a
            href="tel:+919804611111"
            className="bg-blue-500 p-4 rounded-full text-white hover:scale-110 transition"
            title="Call"
          >
            <FaPhone size={20} />
          </a>

          <a
            href="https://wa.me/919804611111"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 p-4 rounded-full text-white hover:scale-110 transition"
            title="WhatsApp"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>

        {/* Main toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-yellow-400 p-4 rounded-full"
          title="Contact Support"
        >
          <MdOutlineSupportAgent size={24} className="text-[#013E70]" />
        </button>
      </div>
    </div>
  );
};

export default ContactButton;
