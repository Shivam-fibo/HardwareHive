import { useInView } from "react-intersection-observer";

const CategoryCard = ({ category, image, onClick }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 transform hover:scale-105"
    >
      <div className="aspect-square">
        {inView && (
          <img
            src={image}
            alt={category}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-800 text-sm mb-1 truncate">
          {category}
        </h3>
        <p className="text-xs text-gray-600 leading-tight">
          Click to view all {category} products
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;