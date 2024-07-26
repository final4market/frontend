import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AdminMembers from './admin/components/adminMembers/AdminMembers';
import AdminReports from './admin/components/adminReports/AdminReports';
import LoginForm from './components/auth/Login/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import NaverAuthCallback from './components/auth/Login/NaverAuthCallback';
import KakaoAuthCallback from './components/auth/Login/KakaoAuthCallback';
import ProductRegistration from './components/productRegistration/ProductRegistration';
import MyPageProductSalesList from './components/mypage/MyPageProductSalesList';
import MyPageProductPurchaseHistory from './components/mypage/MyPageProductPurchaseHistory';
import MyPageMyInfo from './components/mypage/MyPageMyInfo';
import MyPageMyStore from './components/mypage/MyPageMyStore';
import MyPageInterestProduct from './components/mypage/MyPageInterestProduct';
import MyPageReceivedReview from './components/mypage/MyPageReceivedReview';
import SubMain from './components/subPage/SubMain';
import RoleProtectedRoute from './components/auth/RoleProtectedRoute';
import './services/AxiosSetup';
import { AuthProvider } from './services/AuthContext';

function App() {


  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/register" element={<RegisterForm/>}/>          
          <Route path="/naverAuthCallback" element={<NaverAuthCallback/>}/>
          <Route path="/kakaoAuthCallback" element={<KakaoAuthCallback/>}/>
          <Route path="/productPage" element={<SubMain/>}/>         
          <Route element={<RoleProtectedRoute requiredRole="ROLE_USER"/>}>
            <Route path="/my-store" element={<MyPageMyStore/>}/>
            <Route path="/my-info" element={<MyPageMyInfo/>}/>
            <Route path="/productRegister" element={<ProductRegistration/>}/>
            <Route path="/sell-history" element={<MyPageProductSalesList/>}/>
            <Route path="/buy-history" element={<MyPageProductPurchaseHistory/>}/>
            <Route path="/interest-product" element={<MyPageInterestProduct/>}/>
            <Route path="/received-review" element={<MyPageReceivedReview/>}/>
          </Route>          
          <Route element={<RoleProtectedRoute requiredRole="ROLE_ADMIN"/>}>
            <Route path="/admin" element={<Navigate to="/admin/reports"/>}/>
            <Route path="/admin/members" element={<AdminMembers/>}/>
            <Route path="/admin/reports" element={<AdminReports/>}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;