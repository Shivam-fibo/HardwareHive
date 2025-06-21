import { useEffect, useState } from "react";
import { toast } from "react-hot-toast"; // Importing toast
import Footer from '../Module/Footer';
import { useNavigate } from "react-router-dom";
const ProductGallery = () => {
  const [products, setProducts] = useState({});
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://hardware-hive-backend.vercel.app/api/user/getallShowProduct"
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
    <div>

      <div className="h-12">
        <header
          className="w-full h-full flex justify-between items-center p-2 bg-white cursor-pointer"
        >
          <img
            src="/logo/ss_power_tool_logo.svg"
            width={"150px"}
            className="sm:ml-6"
            alt="SS Power Tools Logo"
              onClick={ () => {navigate("/"); console.log("cliekd")}}
          />
          <div className="flex gap-1 text-nowrap font-semibold text-[16px] text-right sm:mr-6">
            <img src="icons/customer-service.svg" alt="" /><p> +91 9804611111</p>
          </div>
        </header>
      </div>


      {/* Page Title */}
      <h1 className="text-center bg-[#013E70] text-white py-1.5 text-2xl font-semibold mb-8">
        Products
      </h1>

      {/* Products Grid */}
      <div className="px-4 sm:px-10" onClick={handleClick}>
        {Object.keys(products).map((category) => (
          <div key={category} className="mb-8">
            {/* Category Title */}
            <div className="flex items-center mb-4">
              <div
                className="bg-[#013E70] w-38 sm:w-52 text-white text-base sm:text-[16px] font-bold px-6 sm:px-10 py-1"
                style={{
                  clipPath: "polygon(0 0, 85% 0, 100% 100%, 0% 100%)",
                }}
              >
                {category}
              </div>
            </div>

            {/* Responsive Image Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
              {Array.isArray(products[category]) &&
                products[category].map((item, idx) => (
                  <div
                    key={idx}
                    className="border-[2px] border-black flex items-center justify-center p-2 w-full aspect-square"
                  >
                    <img
                      src={item.url}
                      alt={`${category} product`}
                      className="object-con`tain w-full h-full"
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>

  );
};

export default ProductGallery;
