import React from "react";

const Hero = () => {
  return (
    <div className="bg-[#014F7A] text-white flex flex-col items-center justify-center p-6">
      <div
        className="text-center mt-16  "
        style={{
          backgroundImage: "url('/images/background4.png')",
          height: "100vh",
          width: "100%",
          
        }}
      >
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
        src="/images/armauture.png"
        alt="Armature"
        className="absolute bottom-10 right-10 w-40"
      />

        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg font-semibold uppercase">
              Multi-Brand Power Tools
            </h2>
            <h1 className="text-3xl font-bold mt-2">Spare Parts B2B Portal</h1>
            <p className="text-lg mt-2">
              Need help with register, login, and purchasing?
            </p>
            <p className="text-lg font-bold mt-2">Contact Us +91 9804611111</p>

            <button className="mt-6 bg-white text-black px-6 py-2 rounded shadow-md">
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
    </div>
  );
};

export default Hero;
