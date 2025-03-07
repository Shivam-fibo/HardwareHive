import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Home/Footer";

const Home = () => {
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth < 768) {
        setBgImage("/images/background3.jpg");
      } else {
        setBgImage("/images/background2.jpg");
      }
    };

    updateBackground();
    window.addEventListener("resize", updateBackground);

    return () => window.removeEventListener("resize", updateBackground);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <div
        className="flex-grow"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          position: "relative",
        }}
      >
        <nav className="flex justify-between items-center text-xl sm:text-3xl font-bold text-white p-4">
          <div>SS POWER TOOL</div>
          <div className="flex items-center">
            <button
              className="flex flex-col items-center bg-zinc-700 hover:bg-zinc-600 border border-white text-white py-1 px-2 sm:px-2 rounded-lg text-sm sm:text-xl font-bold cursor-pointer"
              onClick={() => navigate("/allProductShow")}
            >
              PRODUCT
            </button>
          </div>
        </nav>

        <div className="text-yellow-100">
          {/* Main Section with Background Image */}
          <div className="text-center py-20 mt-10 px-4 bg-center">
            <h1 className="text-xl sm:text-3xl font-bold">
              MULTI-BRAND POWER TOOLS
            </h1>
            <h2 className="text-base sm:text-2xl font-bold">
              SPARE PARTS B2B PORTAL
            </h2>
            <h3 className="text-sm sm:text-xl font-semibold">
           <p> Need help with registration, login, or purchasing?</p>
            <p> Call us at +91 9804611111.</p>
           </h3>


            <div className="flex flex-col items-center gap-6 mt-12">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-bold"
                onClick={() => navigate("/login")}
              >
                LOGIN
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg text-lg font-bold"
                onClick={() => navigate("/register")}
              >
                REGISTER
              </button>
            </div>
          </div>
        </div>
        
        <div className="h-24 bg-zinc-700 mt-auto"></div>
      </div>

      <Footer mt="mt-0"/>
    </div>
  );
};

export default Home;