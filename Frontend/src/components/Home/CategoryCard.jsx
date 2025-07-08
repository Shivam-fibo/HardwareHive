import { useInView } from "react-intersection-observer";

const CategoryCard = ({ category, onClick }) => {
  const { ref } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200 transform hover:scale-105 p-4"
    >
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h3 className="font-semibold text-gray-800 text-base mb-1 truncate">
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
