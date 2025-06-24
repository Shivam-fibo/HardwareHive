// ProductModal.tsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [addedProductIds, setAddedProductIds] = useState(new Set());

  if (!product) return null;

 
  const handleAddToCart = async (item, quantity) => {
    console.log("first")
      if (addedProductIds.has(item._id)) {
    toast.error("Product already added to cart");
    return;
  }

    addToCart({ ...item, quantity });
   setAddedProductIds(prev => new Set(prev).add(item._id));
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user?._id;
    const cartItem = {
      productId: item._id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity,
      userId,
    };

    try {
      const res = await fetch("https://hardware-hive-backend.vercel.app/api/user/addCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error sending to backend:", error);
    }
  };


  return (
    <div className="fixed inset-0 z-50  mx-auto my-auto w-150 h-100 flex items-center justify-center bg-trasnparent bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 flex gap-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-1/2 h-auto object-contain border rounded-lg" 
        />
        
        <div className="flex flex-col w-1/2">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-gray-500 text-sm mt-1">{product.subheading}</p>
          <p className="text-sm mt-4">
            {product.description || "No description available."}
          </p>
          <p className="text-xl font-semibold mt-4">₹{product.price}</p>
          
          <div className="flex gap-2 mt-6">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-gray-300 rounded px-3 py-2 w-20"
            />
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`px-4 py-2 rounded font-semibold ${
                isAdded
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500 text-black"
              }`}
            >
              {isAdded ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;