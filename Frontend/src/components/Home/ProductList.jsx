import React, { useEffect, useState } from 'react';
import CategoryCard from './UploadProduct/CategoryCard';
import Breadcrumb from './UploadProduct/Breadcrumb';
import ProductCard from './UploadProduct/ProductCard';
import { useCart } from '../context/CartContext';
import LoadingSpinner from './UploadProduct/LoadingSpinner';
import Pagination from './UploadProduct/Pagination';

const ProductList = () => {
  const categories = ['Machinery', 'Spare-Parts', 'Brands', 'Accessories'];
  const [allItemSelected, setAllItemSelected] = useState(true);
  const { addToCart, refreshCartCount } = useCart();
  const [categoryProducts, setCategoryProducts] = useState([]);

  const categoryRoutes = {
    'Machinery': 'machinery',
    'Brands': 'brands',
    'Spare-Parts': 'spare-parts',
    'Accessories': 'accessiers',
  };

  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [product, setAllProduct] = useState([]);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleBreadcrumbClick = (level) => {
    if (level === 'category') {
      setSelectedSubcategory(null);
    } else if (level === 'home') {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setItems([]);
      setSubcategories([]);
      setCategoryProducts([]);
      setAllItemSelected(true);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!selectedCategory && !selectedSubcategory) {
      setAllItemSelected(true);
    } else {
      setAllItemSelected(false);
    }
  }, [selectedCategory, selectedSubcategory]);

  const getBreadcrumbItems = () => {
    const items = [{ label: 'Home', level: 'home' }];
    if (selectedCategory) items.push({ label: selectedCategory, level: 'category' });
    if (selectedSubcategory) items.push({ label: selectedSubcategory, level: 'subcategory' });
    return items;
  };

  const handleCategoryClick = async (categoryLabel) => {
    if (selectedCategory === categoryLabel) {
      setSelectedCategory(null);
      setItems([]);
      setSubcategories([]);
      setSelectedSubcategory(null);
      setCategoryProducts([]);
      setCurrentPage(1);
      return;
    }

    setIsLoadingCategory(true);
    setSelectedCategory(categoryLabel);
    setSelectedSubcategory(null);
    setCategoryProducts([]);
    setCurrentPage(1);

    const categorySlug = categoryRoutes[categoryLabel];
    const apiUrl = `https://hardware-hive-backend.vercel.app/api/category/user/${categorySlug}/past-data`;

    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      const products = Array.isArray(result.response) ? result.response : [];
      setItems(products);
      const uniqueSubcategories = [...new Set(products.map(item => item.subcategory))];
      setSubcategories(uniqueSubcategories);
    } catch (error) {
      console.error(`Error fetching ${categoryLabel} data:`, error);
      setItems([]);
      setSubcategories([]);
    } finally {
      setTimeout(() => {
        setIsLoadingCategory(false);
      }, 400);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(prev => (prev === subcategory ? null : subcategory));
    setCurrentPage(1);
  };

  const filteredItems = selectedSubcategory
    ? items.filter(item => item.subcategory === selectedSubcategory)
    : items;

  useEffect(() => {
    const fetchAllProduct = async () => {
      const response = await fetch('https://hardware-hive-backend.vercel.app/api/product/getProductUser');
      const data = await response.json();
      setAllProduct(data.allProduct);
    };
    fetchAllProduct();
  }, []);

  const handleAddToCart = async (item, quantity) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    addToCart({ ...item, quantity });

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

  const handleCategoryCardClick = async (itemId) => {
    try {
      const response = await fetch("https://hardware-hive-backend.vercel.app/api/product/getProductFromCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: itemId }),
      });

      const data = await response.json();
      if (data?.products) {
        setCategoryProducts(data.products);
        setCurrentPage(1);
      } else {
        setCategoryProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch category products:", error);
      setCategoryProducts([]);
    }
  };

  let productsToDisplay = [];
  if (allItemSelected) {
    productsToDisplay = product;
  } else if (categoryProducts.length > 0) {
    productsToDisplay = categoryProducts;
  } else {
    productsToDisplay = filteredItems;
  }

  const totalPages = Math.ceil(productsToDisplay.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = productsToDisplay.slice(startIndex, endIndex);

  return (
    <>
      <div className="flex flex-col md:flex-row mt-4 px-4 gap-4 mb-10">
        <div className="hidden md:block w-full md:w-1/4 lg:w-1/5 space-y-4">
          <div className="bg-[#12578c] text-white p-2 rounded-xl border border-[#003865]">
            <label className="flex items-center justify-between text-[14px] font-semibold cursor-pointer">
              All Item
              <input
                type="checkbox"
                className="form-checkbox h-5 w-8 accent-amber-50 rounded"
                checked={allItemSelected}
                onChange={() => {}}
              />
            </label>
          </div>

          <div className="bg-[#12578c] text-white p-4 rounded-xl border border-[#003865]">
            <h3 className="text-[14px] font-bold mb-3">Categories</h3>
            {categories.map((category, i) => (
              <label
                key={i}
                className="flex items-center justify-between mb-3 text-[14px] font-semibold cursor-pointer"
              >
                {category}
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-2 accent-amber-50 border-amber-50"
                  onClick={() => handleCategoryClick(category)}
                  checked={selectedCategory === category}
                  readOnly
                />
              </label>
            ))}
          </div>

          {subcategories.length > 0 && (
            <div className="bg-[#12578c] text-white p-4 rounded-xl border border-[#003865]">
              <h3 className="text-[14px] font-bold mb-3">Subcategories</h3>
              {subcategories.map((subcategory, i) => (
                <label
                  key={i}
                  className="flex items-center justify-between mb-3 text-[14px] font-semibold cursor-pointer"
                >
                  {subcategory}
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-2 accent-amber-50 border-amber-50"
                    onClick={() => handleSubcategoryClick(subcategory)}
                    checked={selectedSubcategory === subcategory}
                    readOnly
                  />
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="w-full">
          <div>
            <Breadcrumb
              getBreadcrumbItems={getBreadcrumbItems}
              handleBreadcrumbClick={handleBreadcrumbClick}
            />
          </div>

          {isLoadingCategory ? (
            <div className="flex justify-center items-center min-h-[40vh] w-full">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((item) => {
                    if (allItemSelected || categoryProducts.length > 0) {
                      return (
                        <ProductCard
                          key={item._id}
                          product={{
                            image: item.image,
                            title: item.title,
                            price: item.sellingPrice || item.buyingPrice || item.price,
                            subheading: item.modelName || '',
                            productInfo: item.size || '',
                            productBrand: item.brand || '',
                          }}
                          handleAddToCart={(quantity) => handleAddToCart(item, quantity)}
                          onViewDetails={() => {}}
                          isAdded={false}
                        />
                      );
                    }
                    return (
                      <CategoryCard
                        key={item._id}
                        category={item.productName}
                        image={item.image}
                        modelNum={item.subcategory}
                        model={item.modelName}
                        size={item.size}
                        brand={item.brand}
                        onClick={() => handleCategoryCardClick(item._id)}
                      />
                    );
                  })
                ) : (
                  <p className="col-span-full text-center text-gray-500">
                    No products to display.
                  </p>
                )}
              </div>

              {totalPages > 1 && (
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  handlePageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
