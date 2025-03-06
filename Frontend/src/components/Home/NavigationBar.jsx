export default function NavigationBar() {
    return (
      <nav className="bg-black text-white p-3 flex space-x-6 items-center">
        <div className="relative group">
          <span className="cursor-pointer">ALL CATEGORIES ▾</span>
        </div>
        <div className="relative group">
          <span className="cursor-pointer">BRANDS ▾</span>
        </div>
        <div className="bg-red-600 px-3 py-1 font-bold">DEALS</div>
        <div className="relative group">
          <span className="cursor-pointer">WHAT'S NEW</span>
        </div>
        <div className="relative group">
          <span className="cursor-pointer">TOOLS ▾</span>
        </div>
        <div className="relative group">
          <span className="cursor-pointer">STORAGE & WORKSPACE ▾</span>
        </div>
        <div className="relative group">
          <span className="cursor-pointer">LAWN & GARDEN ▾</span>
        </div>
        <div className="relative group">
          <span className="cursor-pointer">MATERIAL & HANDLING ▾</span>
        </div>
        <div className="relative group">
          <span className="cursor-pointer">SAFETY</span>
        </div>
        <div className="relative group">
          <span className="cursor-pointer">EQUIPMENT</span>
        </div>
        <div className="relative group">
          <span className="cursor-pointer">AUTOMOTIVE ▾</span>
        </div>
      </nav>
    );
  }
  