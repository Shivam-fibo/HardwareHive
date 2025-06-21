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
import NotificationPage  from './components/Home/Notification.jsx';
import NotificationDetail from './components/Home/NotificationDetail';

import { PiWhatsappLogoDuotone } from 'react-icons/pi';
import './App.css';
import ContactButton from './components/Home/ContactButton.jsx';

function App() {
  return (
    <>
      <Analytics />
      <Router>
       
        <ContactButton/>

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
<Route path="/notification" element={<NotificationPage />} />
    <Route path="/notification/:id" element={<NotificationDetail />} />

          </Routes>
        </CartProvider>
      </Router>
    </>
  );
}

export default App;
