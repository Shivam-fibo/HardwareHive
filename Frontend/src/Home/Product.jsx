import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://hardwarehive-backend.onrender.com/api/upload/getallProduct");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="col-span-3 text-center">No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow-md">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded cursor-pointer" />
              </Link>
              <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
              <p className="text-gray-600">{product.subheading}</p>
              <p className="text-blue-500 font-bold">₹{product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
