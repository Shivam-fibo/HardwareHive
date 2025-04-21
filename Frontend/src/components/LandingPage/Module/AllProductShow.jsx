import { useEffect, useState } from "react";

const ProductGallery = () => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://hardware-hive.vercel.app/api/user/getallShowProduct");
        const data = await res.json();
        console.log(data)
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

  return (
    <div className="p-4">
      <h1 className="text-center text-3xl font-bold mb-6">Products</h1>
      {Object.keys(products).map(category => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold bg-blue-900 text-white inline-block px-4 py-1 rounded">
            {category}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-3">
            {Array.isArray(products[category]) &&
              products[category].map((item, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={item.url}
                    alt={`${category} product`}
                    className="border border-gray-300 p-1 w-full"
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGallery;
