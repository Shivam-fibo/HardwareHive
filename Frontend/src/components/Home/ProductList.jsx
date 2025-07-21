import React, { useState } from 'react';
import CategoryCard from './CategoryCard';

const ProductList = () => {
  const categories = ['Machinery', 'Spare-Parts', 'Brands', 'Accessories'];

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

  const handleCategoryClick = async (categoryLabel) => {
    if (selectedCategory === categoryLabel) {
      setSelectedCategory(null);
      setItems([]);
      setSubcategories([]);
      setSelectedSubcategory(null);
      return;
    }

    setSelectedCategory(categoryLabel);
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
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(prev => (prev === subcategory ? null : subcategory));
  };

  const filteredItems = selectedSubcategory
    ? items.filter(item => item.subcategory === selectedSubcategory)
    : items;

  return (
<div className="flex flex-col md:flex-row mt-4 px-4 gap-4 mb-10">
      {/* LEFT SIDE - FILTERS */}
      <div className="hidden md:block w-full md:w-1/4 lg:w-1/5 space-y-4">
        {/* ALL ITEMS RESET */}
        <div className="bg-[#12578c] text-white p-2 rounded-xl border border-[#003865]">
          <label className="flex items-center justify-between text-[14px] font-semibold cursor-pointer">
            All Item
            <input
              type="checkbox"
              className="form-checkbox h-5 w-8 accent-amber-50 rounded"
              onClick={() => {
                setSelectedCategory(null);
                setItems([]);
                setSubcategories([]);
                setSelectedSubcategory(null);
              }}
              checked={false}
              readOnly
            />
          </label>
        </div>

        {/* CATEGORY FILTER */}
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

        {/* SUBCATEGORY FILTER */}
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

      <div className=" md:w-3/4 lg:w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {filteredItems.map((item) => (
          <CategoryCard
            key={item._id}
            category={item.productName}
            image={item.image}
            modelNum={item.subcategory}
            model={item.modelName}
            size={item.size}
            brand={item.brand}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
