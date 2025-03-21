import React from "react";

const Hero = () => {
  return (
    <div className="bg-[#013E70] text-white flex flex-col items-center justify-center p-6">
      <div
        className="relative text-center mt-16 h-screen w-full flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/noise.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
       
        <div className="absolute top-36 left-8 w-44 h-44 bg-[#014F7A] rounded-full opacity-60"></div>
        <div className="absolute top-36 right-8 w-44 h-44 bg-[#014F7A] rounded-full opacity-60"></div>
        <div className="absolute bottom-8 left-8 w-44 h-44 bg-[#014F7A] rounded-full opacity-60"></div>
        <div className="absolute bottom-8 right-8 w-44 h-44 bg-[#014F7A] rounded-full opacity-60"></div>

        {/* Images */}
        <img
          src="/images/bearing.png"
          alt="Bearing"
          className="absolute top-40 left-10 w-40"
        />
        <img
          src="/images/coupling.png"
          alt="Coupling"
          className="absolute top-40 right-10 w-40"
        />
        <img
          src="/images/motor.png"
          alt="Motor"
          className="absolute bottom-10 left-10 w-40"
        />
        <img
          src="/images/armature.png"
          alt="Armature"
          className="absolute bottom-10 right-10 w-40"
        />

        {/* Text Section */}
        <div className="z-10 text-center">
          <h2 className="text-3xl font-bold uppercase">
            Multi-Brand Power Tools
          </h2>
          <h1 className="text-3xl  mt-2">SPARE PARTS B2B PORTAL</h1>
          <p className="text-lg mt-2">
            Need help with register, login, and purchasing?
          </p>
          <p className="text-lg font-bold mt-2">Contact Us +91 9804611111</p>

          <button className="mt-6 bg-white text-black px-6 py-2">
            Login with Single Key
          </button>

          <p className="mt-4 text-sm italic">
            <a href="#" className="text-blue-300 underline">
              Don’t have a single key ID yet? Click here to register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
