import React from "react";

const images = Array.from({ length: 16 }, (_, i) => `/images/img${i + 1}.jpg`);

const Products = () => {
  return (
    <div className="p-6">

<header className="w-full flex justify-between items-center p-4 bg-white">
      <h1 className="text-xl font-bold text-black italic">SS POWER TOOLS</h1>
      <div className="font-bold">
      Contact No. +91 9804611111 
      </div>
    </header>
    <div className=" mb-10 w-full h-2 bg-[#013E70]"></div>

     
      <h1 className="text-4xl font-bold">Products</h1>
      <div className="h-1 bg-blue-500 w-32 mt-2"></div>

      {Array.from({ length: 4 }).map((_, rowIndex) => (
        <div key={rowIndex} className="mt-6">
          
          <div className="grid grid-cols-4 gap-6">
            {images.slice(rowIndex * 4, rowIndex * 4 + 4).map((src, index) => (
              <div
                key={index}
                className="border p-4 flex items-center justify-center shadow-lg"
              >
                <img
                  src={src}
                  alt={`Product ${rowIndex * 4 + index + 1}`}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          
          <div className="bg-blue-500 text-center text-white w-full text-lg font-semibold px-4 py-2 mt-4">
            Armature
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
