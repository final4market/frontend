import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AdminReports from './admin/components/adminReports/AdminReports';
import LoginForm from './components/auth/LoginForm';
import ProductRegistration from './components/productRegistration/ProductRegistration';
import MypageProductSalesList from './components/mypage/MypageProductSalesList';
import MypageProductPurchaseHistory from './components/mypage/MypageProductPurchaseHistory';
import SubMain from './components/subPage/Sub_main';
import ProtectedRoute from './admin/components/ProtectedRoute';
import './services/AxiosSetup'; 
import AdminMembers from './admin/components/adminMembers/AdminMembers';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/productPage" element={<SubMain/>} />
        <Route path="/productRegister" element={<ProductRegistration/>} />
        <Route path="/sell-history" element={<MypageProductSalesList />} />
        <Route path="/buy-history" element={<MypageProductPurchaseHistory />} /> 
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Navigate to="/admin/reports" />} />
          <Route path="/admin/members" element={<AdminMembers />} />
          <Route path="/admin/reports" element={<AdminReports />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
