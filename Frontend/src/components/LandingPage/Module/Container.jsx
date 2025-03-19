import React from "react";
import { Truck, Clock, Package } from "lucide-react"; // Using Lucide icons

const FeatureSection = () => {
  return (
    <div className="bg-[#003E71] text-white py-10">
        <div className="mb-10 top-0 left-0 w-full border-t-2 border-white"></div>
      <h2 className="text-center text-xl font-semibold italic">
        MULTI-BRAND SPARE PART SUPPLY
      </h2>
      <div className="flex justify-center gap-46 mt-6">
       
            <div className="flex flex-col items-center text-center">
            <Truck size={50} className="text-gray-300" />
            <p className="mt-2">• Quick Order</p>
            </div>

            {/* 24/7 Access */}
            <div className="flex flex-col items-center text-center">
            <Clock size={50} className="text-gray-300" />
            <p className="mt-2">• 24/7 access</p>
            </div>

            {/* Bulk Order Pad */}
            <div className="flex flex-col items-center text-center">
            <Package size={50} className="text-gray-300" />
            <p className="mt-2">• Bulk order pad</p>
            </div>
      </div>
    </div>
  );
};

export default FeatureSection;
