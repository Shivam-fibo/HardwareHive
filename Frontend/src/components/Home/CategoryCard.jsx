import { useInView } from "react-intersection-observer";

const CategoryCard = ({ category, image, onClick, modelNum, model, size, brand }) => {
  console.log(model, size, "-----------")
  const { ref } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="bg-white border rounded-lg shadow-md cursor-pointer h-60 p-4"
    >
      <div className="flex flex-col items-center justify-center h-full text-center">
        {image && (
          <div className="w-full h-34 object-contain border rounded-lg p-3 shadow-sm">
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

     
       <div className="mt-2">
         <p className="text-xs text-gray-600 leading-tight">
           {modelNum} 
        </p>
          <p className="text-xs text-gray-600 leading-tight">
           {brand} 
        </p>
              <p className="text-xs text-gray-600 leading-tight">
           {model} 
        </p>
              <p className="text-xs text-gray-600 leading-tight">
           {size} 
        </p>
       </div>

       

      </div>
    </div>
  );
};

export default CategoryCard;