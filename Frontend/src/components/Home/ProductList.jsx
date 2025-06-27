import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "./ProductCard";
import { RiCustomerService2Fill } from "react-icons/ri";
import FilterDrawer from "./FilterDrawer";
import ProductModal from "./ProductModel";
import { toast } from "react-hot-toast";
import { moveToCart } from "../hooks/moveToCart";
import Header from "./Nabar";
const categories = ["Machinery", "Spare Parts", "Brands", "Accessories"];

const ProductList = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedProductIds, setAddedProductIds] = useState(new Set());
  const [savedForLaterIds, setSavedForLaterIds] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
  const [minimumLoadTimePassed, setMinimumLoadTimePassed] = useState(false);
  const itemsPerPage = 20;

  const { addToCart, refreshCartCount } = useCart();

  //  useRef to track the selected category
  const selectedCategoryRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const startTime = Date.now();
      
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?._id;

        // Fetch all data in parallel
        const [productsRes, cartRes, savedRes] = await Promise.all([
          fetch("https://hardware-hive-backend.vercel.app/api/user/getallProduct"),
          fetch(`https://hardware-hive-backend.vercel.app/api/user/getCartItems/${userId}`),
          fetch(`https://hardware-hive-backend.vercel.app/api/user/savedItems/${userId}`)
        ]);

        const [productsData, cartData, savedData] = await Promise.all([
          productsRes.json(),
          cartRes.json(),
          savedRes.json()
        ]);

        setProducts(productsData.reverse());

        if (cartData?.items) {
          const alreadyAdded = new Set(cartData.items.map(item => item.productId));
          setAddedProductIds(alreadyAdded);
        }

        if (savedData?.savedItems) {
          const savedIds = new Set(savedData.savedItems.map(item => item.productId));
          setSavedForLaterIds(savedIds);
        }

        refreshCartCount();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(100 - elapsed, 0);
        
        setTimeout(() => {
          setMinimumLoadTimePassed(true);
          setIsLoading(false);
        }, remainingTime);
      }
    };

    fetchData();
  }, [refreshCartCount]);

  const handleAddToCart = async (item, quantity) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    console.log(item, item.id)
    if (addedProductIds.has(item._id)) {
      toast.error("Product already added to cart");
      return;
    }
    if (savedForLaterIds.has(item._id)) {
      console.log("Item is saved for later, moving to cart");
      await moveToCart(item._id, userId);
      toast.success("Moved from saved items to cart");
      setSavedForLaterIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(item._id);
        return newSet;
      });
      setAddedProductIds(prev => new Set(prev).add(item._id));
      refreshCartCount();
      return;
    }


    addToCart({ ...item, quantity });

    setAddedProductIds(prev => new Set(prev).add(item._id));

    const cartItem = {
      productId: item._id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity,
      userId,
    };

    try {
      const res = await fetch("https://hardware-hive-backend.vercel.app/api/user/addCart", {
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

  //  Updated to allow only one category selection
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

  //  Breadcrumb click handlers
  const handleBreadcrumbClick = (level) => {
    if (level === 'shop') {
      // Reset to show all products
      selectedCategoryRef.current = null;
      setSelectedCategories([]);
      setSelectedSubcategories([]);
    } else if (level === 'category') {
      // Keep category but reset subcategories
      setSelectedSubcategories([]);
    }
  };

  //  Generate breadcrumb items
  const getBreadcrumbItems = () => {
    const items = [{ label: 'Shop All', level: 'shop' }];

    if (selectedCategories.length > 0) {
      items.push({ label: selectedCategories[0], level: 'category' });
    }

    if (selectedSubcategories.length > 0) {
      selectedSubcategories.forEach(sub => {
        items.push({ label: sub, level: 'subcategory' });
      });
    }

    return items;
  };

  useEffect(() => {
    // Prevent body scrolling when filter drawer is open on mobile
    if (showFilter) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showFilter]);


  if (isLoading || !minimumLoadTimePassed) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
     
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div
              className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#013F71] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <p className="mt-4 text-xl font-medium text-[#013F71]">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6]">


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

          <div className="bg-[#12578c] text-white p-2 rounded-xl  border border-[#003865]">
            <label
              className="flex items-center justify-between  text-[14px] font-semibold cursor-pointer"
            >
              All Item
              <input
                type="checkbox"
                className="form-checkbox h-5 w-8 accent-amber-50 rounded"
                checked={selectedCategories.length === 0}
                onChange={() => {
                  setSelectedCategories([]);
                  setSelectedSubcategories([]);
                  selectedCategoryRef.current = null;
                }}
              />
            </label>
          </div>

          <div className="bg-[#12578c] text-white p-4 rounded-xl border border-[#003865] ">
            {categories.map((item, i) => {
              const isChecked = selectedCategories.includes(item);

              return (
                <label
                  key={i}
                  className="flex items-center justify-between mb-3 text-[14px] font-semibold cursor-pointer"
                >
                  {item}
                  <input
                    type="checkbox"
                    className={`h-5 w-5 rounded border-2 ${isChecked ? 'accent-amber-50 border-amber-50' : 'accent-red-500 border-red-500'
                      }`}
                    checked={isChecked}
                    onChange={() => toggleCategory(item)}
                  />
                </label>
              );
            })}

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

        <div className="w-full">

          <div className="w-full mt-2 mb-6.5  ml-4 hidden md:block">
            <nav className="flex items-center flex-wrap text-sm text-black">
              {getBreadcrumbItems().map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-2">{'>'}</span>
                  )}
                  <button
                    onClick={() => handleBreadcrumbClick(item.level)}
                    className={`transition-colors duration-200 ${index === getBreadcrumbItems().length - 1
                      ? 'font-semibold cursor-default'
                      : 'hover:text-[#013E70] hover:underline'
                      }`}
                    disabled={index === getBreadcrumbItems().length - 1}
                  >
                    {item.label}
                  </button>
                </div>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4  w-full sm:mt-0">
            {currentProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                handleAddToCart={handleAddToCart}
                isSavedForLater={savedForLaterIds.has(product._id)}
                isAdded={addedProductIds.has(product._id)}
                onViewDetails={() => {
                  setSelectedProduct(product);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <ul className="flex justify-center gap-1 text-gray-900 my-10">
        <li>
          <a
            href="#"
            className={`grid size-8 place-content-center rounded border border-black transition-colors  rtl:rotate-180 ${currentPage === 1 && "pointer-events-none"}`}
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
              className={`flex justify-center items-center size-8 rounded border text-sm font-medium ${currentPage === index + 1 ? "bg-[#013E70] text-white" : ""}`}
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            className={`grid size-8 place-content-center rounded border border-black transition-colors  rtl:rotate-180 ${currentPage === totalPages && "pointer-events-none"}`}
            onClick={() => handlePageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
          >
            ›
          </a>
        </li>
      </ul>

      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}


    </div>
  );
};

export default ProductList;