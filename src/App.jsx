import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import PelangganPage from './pages/PelangganPage';
import AddCustomerPage from './pages/AddCustomerPage';
import TestingPage from './testing/TestingPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registrasi" element={<RegisterPage />} />
        <Route path="/produk" element={<ProductsPage />} />
        <Route path="/transaksi" element={<PelangganPage />} />
        <Route path="/addcustomer" element={<AddCustomerPage />} />
        <Route path="/EditPage" element={<TestingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
