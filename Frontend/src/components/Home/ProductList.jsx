import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://hardware-hive.vercel.app/api/user/getallProduct");
        const data = await response.json();
        setProducts(data);
        console.log("Fetched products:", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log("Adding product to cart:", product);
    addToCart(product);
  };

  const toggleHeart = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };


  return (
    <div className="p-4 md:flex gap-6">
      {/* Sidebar */}
      <div className="hidden md:block w-full md:w-1/4 lg:w-1/5 space-y-4">
        <h2 className="text-xl font-bold text-[#0D2F4B]">Category</h2>
  
        <div className="bg-[#003865] text-white p-4 rounded-xl border border-blue-400">
          {["Machinery", "Spare Parts", "Brands", "Accessories"].map((item, i) => (
            <label key={i} className="flex items-center justify-between mb-3 text-base font-semibold">
              {item}
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded" />
            </label>
          ))}
        </div>
  
        <div className="bg-[#003865] text-white p-4 rounded-xl border border-blue-400">
          {Array(5).fill("Category 1").map((cat, i) => (
            <p key={i} className="mb-2 text-base font-semibold">{cat}</p>
          ))}
        </div>
      </div>
  
      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {products.map((product) => (
          <div key={product._id} className="border rounded-2xl p-3 shadow-sm flex flex-col justify-between h-64">
          <div>
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-24 object-contain rounded-xl"
              />
              <button
                onClick={() => toggleHeart(product._id)}
                className={`absolute bottom-2 right-2 text-lg ${
                  wishlist[product._id] ? "text-red-500" : "text-black"
                }`}
              >
                {wishlist[product._id] ? <FaHeart /> : <FaRegHeart />}
              </button>
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
              placeholder="Add Quantity"
              className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
            />
            <button className="bg-yellow-400 hover:bg-yellow-500 text-sm px-2 py-1 rounded font-semibold w-full"
              onClick={() => handleAddToCart(product)}
            >
              Add to list
            </button>
          </div>
        </div>
        
        ))}
      </div>
    </div>
  );
  
};

export default ProductList;