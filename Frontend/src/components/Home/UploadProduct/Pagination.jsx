// Pagination.jsx
const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="py-8 sm:pr-52">
      <ul className="flex justify-center gap-1 text-gray-900">
        <li>
          <a
            href="#"
            className={`grid size-8 place-content-center rounded border border-black transition-colors rtl:rotate-180 ${
              currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-gray-100"
            }`}
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
            className={`grid size-8 place-content-center rounded border border-black transition-colors rtl:rotate-180 ${
              currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-gray-100"
            }`}
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
  );
};

export default Pagination;