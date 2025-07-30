// Breadcrumb.jsx
const Breadcrumb = ({ getBreadcrumbItems, handleBreadcrumbClick }) => {
  return (
    <div className="w-full mt-2 mb-6.5 ml-4 hidden md:block">
      <nav className="flex items-center flex-wrap text-sm text-black">
        {getBreadcrumbItems().map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">{'>'}</span>}
            <button
              onClick={() => handleBreadcrumbClick(item.level)}
              className={`transition-colors duration-200 ${
                index === getBreadcrumbItems().length - 1
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
  );
};

export default Breadcrumb;