import { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/upload/getallProduct");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div key={product._id} className="border rounded-lg p-4 shadow-md">
          <img src={product.image} alt={product.title} className="w-full h-40 object-cover" />
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-500">{product.subheading}</p>
          <p className="text-xl font-bold">₹{product.price}</p>
          <button className="mt-2 bg-yellow-400 px-4 py-2 rounded">Add to List</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
