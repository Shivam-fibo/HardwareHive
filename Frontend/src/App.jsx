import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './components/Home/Home';
import AllPrdouctShow from './components/LandingPage/Module/AllProductShow';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LandingPage2 from './components/LandingPage/LandingPage2';
import { CartProvider } from './components/context/CartContext.jsx';
import CartPage from './components/Home/CartPage';
import ProductList from './components/Home/ProductList';

function App() {
  return (
    <Router>
      <CartProvider> {/* ✅ Wrap everything inside CartProvider */}
        <Toaster />
        <Routes>
          <Route path="/" element={<LandingPage2 />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/allProductShow" element={<AllPrdouctShow />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductList />} /> {/* Ensure this is inside CartProvider */}
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
