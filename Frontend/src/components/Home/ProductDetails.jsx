import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://hardware-hive.vercel.app/api/upload/getProduct/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading product details...</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img src={product.image} alt={product.title} className="w-full h-80 object-cover rounded" />
      <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
      <p className="text-gray-600">{product.subheading}</p>
      <p className="text-blue-500 font-bold text-xl">₹{product.price}</p>
      <div className="mt-4 flex gap-4">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">Add to Cart</button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductDetails;
