import { useEffect, useState } from "react";
import { toast } from "react-hot-toast"; // Importing toast
import Header from "./Header";

const ProductGallery = () => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://hardware-hive.vercel.app/api/user/getallShowProduct"
        );
        const data = await res.json();

        // Group images by category
        const groupedProducts = data.reduce((acc, item) => {
          const { category, url } = item;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push({ url });
          return acc;
        }, {});

        setProducts(groupedProducts);
      } catch (err) {
        console.error("Error loading images:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleClick = () => {
    toast("Please log in or register to proceed!", {
      icon: '⚠️', // You can choose any icon here
      style: {
        background: '#ff7f7f',
        color: '#fff',
      },
    });
  };

  return (
    <div onClick={handleClick}> {/* Adding onClick to trigger the toast */}
      <div
        className="absolute top-0 left-0 w-full flex justify-between items-center p-1 bg-white cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/logo/ss_power_tool_logo.png" width={"180px"} />
        <div className="font-semibold text-sm">Contact No. +91 9804611111 </div>
      </div>

      {/* Adjusted margin-top to ensure h1 is not hidden by the header */}
      <h1 className="text-center bg-[#013E70] text-white py-2 text-3xl font-bold mb-8 mt-24">
        Products
      </h1>

      <div className="mx-10">
        {Object.keys(products).map((category) => (
          <div key={category} className="mb-12">
            {/* Title bar like the image */}
            <div className="flex items-center mb-4">
              <div
                className="bg-[#013E70] text-white text-lg font-bold px-10 py-1"
                style={{
                  clipPath: "polygon(0 0, 85% 0, 100% 100%, 0% 100%)",
                }}
              >
                {category}
              </div>
            </div>

            {/* Grid of images */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.isArray(products[category]) &&
                products[category].map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-black flex items-center justify-center p-2 w-full aspect-square"
                  >
                    <img
                      src={item.url}
                      alt={`${category} product`}
                      className="object-contain w-full h-full"
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
