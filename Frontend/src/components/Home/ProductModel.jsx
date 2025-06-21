// ProductModal.tsx
import React from "react";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-transparent bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 flex gap-6">
        <img src={product.image} alt={product.title} className="w-1/2 h-auto object-contain border rounded-lg" />
        <div className="flex flex-col w-1/2">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-gray-500 text-sm mt-1">{product.subheading}</p>
          <p className="text-sm mt-4">{product.description || "No description available."}</p>
          <p className="text-xl font-semibold mt-4">₹{product.price}</p>
          <button onClick={onClose} className="mt-auto bg-[#013E70] text-white px-4 py-2 rounded self-end hover:bg-[#002b4d]">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
