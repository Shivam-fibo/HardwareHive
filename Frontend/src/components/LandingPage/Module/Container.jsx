import React from "react";

const FeatureSection = () => {
  return (
    <div className="bg-[#003E71] text-white py-8 border-b-4  border-[#D8D9D8]">

      <div className="text-center text-[20px] font-semibold italic">
      MULTI-BRAND SPARE PART SUPPLY
      </div>

      {/* Feature Icons Section */}
      <div className="grid grid-cols-3 mt-8">
        {/* Quick Order */}
        <div className="flex flex-col items-center text-center">
          <img src="/images/quick.png" alt="Quick Order" className="h-10 sm:h-14" />
          <p className="mt-4 sm:text-lg text-sm">• Quick Order</p>
        </div>

        {/* 24/7 Access */}
        <div className="flex flex-col items-center text-center">
          <img src="/images/time.png" alt="24/7 Access" className="h-10 sm:h-14" />
          <p className="mt-4 sm:text-lg text-sm">• 24/7 access</p>
        </div>

        {/* Bulk Order Discount */}
        <div className="flex flex-col items-center text-center">
          <img src="/images/bulk.png" alt="Bulk Order Discount" className="h-10 sm:h-14" />
          <p className="mt-4 sm:text-lg text-sm">• Bulk order Discount</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;


