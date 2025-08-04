import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.stopPropagation(); 
    console.log("handle Product clicked");
    navigate("/register");
  };

  return (

    <div className="bg-white p-2">

      <header
        className="w-full h-full flex justify-between items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/logo/ss_power_tool_logo.svg" width={"150px"} className="sm:ml-6" />
        <button
          className="w-[100px] h-[35px] sm:mr-6 bg-[#013E70] rounded-xl border border-[#013E70] text-white cursor-pointer"
          onClick={handleRegister} 
        >
         Register
        </button>
      </header>
    </div>
  );
};

export default Header;
