import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "./ProductCard";
import { RiCustomerService2Fill } from "react-icons/ri";
import FilterDrawer from "./FilterDrawer";

const categories = ["Machinery", "Spare Parts", "Brands", "Accessories"];

const ProductList = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { addToCart } = useCart();

  // ✅ useRef to track the selected category
  const selectedCategoryRef = useRef(null);

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
      console.log(data);
    } catch (error) {
      console.error("Error sending to backend:", error);
    }
  };

  // ✅ Updated to allow only one category selection
  const toggleCategory = (category) => {
    if (selectedCategoryRef.current === category) {
      // Deselect if already selected
      selectedCategoryRef.current = null;
      setSelectedCategories([]);
      setSelectedSubcategories([]);
    } else {
      selectedCategoryRef.current = category;
      setSelectedCategories([category]);
      setSelectedSubcategories([]); // Reset subcategories when category changes
    }
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
    <div>
      <div className="bg-[#013E70] text-[#000000] py-2 ">
        <div className="w-full mx-auto flex flex-row justify-center items-center gap-4">
          <nav className="w-full flex flex-nowrap justify-start sm:justify-center gap-2 relative scroll-width-none overflow-x-scroll sm:overflow-visible whitespace-nowrap px-4">
            {categories.map((name) => (
              <div key={name} className="relative flex-shrink-0 min-w-[40px] sm:min-w-fit">
                <button
                  onClick={() => toggleCategory(name)}
                  className={`w-full px-3 py-1 rounded text-[12px] font-medium transition-all duration-200
          ${selectedCategories.includes(name)
                      ? "bg-yellow-400 text-[#013E70]"
                      : "bg-white hover:bg-yellow-400 hover:text-[#000000]"}`}
                >
                  {name}
                </button>

                {selectedCategories.includes(name) && (
                  <div className="absolute left-0 top-full mt-1 w-40 bg-white shadow-md rounded overflow-hidden z-50">
                    {subcategories.map((subcat) => (
                      <button
                        key={subcat}
                        onClick={() => toggleSubcategory(subcat)}
                        className="block w-full text-left px-3 py-1 text-[12px] focus:bg-yellow-400"
                      >
                        {subcat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="relative flex-shrink-0 min-w-[40px] sm:min-w-fit">
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedSubcategories([]);
                  selectedCategoryRef.current = null;
                }}
                className={`w-full px-3 py-1 rounded text-[12px] transition-all duration-200
        ${selectedCategories.length === 0
                    ? "bg-yellow-400 text-black"
                    : "bg-white hover:bg-yellow-400 hover:text-black"}`}
              >
                All
              </button>
            </div>
          </nav>


          <div className="text-white font-semibold text-[12px] sm:text-base whitespace-nowrap hidden sm:flex sm:gap-1 absolute right-5">
            <RiCustomerService2Fill size={22} />
            <span className="font-bold">+91 9804611111</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between py-4 px-6 sm:hidden">
        <h1 className="font-medium text-xl">All List Items</h1>
        <span className="flex gap-2">
          Filter <img src="icons/filter.svg" alt="" onClick={() => setShowFilter(true)} />
        </span>
        
        <FilterDrawer isOpen={showFilter}
          onClose={() => setShowFilter(false)}
          categories={categories}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          subcategories={subcategories}
          selectedSubcategories={selectedSubcategories}
          toggleSubcategory={toggleSubcategory} />
      </div>


      <div className="md:flex gap-6 px-6 sm:mt-4">
        <div className="hidden md:block w-full md:w-1/4 lg:w-1/5 space-y-4">
          <h2 className="text-lg font-bold text-[#0D2F4B] mb-6">Category</h2>
          <div className="bg-[#12578c] text-white p-4 rounded-xl border border-[#003865]">
            {categories.map((item, i) => (
              <label
                key={i}
                className="flex items-center justify-between mb-3 text-[14px] font-semibold cursor-pointer"
              >
                {item}
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-[#003865] rounded"
                  checked={selectedCategories.includes(item)}
                  onChange={() => toggleCategory(item)}
                />
              </label>
            ))}
          </div>

          {subcategories.length > 0 && (
            <div className="bg-[#003865] text-white p-4 rounded-xl border border-[#003865]">
              <h3 className="text-lg font-semibold mb-2">Subcategories</h3>
              {subcategories.map((sub, i) => (
                <label
                  key={i}
                  className="flex items-center justify-between mb-3 text-[14px] font-semibold cursor-pointer"
                >
                  {sub}
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-[#003865] rounded"
                    checked={selectedSubcategories.includes(sub)}
                    onChange={() => toggleSubcategory(sub)}
                  />
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full sm:mt-13">
          {currentProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      <ul className="flex justify-center gap-1 text-gray-900 my-6">
        <li>
          <a
            href="#"
            className={`grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180 ${currentPage === 1 && "cursor-not-allowed"}`}
            onClick={() => handlePageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
          >
            ‹
          </a>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li key={index}>
            <a
              href="#"
              onClick={() => handlePageChange(index + 1)}
              className={`flex justify-center items-center size-8 rounded border border-gray-200 text-sm font-medium transition-colors hover:bg-gray-50 ${currentPage === index + 1 ? "bg-[#013E70] text-white" : "text-gray-900"}`}
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            className={`grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180 ${currentPage === totalPages && "cursor-not-allowed"}`}
            onClick={() => handlePageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
          >
            ›
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProductList;
