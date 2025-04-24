import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "react-hot-toast"; 
const ProductCard = ({ product, handleAddToCart }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [quantity, setQuantity] = useState(); 
  const handleClick = () => {
    if (!quantity || quantity < 1) {
      toast.error("Please enter a valid quantity before adding to list.");
      return;
    }
    handleAddToCart(product, quantity);
  };

  return (
    <div
      ref={ref}
      className={`border rounded-2xl p-3 shadow-sm flex flex-col justify-between h-64 transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div>
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-24 object-contain rounded-xl"
          />
        </div>
        <div className="mt-2">
          <h2 className="text-sm font-medium">{product.title}</h2>
          <p className="text-xs text-gray-500">{product.subheading}</p>
          <p className="text-sm font-semibold mt-1">₹{product.price}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <input
          type="number"
          min="1"
          value={quantity || ""}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Add Quantity"
          className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
        />
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-sm px-2 py-1 rounded font-semibold w-full"
          onClick={handleClick}
        >
          Add to list
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
