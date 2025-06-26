import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
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
import NotificationPage  from './components/Home/Notification.jsx';
import NotificationDetail from './components/Home/NotificationDetail';
import './App.css';
import ContactButton from './components/Home/ContactButton.jsx';
import SavedForLater from './components/Home/SaveForLater.jsx';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user'); // or your specific user token/item
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

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
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/allProductShow" element={<AllPrdouctShow />} />
            
            {/* Protected Routes */}
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } />
            <Route path="/products" element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            } />
            <Route path="/user" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            } />
            <Route path="/notification" element={
              <ProtectedRoute>
                <NotificationPage />
              </ProtectedRoute>
            } />
            <Route path="/notification/:id" element={
              <ProtectedRoute>
                <NotificationDetail />
              </ProtectedRoute>
            } />
            <Route path='/saved' element={
              <ProtectedRoute>
                <SavedForLater />
              </ProtectedRoute>
            } />
          </Routes>
        </CartProvider>
      </Router>
    </>
  );
}

export default App;