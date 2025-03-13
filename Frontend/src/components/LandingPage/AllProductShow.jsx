import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DisplayImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://hardware-hive.vercel.app/api/showAllProduct/images");
        const data = await response.json();
        console.log("recived data is", data)
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

  const navigate = useNavigate()

  return (
<div className="min-h-screen  bg-gray-800 text-gray-200">

<nav className="flex justify-between items-center text-xl sm:text-3xl font-bold text-white p-4">
  <div className="sm:text-yellow-200 text-yellow-100 cursor-pointer" onClick={() => navigate("/")}>SS POWER TOOL</div>
  

  
  <div className="w-24"></div>
</nav>

    <div className="mb-8">
    <h2 className="text-3xl font-bold underline sm:text-yellow-200 text-yellow-100 flex-1 text-center">
    PRODUCT
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
            className="bg-gray-700 rounded-lg shadow-md overflow-hidden flex items-center justify-center  mx-auto"
          >
            <img 
              src={img.url} 
              alt={`Product ${index + 1}`} 
              className="w-40 h-40 object-contain" 
            />
          </div>
        ))}
      </div>
    )}
  </div>


  );
};

export default DisplayImages;