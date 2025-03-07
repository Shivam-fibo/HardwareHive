import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Footer from "../Home/Footer";
import { useNavigate } from "react-router-dom";
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
    <div
      className="h-[934px] bg-gray-800"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        minHeight: "100vh",
      }}
    >
      <nav className="flex justify-between items-center text-xl sm:text-3xl font-bold text-white p-4">
        <div className="sm:text-yellow-200 text-yellow-100">SS POWER TOOL</div>
        <div className="flex items-center">
          <button
            className="flex flex-col items-center bg-zinc-700 hover:bg-zinc-600 border-1 sm:border-2 text-white py-1 px-2 sm:px-2 rounded-lg text-sm sm:text-xl font-bold cursor-pointer"
            onClick={() => navigate("/allProductShow")}
          >
            PRODUCT
          </button>
        </div>
      </nav>

      <div className="sm:text-yellow-200 text-yellow-100 h-[816px] ">
        {/* Navbar */}

        {/* Main Section with Background Image */}
        <div className="text-center py-20 mt-10 px-4 bg-center">
          <h1 className="text-xl sm:text-3xl font-bold">
            MULTI-BRAND POWER TOOLS
          </h1>
          <h2 className="text-base sm:text-2xl font-bold">
            SPARE PARTS B2B PORTAL
          </h2>
          <h3 className="text-sm sm:text-xl font-semibold">
        <p>  NEED HELP WITH REGISTER, LOGIN AND PURHCASING ?  </p>
       <p>   CONTACT US +91 9804611111  </p>
          </h3>

          <div className="flex flex-col items-center gap-6 mt-12">
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg font-bold"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
            <button
              className="bg-red-600 text-white py-2 px-6 rounded-lg text-lg font-bold"
              onClick={() => navigate("/register")}
            >
              REGISTER
            </button>
          </div>
        </div>

        {/* Registration Modal */}
      </div>
      {/* <div className="h-24 bg-zinc-700 mt-42"></div> */}

      <Footer mt="0px" />
    </div>
  );
};

export default Home;
