import React from 'react';
import { useInView } from 'react-intersection-observer';

const BrandCard = ({ brand, onClick }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 transform hover:scale-105"
    >
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        {inView && (
          <img
            src={brand.image}
            alt={brand.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150x150?text=Brand';
            }}
            loading="lazy"
          />
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-800 text-sm mb-1 truncate text-center">
          {brand.name}
        </h3>
        {brand.productId && (
          <p className="text-xs text-gray-600 leading-tight text-center">
            ID: {brand.productId}
          </p>
        )}
      </div>
    </div>
  );
};

export default BrandCard;
