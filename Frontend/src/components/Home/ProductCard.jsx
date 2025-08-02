import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "react-hot-toast";

const ProductCard = ({ product, handleAddToCart, onViewDetails, isAdded }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [quantity, setQuantity] = useState();
  
  
  const handleClick = () => {
    console.log(" added")
    if (isAdded) {
      toast.error("Product already added to cart");
      return;
    }
    if (!quantity || quantity < 1) {
      toast.error("Please enter a valid quantity before adding to list.");
      return;
    }
    handleAddToCart( quantity);
  };

  return (
    <div
      ref={ref}
      className={`cursor-pointer border rounded-lg p-3 h-69 shadow-sm bg-white flex flex-col justify-between transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div onClick={onViewDetails} className="flex flex-col gap-1">
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-34 object-contain border rounded-lg p-3 shadow-sm"
          />
        </div>
        <div className="mt-1 flex justify-between items-start">
          <div>
            <h2 className="text-sm font-medium line-clamp-1">{product.title}</h2>
            {/* <p className="text-sm font-semibold">{product.subheading}</p> */}
          </div>
          <p className="text-sm text-green-600 font-semibold">₹{product.price}</p>
        </div>
        <p className="text-xs text-gray-500">{product.productInfo}</p>
        <p className="text-xs text-gray-500">{product.productBrand}</p>
      </div>
      <div className="flex gap-2 mb-1">
        <input
          type="number"
          min="0"
          value={quantity || ""}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Add Qty."
          className="border border-black rounded pl-2 py-1 text-[10px] w-full"
        />
        <button
          className={`text-[10px] px-2 rounded font-semibold w-full text-nowrap ${
            isAdded
              ? "bg-gray-400 text-white"
              : "bg-yellow-400 hover:bg-yellow-500 text-black cursor-pointer"
          }`}
          onClick={handleClick}
        >
          {isAdded ? "Added" : "Add to list"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;