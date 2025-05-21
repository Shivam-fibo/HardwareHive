import React from "react";
import { RxCross2 } from "react-icons/rx";

const FilterDrawer = ({
  isOpen,
  onClose,
  categories,
  selectedCategories,
  toggleCategory,
  subcategories,
  selectedSubcategories,
  toggleSubcategory,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 p-4 mt-35 transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"
        } bg-[#ffffffea] text-white overflow-y-auto`}
    >
      {/* Header */}
      <div className="flex items-center justify-end">
        <button onClick={onClose} className="text-2xl font-medium text-black">
          <RxCross2 size={22} className="text-[#003865]"/>
        </button>
      </div>

      {/* Category Section */}
      
      <div>
      <h3 className="text-lg text-[#003865] font-semibold mb-2">Categories</h3>
        <div className="space-y-3 p-4 bg-[#12578c] w-1/2 rounded-xl">
          {categories.map((category, index) => (
            <label
              key={index}
              className="flex items-center justify-between text-[14px] font-medium"
            >
              {category}
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-yellow-400"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
            </label>
          ))}
        </div>
      </div>


      {/* Subcategory Section */}
      {subcategories.length > 0 && (
        <div className="">
          <h3 className="text-lg text-[#003865] font-semibold mb-2 mt-4">Subcategories</h3>
          <div className="space-y-3 p-4 bg-[#003865] w-1/2 rounded-xl">
            {subcategories.map((sub, i) => (
              <label
                key={i}
                className="flex items-center justify-between text-[14px] font-medium"
              >
                {sub}
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-yellow-400"
                  checked={selectedSubcategories.includes(sub)}
                  onChange={() => toggleSubcategory(sub)}
                />
              </label>
            ))}
          </div>
        </div>
      )}

       <div className="mt-6">
          <button onClick={onClose} className="w-full sm:w-auto p-2 px-4 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-500 transition">
            Apply
          </button>
        </div>
    </div>
  );
};

export default FilterDrawer;
