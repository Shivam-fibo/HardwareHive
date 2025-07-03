import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "./ProductCard";
import FilterDrawer from "./FilterDrawer";
import ProductModal from "./ProductModel";
import { toast } from "react-hot-toast";
import { moveToCart } from "../hooks/moveToCart";
import CategoryCard from "./CategoryCard";

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
  const [showAllProducts, setShowAllProducts] = useState(true); // New state for "All Item" selection
  const itemsPerPage = 20;
  
  // New states for category/subcategory management
  const [categories, setCategories] = useState([]);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [selectedCategoryForSub, setSelectedCategoryForSub] = useState(null);
  const [showProducts, setShowProducts] = useState(false);
  const [selectedSubcategoryForProducts, setSelectedSubcategoryForProducts] = useState(null);

  const { addToCart, refreshCartCount } = useCart();

  // useRef to track the selected category
  const selectedCategoryRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const startTime = Date.now();

      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?._id;

        // Fetch all data in parallel
        const [productsRes, cartRes, savedRes, categoriesRes] = await Promise.all([
          fetch("https://hardware-hive-backend.vercel.app/api/user/getallProduct"),
          fetch(`https://hardware-hive-backend.vercel.app/api/user/getCartItems/${userId}`),
          fetch(`https://hardware-hive-backend.vercel.app/api/user/savedItems/${userId}`),
          fetch("https://hardware-hive-backend.vercel.app/api/admin/categories")
        ]);

        const [productsData, cartData, savedData, categoriesData] = await Promise.all([
          productsRes.json(),
          cartRes.json(),
          savedRes.json(),
          categoriesRes.json()
        ]);

        setProducts(productsData.reverse());
        setCategories(categoriesData);

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

  const toggleCategory = (category) => {
    if (selectedCategoryRef.current === category) {
      // Reset to show all products
      resetToAllProducts();
    } else {
      selectedCategoryRef.current = category;
      setSelectedCategories([category]);
      setSelectedSubcategories([]);
      setShowSubcategories(true);
      setShowProducts(false);
      setShowAllProducts(false);
      setSelectedCategoryForSub(categories.find(cat => cat.name === category));
      setSelectedSubcategoryForProducts(null);
      setCurrentPage(1);
    }
  };

  const toggleSubcategory = (sub) => {
    setSelectedSubcategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const resetToAllProducts = () => {
    selectedCategoryRef.current = null;
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setShowSubcategories(false);
    setShowProducts(false);
    setShowAllProducts(true);
    setSelectedCategoryForSub(null);
    setSelectedSubcategoryForProducts(null);
    setCurrentPage(1);
  };

  // Handle category card click to show subcategories
  const handleCategoryCardClick = (categoryName) => {
    const selectedCategory = categories.find(cat => cat.name === categoryName);
    if (selectedCategory) {
      setSelectedCategoryForSub(selectedCategory);
      setSelectedCategories([categoryName]);
      setShowSubcategories(true);
      setShowProducts(false);
      setShowAllProducts(false);
      setSelectedSubcategoryForProducts(null);
      setCurrentPage(1);
    }
  };

  // Handle subcategory card click to show products
  const handleSubcategoryCardClick = (subcategory) => {
    setSelectedSubcategoryForProducts(subcategory);
    setShowSubcategories(false);
    setShowProducts(true);
    setShowAllProducts(false);
    setCurrentPage(1);
  };

  // Handle "Show all [category] products" click
  const handleShowAllCategoryProducts = () => {
    if (selectedCategoryForSub) {
      setShowSubcategories(false);
      setShowProducts(true);
      setShowAllProducts(false);
      setSelectedSubcategoryForProducts(null);
      setCurrentPage(1);
    }
  };

  const filteredProducts = products
    .filter((product) =>
      selectedCategories.length > 0 ? selectedCategories.includes(product.categoryId?.name) : true
    )
    .filter((product) =>
      selectedSubcategories.length > 0
        ? selectedSubcategories.includes(product.subCategoryId?.name)
        : true
    );

  // Filter products for selected subcategory
  const subcategoryFilteredProducts = selectedSubcategoryForProducts 
    ? products.filter(product => product.subCategoryId?._id === selectedSubcategoryForProducts._id)
    : [];

  // Filter products for selected category (all products in that category)
  const categoryFilteredProducts = selectedCategoryForSub && showProducts && !selectedSubcategoryForProducts
    ? products.filter(product => product.categoryId?._id === selectedCategoryForSub._id)
    : [];

  const subcategories = [
    ...new Set(
      products
        .filter((p) => selectedCategories.includes(p.categoryId?.name))
        .map((p) => p.subCategoryId?.name)
        .filter(Boolean)
    ),
  ];

  // Determine which products to show
  const getProductsToShow = () => {
    if (showAllProducts) {
      return products;
    } else if (showProducts && selectedSubcategoryForProducts) {
      return subcategoryFilteredProducts;
    } else if (showProducts && selectedCategoryForSub && !selectedSubcategoryForProducts) {
      return categoryFilteredProducts;
    } else if (selectedCategories.length > 0 || selectedSubcategories.length > 0) {
      return filteredProducts;
    }
    return products;
  };

  const productsToShow = getProductsToShow();
  const totalPages = Math.ceil(productsToShow.length / itemsPerPage);
  const currentProducts = productsToShow.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleBreadcrumbClick = (level) => {
    if (level === 'shop') {
      resetToAllProducts();
    } else if (level === 'category') {
      if (selectedCategoryForSub) {
        setShowSubcategories(true);
        setShowProducts(false);
        setSelectedSubcategoryForProducts(null);
        setCurrentPage(1);
      }
    } else if (level === 'subcategory') {
      setShowProducts(false);
      setShowSubcategories(true);
      setSelectedSubcategoryForProducts(null);
      setCurrentPage(1);
    }
  };

  const getBreadcrumbItems = () => {
    const items = [{ label: 'Shop All', level: 'shop' }];

    if (selectedCategoryForSub) {
      items.push({ label: selectedCategoryForSub.name, level: 'category' });
    }

    if (selectedSubcategoryForProducts && showProducts) {
      items.push({ label: selectedSubcategoryForProducts.name, level: 'subcategory' });
    }

    return items;
  };

  useEffect(() => {
    if (showFilter) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

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
          categories={categories.map(cat => cat.name)}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          subcategories={subcategories}
          selectedSubcategories={selectedSubcategories}
          toggleSubcategory={toggleSubcategory} />
      </div>

      <div className="md:flex gap-6 px-6 sm:mt-4">
        <div className="hidden md:block w-full md:w-1/4 lg:w-1/5 space-y-4">
          <div className="bg-[#12578c] text-white p-2 rounded-xl border border-[#003865]">
            <label className="flex items-center justify-between text-[14px] font-semibold cursor-pointer">
              All Item
              <input
                type="checkbox"
                className="form-checkbox h-5 w-8 accent-amber-50 rounded"
                checked={showAllProducts}
                onChange={() => resetToAllProducts()}
              />
            </label>
          </div>

          <div className="bg-[#12578c] text-white p-4 rounded-xl border border-[#003865]">
            {categories.map((category, i) => {
              const isChecked = selectedCategories.includes(category.name);

              return (
                <label
                  key={i}
                  className="flex items-center justify-between mb-3 text-[14px] font-semibold cursor-pointer"
                >
                  {category.name}
                  <input
                    type="checkbox"
                    className={`h-5 w-5 rounded border-2 ${isChecked ? 'accent-amber-50 border-amber-50' : 'accent-red-500 border-red-500'}`}
                    checked={isChecked}
                    onChange={() => toggleCategory(category.name)}
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
          <div className="w-full mt-2 mb-6.5 ml-4 hidden md:block">
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

          {/* Show subcategory cards when a category is selected */}
          {showSubcategories && selectedCategoryForSub && (
            <div className="w-full">
              {/* Show all products button for the selected category */}
              
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {selectedCategoryForSub.subcategories.map((subcategory) => (
                  <CategoryCard
                    key={subcategory._id}
                    category={subcategory.name}
                    image={subcategory.image}
                    onClick={() => handleSubcategoryCardClick(subcategory)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Show products when "All Item" is selected, or when viewing products from category/subcategory */}
          {(showAllProducts || showProducts) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full sm:mt-0">
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
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <ul className="flex justify-center gap-1 text-gray-900 my-10">
          <li>
            <a
              href="#"
              className={`grid size-8 place-content-center rounded border border-black transition-colors rtl:rotate-180 ${currentPage === 1 && "pointer-events-none"}`}
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
              className={`grid size-8 place-content-center rounded border border-black transition-colors rtl:rotate-180 ${currentPage === totalPages && "pointer-events-none"}`}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-disabled={currentPage === totalPages}
            >
              ›
            </a>
          </li>
        </ul>
      )}

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