import { useEffect, useState } from "react";

const DisplayImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://hardware-hive-backend.vercel.app/api/showAllProduct/images");
        const data = await response.json();
        if (response.ok) {
          setImages(data);
        } else {
          console.error("Failed to fetch images:", data.error);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
<div className="min-h-screen p-6 bg-gray-800 text-gray-200">
  <div className="max-w-6xl mx-auto">
    <div className="mb-8">
      <h2 className="text-2xl text-center font-bold text-gray-200">
        All Products
      </h2>
    </div>

    {images.length === 0 ? (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-400">No image</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <div 
            key={index} 
            className="bg-gray-700 rounded-lg shadow-md overflow-hidden flex items-center justify-center w-40 h-40 mx-auto"
          >
            <img 
              src={img.url} 
              alt={`Product ${index + 1}`} 
              className="w-full h-full object-contain" 
            />
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  );
};

export default DisplayImages;