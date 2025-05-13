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
    <div className="bg-[#D8D9D8] p-2">
      <hr className="mb-2 mt-4 m-auto border-t bg-black sm:hidden"/>
      <header
        className="w-full h-full flex justify-between items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/logo/ss_power_tool_logo.png" width={"150px"} className="sm:ml-10" />
        <button
          className="w-[100px] h-[35px] sm:mr-6 bg-[#013E70] rounded-xl border border-[#013E70] text-white"
          onClick={handleProduct} 
        >
          Products
        </button>
      </header>
    </div>
  );
};

export default Header;
