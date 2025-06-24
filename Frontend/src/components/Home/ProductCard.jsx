import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "react-hot-toast";
const ProductCard = ({ product, handleAddToCart, onViewDetails, isAdded  }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [quantity, setQuantity] = useState();
  const handleClick = () => {
     if (isAdded) {
    toast.error("Product already added to cart");
    return;
  }
    if (!quantity || quantity < 1) {
      toast.error("Please enter a valid quantity before adding to list.");
      return;
    }
    handleAddToCart(product, quantity);
  };

  return (
    <div
      ref={ref}
      className={`cursor-pointer border rounded-lg p-3 h-62 shadow-sm  flex flex-col justify-between transition-opacity duration-700 ${inView ? "opacity-100" : "opacity-0"
        }`}
    >
      <div onClick={onViewDetails}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-34 object-contain border rounded-lg p-3 shadow-sm"
          />
        </div>
        <div className="mt-2 flex justify-between items-start">
          <div>
            <h2 className="text-sm font-medium line-clamp-1">{product.title}</h2>
            <p className="text-xs text-gray-500 line-clamp-2">{product.subheading}</p>
          </div>
          <p className="text-sm text-green-600 font-semibold mt-1">₹{product.price}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <input
          type="number"
          min="1"
          value={quantity || ""}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Add Qty."
          className="border border-black rounded pl-2 py-1 text-[10px]  w-full "
        />
        <button
  className={`text-[10px] px-2 py-1 rounded font-semibold w-full text-nowrap
    ${isAdded
      ? "bg-gray-400 text-white cursor-not-allowed"
      : "bg-yellow-400 hover:bg-yellow-500 text-black"
    }`}
  onClick={handleClick}
  disabled={isAdded}
>
  {isAdded ? "Added" : "Add to list"}
</button>

      </div>
    </div>
  );
};

export default ProductCard;
