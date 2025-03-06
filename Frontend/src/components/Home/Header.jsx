import { Search, Mic, ShoppingCart, User } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-100 p-3">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Toolsvilla" className="w-10 h-10" />
        <span className="text-lg font-bold text-yellow-600">TOOLSVILLA</span>
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center w-full max-w-lg">
        <input
          type="text"
          placeholder="Type to search..."
          className="w-full px-4 py-2 border rounded-full border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <div className="absolute right-3 flex items-center space-x-2">
          <Mic className="w-5 h-5 text-teal-500 cursor-pointer" />
          <span className="border-l border-gray-400 h-5"></span>
          <Search className="w-5 h-5 text-teal-500 cursor-pointer" />
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-6">
        <ShoppingCart className="w-6 h-6 text-teal-500 cursor-pointer" />
        <User className="w-6 h-6 text-teal-500 cursor-pointer" />
      </div>
    </header>
  );
}
