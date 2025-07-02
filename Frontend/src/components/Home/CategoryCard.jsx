import { useInView } from "react-intersection-observer";

const CategoryCard = ({ category, image, onClick }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div
      ref={ref}
      className={`cursor-pointer border rounded-lg p-3 h-62 shadow-sm bg-white flex flex-col transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={image}
          alt={category}
          className="w-full h-34 object-contain border rounded-lg p-3 shadow-sm"
        />
      </div>
      <div className="mt-2 flex justify-between items-start">
        <div>
          <h2 className="text-sm font-medium line-clamp-1">{category}</h2>
          <p className="text-xs text-gray-500 line-clamp-2">
            Click to view all {category} products
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;