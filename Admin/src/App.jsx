import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminLogin from "./Pages/AdminLogin";
import Home from "./Pages/Home";
import AdminDashboard from "./Pages/AdminDashboard"
import AddProduct from "./Pages/AddProduct";
import { Toaster } from 'react-hot-toast'
const PrivateRoute = ({ element }) => {
  const { isAdminLoggedIn } = useAuth();
  return isAdminLoggedIn ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/dashboard" element={<PrivateRoute element={<AdminDashboard/>} />}/>
          <Route path="/addProduct" element={<PrivateRoute element={<AddProduct/>} />}/>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
};

export default App;
