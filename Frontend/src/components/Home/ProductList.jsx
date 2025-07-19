import React, { useState } from 'react';
import CategoryCard from './CategoryCard';

const ProductList = () => {
  const categories = ['Machinery', 'Brands', 'Spare-Parts', 'Accessories'];

  const categoryRoutes = {
    'Machinery': 'machinery',
    'Brands': 'brands',
    'Spare-Parts': 'spare-part',
    'Accessories': 'accessiers',
  };

  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // NEW

  const handleCategoryClick = async (categoryLabel) => {
    // If the same category is clicked again, unselect it
    if (selectedCategory === categoryLabel) {
      setSelectedCategory(null);
      setItems([]);
      return;
    }

    setSelectedCategory(categoryLabel); // NEW
    const categorySlug = categoryRoutes[categoryLabel];
    const apiUrl = `https://hardware-hive-backend.vercel.app/api/category/user/${categorySlug}/past-data`;

    try {
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Safely extract response array
      const products = Array.isArray(result.response) ? result.response : [];
      setItems(products);
    } catch (error) {
      console.error(`Error fetching ${categoryLabel} data:`, error);
      setItems([]);
    }
  };

  return (
    <div className="flex mt-4 px-4 gap-4 mb-10">
      {/* LEFT SIDEBAR */}
      <div className="hidden md:block w-1/4 lg:w-1/5 space-y-4">
        <div className="bg-[#12578c] text-white p-2 rounded-xl border border-[#003865]">
          <label className="flex items-center justify-between text-[14px] font-semibold cursor-pointer">
            All Item
            <input
              type="checkbox"
              className="form-checkbox h-5 w-8 accent-amber-50 rounded"
              onClick={() => console.log("All item clicked")}
              checked={false} // you can manage this separately if needed
              readOnly
            />
          </label>
        </div>

        <div className="bg-[#12578c] text-white p-4 rounded-xl border border-[#003865]">
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
                checked={selectedCategory === category} // NEW
                readOnly
              />
            </label>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - CATEGORY CARDS */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(items) &&
          items.map((item) => (
            <CategoryCard
              key={item._id}
              category={item.productName}
              image={item.image}
              modelNum={item.subcategory}
              model={item.modelName}
              size={item.size}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductList;
