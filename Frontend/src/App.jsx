import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react'; // Import Analytics
import Home from './components/Home/Home';
import AllPrdouctShow from './components/LandingPage/Module/AllProductShow';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LandingPage2 from './components/LandingPage/LandingPage2';
import { CartProvider } from './components/context/CartContext.jsx';
import CartPage from './components/Home/CartPage';
import ProductList from './components/Home/ProductList';
import UserProfile from "./components/Home/UserProfile.jsx";
import OrderHistory from './components/Home/OrderHistory.jsx';
import { PiWhatsappLogoThin } from "react-icons/pi";
import { PiWhatsappLogoDuotone } from 'react-icons/pi';
import { FaWhatsapp } from 'react-icons/fa';

function App() {
  return (
    <>
      <Analytics /> 
      <Router>
        <a
          href="https://wa.me/919804611111"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-50 "
        >
          <FaWhatsapp size={60} className="text-green-500 " />
        </a>
        <CartProvider>
          <Toaster />
          <Routes>
            <Route path="/" element={<LandingPage2 />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/allProductShow" element={<AllPrdouctShow />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/order" element={<OrderHistory />} />
          </Routes>
        </CartProvider>
      </Router>
    </>
  );
}

export default App;
