import React from "react";

const images = Array.from({ length: 16 }, (_, i) => `/logo/img${i + 1}.jpg`);

const BrandsSection = () => {
  return (
    <div className="bg-white py-2 overflow-hidden">
      <div className="text-center text-[20px] font-inter font-semibold text-[#013760] leading-[150%] mb-4">
        -----Spare Part Available Multi-Brand------
      </div>

      {/* Scrolling wrapper */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max scroll-infinite whitespace-nowrap">
          {[...images, ...images].map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Brand ${index + 1}`}
              className="h-10 w-auto mx-4 object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsSection;
