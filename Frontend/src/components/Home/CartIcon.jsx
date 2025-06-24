import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartIcon = () => {
  const { cartItemCount } = useCart();
  

  useEffect(() => {
   
    if (cartItemCount > 0) {
      const badge = document.getElementById("cart-badge");
      if (badge) {
        badge.classList.add("animate-pulse");
        setTimeout(() => {
          badge.classList.remove("animate-pulse");
        }, 1000);
      }
    }
  }, [cartItemCount]);
  
  return (
    <div className="relative">
      <Link to="/cart" className="flex items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-gray-800" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
        
        {cartItemCount > 0 && (
          <div 
            id="cart-badge"
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-all duration-300"
          >
            {cartItemCount}
          </div>
        )}
      </Link>
    </div>
  );
};

export default CartIcon;