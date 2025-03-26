import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './components/Home/Home';

import AllPrdouctShow from './components/LandingPage/Module/AllProductShow'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LandingPage2 from './components/LandingPage/LandingPage2';
import Header from './components/LandingPage/Module/Header';


function App() {
  return (
    <Router>
      <div>
        <Toaster />
        <Routes>
          <Route path="/" element={<LandingPage2 />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/allProductShow' element={<AllPrdouctShow/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;