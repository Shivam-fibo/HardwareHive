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
  const [showAllProducts, setShowAllProducts] = useState(true);
  const itemsPerPage = 10
  
  // New states for category/subcategory/brand management
  const [categories, setCategories] = useState([]);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [selectedCategoryForSub, setSelectedCategoryForSub] = useState(null);
  const [showProducts, setShowProducts] = useState(false);
  const [selectedSubcategoryForProducts, setSelectedSubcategoryForProducts] = useState(null);
  // New state to track if we're showing filtered subcategories
  const [showFilteredSubcategories, setShowFilteredSubcategories] = useState(false);
  const [filteredSubcategoryId, setFilteredSubcategoryId] = useState(null);
  
  // New states for brand management
  const [showBrands, setShowBrands] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showBrandProducts, setShowBrandProducts] = useState(false);

  // New state for product details in breadcrumb
  const [selectedProductForBreadcrumb, setSelectedProductForBreadcrumb] = useState(null);

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

  // Effect to auto-select subcategory when showing brand products
  useEffect(() => {
    if (showBrandProducts && selectedBrand && selectedCategoryForSub) {
      // Find the subcategory that contains products of the selected brand
      const brandProducts = products.filter(product => 
        product.brandId?._id === selectedBrand._id &&
        product.categoryId?._id === selectedCategoryForSub._id
      );

      if (brandProducts.length > 0) {
        const subcategoryName = brandProducts[0].subCategoryId?.name;
        if (subcategoryName && !selectedSubcategories.includes(subcategoryName)) {
          setSelectedSubcategories([subcategoryName]);
        }
      }
    }
  }, [showBrandProducts, selectedBrand, selectedCategoryForSub, products]);

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
      // Show brands directly instead of subcategories
      setShowBrands(true);
      setShowSubcategories(false);
      setShowProducts(false);
      setShowAllProducts(false);
      setShowFilteredSubcategories(false);
      setFilteredSubcategoryId(null);
      setSelectedCategoryForSub(categories.find(cat => cat.name === category));
      setSelectedSubcategoryForProducts(null);
      setSelectedBrand(null);
      setShowBrandProducts(false);
      setSelectedProductForBreadcrumb(null);
      setCurrentPage(1);
    }
  };

 const toggleSubcategory = (sub) => {
  setSelectedSubcategories([sub]); 

  const selectedSubcategoryObj = selectedCategoryForSub?.subcategories.find(
    (subcategory) => subcategory.name === sub
  );

  if (selectedSubcategoryObj) {
    setSelectedSubcategoryForProducts(selectedSubcategoryObj);
    // Show brands directly instead of showing filtered subcategories
    setShowBrands(true);
    setShowFilteredSubcategories(false);
    setShowSubcategories(false);
    setShowProducts(false);
    setShowAllProducts(false);
    // Reset brand states
    setSelectedBrand(null);
    setShowBrandProducts(false);
    setSelectedProductForBreadcrumb(null);
    setCurrentPage(1);
  } else {
    // Fallback in case subcategory not found (shouldn't normally happen)
    setShowFilteredSubcategories(false);
    setSelectedSubcategoryForProducts(null);
  }
};

  const resetToAllProducts = () => {
    selectedCategoryRef.current = null;
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setShowSubcategories(false);
    setShowProducts(false);
    setShowAllProducts(true);
    setShowFilteredSubcategories(false);
    setFilteredSubcategoryId(null);
    setSelectedCategoryForSub(null);
    setSelectedSubcategoryForProducts(null);
    // Reset brand states
    setShowBrands(false);
    setSelectedBrand(null);
    setShowBrandProducts(false);
    setSelectedProductForBreadcrumb(null);
    setCurrentPage(1);
  };

  // Handle category card click to show brands directly
  const handleCategoryCardClick = (categoryName) => {
    const selectedCategory = categories.find(cat => cat.name === categoryName);
    if (selectedCategory) {
      setSelectedCategoryForSub(selectedCategory);
      setSelectedCategories([categoryName]);
      setShowBrands(true);
      setShowSubcategories(false);
      setShowProducts(false);
      setShowAllProducts(false);
      setShowFilteredSubcategories(false);
      setFilteredSubcategoryId(null);
      setSelectedSubcategoryForProducts(null);
      setSelectedBrand(null);
      setShowBrandProducts(false);
      setSelectedProductForBreadcrumb(null);
      setCurrentPage(1);
    }
  };

  // Modified: Handle subcategory card click to show brands instead of products
  const handleSubcategoryCardClick = (subcategory) => {
    setSelectedSubcategoryForProducts(subcategory);
    setShowBrands(true);
    setShowFilteredSubcategories(false);
    setShowSubcategories(false);
    setShowProducts(false);
    setShowAllProducts(false);
    setShowBrandProducts(false);
    setSelectedBrand(null);
    setSelectedProductForBreadcrumb(null);
    setCurrentPage(1);
  };

  // Modified: Handle brand card click to show products for that brand
  const handleBrandCardClick = (brand) => {
    setSelectedBrand(brand);
    setShowBrandProducts(true);
    setShowBrands(false);
    setShowProducts(false);
    setShowFilteredSubcategories(false);
    setShowSubcategories(false);
    setShowAllProducts(false);
    setSelectedProductForBreadcrumb(null);
    setCurrentPage(1);
  };

  // Handle "Show all [category] products" click
  const handleShowAllCategoryProducts = () => {
    if (selectedCategoryForSub) {
      setShowSubcategories(false);
      setShowProducts(true);
      setShowAllProducts(false);
      setShowFilteredSubcategories(false);
      setFilteredSubcategoryId(null);
      setSelectedSubcategoryForProducts(null);
      // Reset brand states
      setShowBrands(false);
      setSelectedBrand(null);
      setShowBrandProducts(false);
      setSelectedProductForBreadcrumb(null);
      setCurrentPage(1);
    }
  };

  // Enhanced function to handle product click for breadcrumb
  const handleProductClick = (product) => {
    setSelectedProductForBreadcrumb(product);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Get unique brands for selected category
  const getBrandsForCategory = () => {
    if (!selectedCategoryForSub) return [];
    
    const brandsMap = new Map();
    products
      .filter(product => product.categoryId?._id === selectedCategoryForSub._id)
      .forEach(product => {
        if (product.brandId) {
          brandsMap.set(product.brandId._id, product.brandId);
        }
      });
    
    return Array.from(brandsMap.values());
  };

  // Get unique brands for selected subcategory
  const getBrandsForSubcategory = () => {
    if (!selectedSubcategoryForProducts) return [];
    
    const brandsMap = new Map();
    products
      .filter(product => product.subCategoryId?._id === selectedSubcategoryForProducts._id)
      .forEach(product => {
        if (product.brandId) {
          brandsMap.set(product.brandId._id, product.brandId);
        }
      });
    
    return Array.from(brandsMap.values());
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

  // Modified: Filter products for selected brand within the selected category/subcategory
  const brandFilteredProducts = selectedBrand && selectedCategoryForSub
    ? products.filter(product => {
        const categoryMatch = product.categoryId?._id === selectedCategoryForSub._id;
        const brandMatch = product.brandId?._id === selectedBrand._id;
        
        // If we also have a selected subcategory, filter by that too
        if (selectedSubcategoryForProducts) {
          const subcategoryMatch = product.subCategoryId?._id === selectedSubcategoryForProducts._id;
          return categoryMatch && brandMatch && subcategoryMatch;
        }
        
        return categoryMatch && brandMatch;
      })
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
    } else if (showBrandProducts && selectedBrand) {
      return brandFilteredProducts;
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
        setShowBrands(true);
        setShowSubcategories(false);
        setShowProducts(false);
        setShowFilteredSubcategories(false);
        setShowBrandProducts(false);
        setSelectedSubcategoryForProducts(null);
        setSelectedBrand(null);
        setSelectedProductForBreadcrumb(null);
        setCurrentPage(1);
      }
    } else if (level === 'subcategory') {
      if (selectedSubcategoryForProducts) {
        setShowBrands(true);
        setShowBrandProducts(false);
        setShowProducts(false);
        setShowFilteredSubcategories(false);
        setShowSubcategories(false);
        setSelectedBrand(null);
        setSelectedProductForBreadcrumb(null);
        setCurrentPage(1);
      }
    } else if (level === 'brand') {
      if (selectedBrand) {
        setShowBrandProducts(true);
        setShowBrands(false);
        setShowProducts(false);
        setShowFilteredSubcategories(false);
        setShowSubcategories(false);
        setSelectedProductForBreadcrumb(null);
        setCurrentPage(1);
      }
    }
  };

  const getBreadcrumbItems = () => {
    const items = [{ label: 'Shop All', level: 'shop' }];

    if (selectedCategoryForSub) {
      items.push({ label: selectedCategoryForSub.name, level: 'category' });
    }

    if (selectedSubcategoryForProducts) {
      items.push({ label: selectedSubcategoryForProducts.name, level: 'subcategory' });
    }

    if (selectedBrand) {
      // Enhanced brand breadcrumb with product details
      const brandDetails = [];
      
      // Add brand name
      brandDetails.push(selectedBrand.name);
      
      // Add productId if available
      if (selectedBrand.productId) {
        brandDetails.push(` ${selectedBrand.productId}`);
      }
      
      // Add model if available
      if (selectedBrand.model) {
        brandDetails.push(`${selectedBrand.model}`);
      }
      
      // Add size if available
      if (selectedBrand.size) {
        brandDetails.push(`${selectedBrand.size}`);
      }
      
      // Join all details with " | " separator
      const brandLabel = brandDetails.join(' ');
      
      items.push({ label: brandLabel, level: 'brand' });
    }

    // Add product details to breadcrumb when a product is selected
    if (selectedProductForBreadcrumb) {
      const productDetails = [];
      
      if (selectedProductForBreadcrumb.productId) {
        productDetails.push(`${selectedProductForBreadcrumb.productId}`);
      }
      
      if (selectedProductForBreadcrumb.model) {
        productDetails.push(`${selectedProductForBreadcrumb.model}`);
      }
      
      if (selectedProductForBreadcrumb.size) {
        productDetails.push(`${selectedProductForBreadcrumb.size}`);
      }
      
      // if (productDetails.length > 0) {
      //   items.push({ 
      //     label: `${selectedProductForBreadcrumb.title} (${productDetails.join(', ')})`, 
      //     level: 'product' 
      //   });
      // } else {
      //   items.push({ 
      //     label: selectedProductForBreadcrumb.title, 
      //     level: 'product' 
      //   });
      // }
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
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
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

      <div className="md:flex gap-6 px-6 sm:mt-4 flex-1">
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

        <div className="w-full flex flex-col min-h-0">
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

          <div className="flex-1 flex flex-col">
            {/* Show brands when a category is selected or when a subcategory is selected */}
            {showBrands && selectedCategoryForSub && !selectedSubcategoryForProducts && (
              <div className="w-full flex-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {getBrandsForCategory().map((brand) => (
                    <CategoryCard
                      key={brand._id}
                      category={brand.name}
                      modelNum={brand.productId}
                      image={brand.image}
                      model={brand.model}
                      size={brand.size}
                      onClick={() => handleBrandCardClick(brand)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Show brands when a subcategory is selected */}
            {showBrands && selectedSubcategoryForProducts && (
              <div className="w-full flex-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {getBrandsForSubcategory().map((brand) => (
                    <CategoryCard
                      key={brand._id}
                      category={brand.name}
                      image={brand.image}
                      modelNum={brand.productId}
                      model={brand.model}
                      size={brand.size}
                      onClick={() => handleBrandCardClick(brand)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Show products when "All Item" is selected, or when viewing products from category/subcategory/brand */}
            {(showAllProducts || showProducts || showBrandProducts) && (
              <div className="flex-1 flex flex-col">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full sm:mt-0 flex-1">
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      handleAddToCart={handleAddToCart}
                      isSavedForLater={savedForLaterIds.has(product._id)}
                      isAdded={addedProductIds.has(product._id)}
                      onViewDetails={() => handleProductClick(product)}
                    />
                  ))}
                </div>
                
                {/* Pagination - positioned naturally after products */}
                {totalPages > 1 && (
                  <div className="py-8 sm:pr-52 ">
                    <ul className="flex justify-center gap-1 text-gray-900">
                      <li>
                        <a
                          href="#"
                          className={`grid size-8 place-content-center rounded border border-black transition-colors rtl:rotate-180 ${currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-gray-100"}`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) handlePageChange(currentPage - 1);
                          }}
                          aria-disabled={currentPage === 1}
                        >
                          ‹
                        </a>
                      </li>
                      {[...Array(totalPages)].map((_, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(index + 1);
                            }}
                            className={`flex justify-center items-center size-8 rounded border text-sm font-medium transition-colors ${
                              currentPage === index + 1 
                                ? "bg-[#013E70] text-white border-[#013E70]" 
                                : "border-black hover:bg-gray-100"
                            }`}
                          >
                            {index + 1}
                          </a>
                        </li>
                      ))}
                      <li>
                        <a
                          href="#"
                          className={`grid size-8 place-content-center rounded border border-black transition-colors rtl:rotate-180 ${currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-gray-100"}`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) handlePageChange(currentPage + 1);
                          }}
                          aria-disabled={currentPage === totalPages}
                        >
                          ›
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

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