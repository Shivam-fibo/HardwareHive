import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserLock } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";

const Header = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  return (

    <header className="bg-white p-2 sm:h-12 flex justify-between items-center sm:mx-6">

      <div onClick={() => navigate("/")}
        className="h-full flex justify-between items-center cursor-pointer"
      >
        <img src="/logo/ss_power_tool_logo.svg" width={"150px"} />
      </div>

      <span onClick={() => setOpen(!open)}>
        <FaUserLock className="text-xl" />
      </span>

      {open && (
        <div
          ref={ref}
          className="absolute border-gray-500 top-10 sm:top-11 right-4 sm:right-8 bg-white text-black shadow-lg rounded-lg z-50 overflow-hidden text-sm font-medium"
        >
          <p onClick={() => navigate("/login")} className="cursor-pointer hover:bg-gray-300 flex items-center gap-2 px-4 p-1.5">
            <FaRegUser size={14} /> Login
          </p>
          <p onClick={() => navigate("/register")} className="cursor-pointer hover:bg-gray-300 flex items-center gap-2 px-4 p-1.5">
            <LuUsers size={14} /> Sign Up
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
