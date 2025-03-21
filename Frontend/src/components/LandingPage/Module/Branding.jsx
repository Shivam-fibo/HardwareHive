import React from "react";

const images = Array.from({ length: 16 }, (_, i) => `/logo/img${i + 1}.jpg`);

const BrandsSection = () => {
  return (
    <div className="bg-white py-6">
     <div className="text-center text-[24px] font-inter font-semibold text-[#013760] leading-[150%] mb-4">
  ------Dealing with Multiple Brands------
    </div>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-4 justify-items-center px-4">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Brand ${index + 1}`} className="h-10 md:h-12 object-contain" />
        ))}
      </div>
      <div className="text-center text-[24px] font-inter font-bold uppercase leading-[150%] tracking-[0%] text-blue-600 mt-4">
  GET ACCESS TO MULTIPLE BRANDS IN ONE PLATFORM.
</div>

    </div>
  );
};

export default BrandsSection;
