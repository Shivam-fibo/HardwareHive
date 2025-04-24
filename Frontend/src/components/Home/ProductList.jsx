import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "./ProductCard";

const categories = ["Machinery", "Spare Parts", "Brands", "Accessories"];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://hardware-hive.vercel.app/api/user/getallProduct");
        const data = await res.json();
        setProducts(data.reverse());
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (item, quantity) => {
    addToCart({ ...item, quantity });
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user?._id;
    console.log(userId)
    const cartItem = {
      productId: item._id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity,
      userId,
    };
  
    try {
      const res = await fetch("https://hardware-hive.vercel.app/api/user/addCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });
  
      const data = await res.json();
      console.log(data)
      console.log("Backend response:", data);
    } catch (error) {
      console.error("Error sending to backend:", error);
    }
  };
  
  
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleSubcategory = (sub) => {
    setSelectedSubcategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const filteredProducts = products
    .filter((product) =>
      selectedCategories.length > 0 ? selectedCategories.includes(product.category) : true
    )
    .filter((product) =>
      selectedSubcategories.length > 0
        ? selectedSubcategories.includes(product.subCategory)
        : true
    );

  const subcategories = [
    ...new Set(
      products
        .filter((p) => selectedCategories.includes(p.category))
        .map((p) => p.subCategory)
    ),
  ];

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      {/* --- Navigation Buttons Row --- */}
      <div className="flex flex-wrap justify-between items-center mt-4 mb-6 border-b pb-3">
        <nav className="flex flex-wrap gap-3">
          {categories.map((name) => (
            <button
              key={name}
              onClick={() => toggleCategory(name)}
              className={`px-4 py-1.5 rounded text-sm font-medium ${
                selectedCategories.includes(name)
                  ? "bg-[#013E70] text-white"
                  : "bg-[#0D2F4B] text-white hover:bg-[#013E70]"
              }`}
            >
              {name}
            </button>
          ))}
          <button
            onClick={() => {
              setSelectedCategories([]);
              setSelectedSubcategories([]);
            }}
            className={`px-4 py-1.5 rounded text-sm font-medium ${
              selectedCategories.length === 0
                ? "bg-[#013E70] text-white"
                : "bg-[#0D2F4B] text-white hover:bg-[#013E70]"
            }`}
          >
            All
          </button>
        </nav>
        <div className="text-[#0D2F4B] font-bold text-xl whitespace-nowrap">
          Contact No. +91 9804611111
        </div>
      </div>

      <div className="md:flex gap-6">
        {/* Sidebar */}
        <div className="hidden md:block w-full md:w-1/4 lg:w-1/5 space-y-4">
          <h2 className="text-xl font-bold text-[#0D2F4B]">Category</h2>
          <div className="bg-[#003865] text-white p-4 rounded-xl border border-blue-400">
            {categories.map((item, i) => (
              <label
                key={i}
                className="flex items-center justify-between mb-3 text-base font-semibold cursor-pointer"
              >
                {item}
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  checked={selectedCategories.includes(item)}
                  onChange={() => toggleCategory(item)}
                />
              </label>
            ))}
          </div>

          {subcategories.length > 0 && (
            <div className="bg-[#003865] text-white p-4 rounded-xl border border-blue-400">
              <h3 className="text-lg font-semibold mb-2">Subcategories</h3>
              {subcategories.map((sub, i) => (
                <label
                  key={i}
                  className="flex items-center justify-between mb-3 text-base font-semibold cursor-pointer"
                >
                  {sub}
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                    checked={selectedSubcategories.includes(sub)}
                    onChange={() => toggleSubcategory(sub)}
                  />
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {currentProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <ul className="flex justify-center gap-1 text-gray-900 mt-6">
        <li>
          <a
            href="#"
            className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            ‹
          </a>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li key={index}>
            <a
              href="#"
              onClick={() => handlePageChange(index + 1)}
              className={`block size-8 rounded border border-gray-200 text-center  text-sm font-medium transition-colors hover:bg-gray-50 ${
                currentPage === index + 1 ? "bg-[#013E70] text-white" : "text-gray-900"
              }`}
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            ›
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProductList;
