import Footer from "../Home/Footer";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ProductGrid() {
    const images = Array.from({ length: 15 }, (_, i) => `/images/img${i + 1}.jpg`);
    useEffect(() => {
      const handleClick = () => {
        toast.error("Please login or register first!");
      };
  
      document.addEventListener("click", handleClick);
  
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }, []);
    return (
        <div className="p-6 bg-gray-900">
          
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-100 mb-6">Our Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200"
          >
            <img
              src={src}
              alt={`Product ${index + 1}`}
              className="w-full h-32 sm:h-40 object-cover border-b border-gray-700"
            />
          </div>
        ))}
      </div>
      <Footer mt="mt-10" />
    </div>
    );
  }
  