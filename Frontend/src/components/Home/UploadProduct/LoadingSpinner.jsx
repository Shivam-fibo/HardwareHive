// LoadingSpinner.jsx
const LoadingSpinner = () => {
  return (
    <div className=" bg-[#F3F4F6] flex flex-col">
      <div className=" flex items-center justify-center">
        <div className="text-center">
          <div
            className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-[#013F71] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
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
};

export default LoadingSpinner;