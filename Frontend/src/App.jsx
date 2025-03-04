import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './LandingPage/LandingPage';
import Home from './Home/Home';
import ProductDetails from './Home/ProductDetails';
import Footer from './Home/Footer';


function App() {
  return (
    <Router>
      <div>
        <Toaster />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;