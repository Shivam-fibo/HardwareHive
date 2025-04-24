import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleProduct = (e) => {
    e.stopPropagation(); 
    console.log("handle Product clicked");
    navigate("/allProductShow");
  };

  return (
    <div className="h-15">
      <header
        className="w-full flex justify-between items-center p-2 bg-[#D8D9D8] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/logo/ss_power_tool_logo.png" width={"210px"} className="ml-10" />
        <button
          className="w-[129.39px] h-[39.88px] mr-6 bg-[#013E70] rounded-xl border border-[#013E70] text-white"
          onClick={handleProduct} 
        >
          Products
        </button>
      </header>
    </div>
  );
};

export default Header;
