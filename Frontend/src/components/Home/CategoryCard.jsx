import { useInView } from "react-intersection-observer";

const CategoryCard = ({ category, image, onClick, modelNum }) => {
  const { ref } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200 transform hover:scale-105 p-4"
    >
      <div className="flex flex-col items-center justify-center h-full text-center">
        {image && (
          <div className="w-16 h-16 mb-3 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            <img 
              src={image} 
              alt={category}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        <h3 className="font-semibold text-gray-800 text-base mb-1 truncate">
          {category}
        </h3>
     
        <p className="text-xs text-gray-600 leading-tight">
           {modelNum} 
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;