import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, debugCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/upload/getallProduct");
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


  return (
    <div className="p-4">
      
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-md">
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
            <p className="text-gray-500">{product.subheading}</p>
            <p className="text-xl font-bold mt-2">₹{product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-2 bg-yellow-400 px-4 py-2 rounded-md font-semibold w-full"
            >
              Add to List
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;