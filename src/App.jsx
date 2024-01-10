import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './pages/sign-up-page/SignUpPage';
import LoginPage from './pages/login-page/LoginPage';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import PointOfSale from './pages/order-page/Pointofsale';
import ProductList from './pages/Product-list/ProductList';
import Blank from './pages/Blank';
import './scss/App.scss';
import './assets/libs/boxicons-2.1.1/css/boxicons.min.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/signuppage" element={<Navigate to="/" />} /> */}

        <Route index element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<MainLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path="orderpage" element={<PointOfSale />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="settings" element={<Blank />} />
          <Route path="stats" element={<Blank />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
