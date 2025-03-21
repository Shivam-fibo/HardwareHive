import React from "react";

const FeatureSection = () => {
  return (
    <div className="bg-[#003E71] text-white py-6">
      
<div className="mb-10 top-0 left-0 w-full border-t-2 border-white"></div>
      {/* Section Heading */}
      <h2 className="text-center text-xl font-semibold italic">
        MULTI-BRAND SPARE PART SUPPLY
      </h2>

      {/* Feature Icons Section */}
      <div className="flex justify-between max-w-4xl mx-auto mt-6">
        {/* Quick Order */}
        <div className="flex flex-col items-center text-center w-1/3">
          <img src="/images/quick.png" alt="Quick Order" className="w-16 h-16" />
          <p className="mt-4">• Quick Order</p>
        </div>

        {/* 24/7 Access */}
        <div className="flex flex-col items-center text-center w-1/3">
          <img src="/images/time.png" alt="24/7 Access" className="w-16 h-16" />
          <p className="mt-4">• 24/7 access</p>
        </div>

        {/* Bulk Order Discount */}
        <div className="flex flex-col items-center text-center w-1/3">
          <img src="/images/bulk.png" alt="Bulk Order Discount" className="w-16 h-16" />
          <p className="mt-4">• Bulk order Discount</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;


