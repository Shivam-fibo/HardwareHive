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
    <div>
      <header
        className="absolute top-0 left-0 w-full flex justify-between items-center p-4 bg-white cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/logo/ss_power_tool_logo.png" width={"200px"} />
        <button
          className="w-[129.39px] h-[39.88px] bg-[#013E70] rounded-xl border border-[#013E70] text-white"
          onClick={handleProduct} 
        >
          Products
        </button>
      </header>
    </div>
  );
};

export default Header;
