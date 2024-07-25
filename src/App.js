import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AdminReports from './admin/components/adminReports/AdminReports';
import LoginForm from './components/auth/Login/LoginForm';
import NaverAuthCallback from './components/auth/Login/NaverAuthCallback';
import KakaoAuthCallback from './components/auth/Login/KakaoAuthCallback';
import ProductRegistration from './components/productRegistration/ProductRegistration';
import MypageProductSalesList from './components/mypage/MypageProductSalesList';
import MypageProductPurchaseHistory from './components/mypage/MypageProductPurchaseHistory';
import MyInfo from './components/mypage/MyInfo';
import MyStore from './components/mypage/MyStore';
import InterestProduct from './components/mypage/InterestProduct';
import ReceivedReview from './components/mypage/ReceivedReview';
import SubMain from './components/subPage/Sub_main';
import './services/AxiosSetup'; 
import AdminMembers from './admin/components/adminMembers/AdminMembers';
import MypageReviewList from './components/mypage/MypageReviewList';
import RoleProtectedRoute from './components/auth/RoleProtectedRoute';
import './services/AxiosSetup';
import { AuthProvider } from './services/AuthContext';
import ProductRegistrationUpdate from './components/productRegistration/ProductRegistrationUpdate';


function App() {


  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />          
          <Route path="/naverAuthCallback" element={<NaverAuthCallback />} />
          <Route path="/kakaoAuthCallback" element={<KakaoAuthCallback />} />
          <Route path="/productPage" element={<SubMain />} />  
          <Route path="/sell-history" element={<MypageProductSalesList />} />
          <Route path="/productRegister" element={<ProductRegistration />} />
          <Route path="/productRegisterUPdate" element={<ProductRegistrationUpdate />} />
          <Route path="/buy-history" element={<MypageProductPurchaseHistory />} />   
          <Route path="/writed-review" element={<MypageReviewList/>} />     
          <Route element={<RoleProtectedRoute requiredRole="ROLE_USER" />}>
            <Route path="/myStore" element={<MyStore/>}/>
            <Route path="/myInfo" element={<MyInfo />} />
            
          
           
          
            <Route path="/interestProduct" element={<InterestProduct />} />
            <Route path="/receivedReview" element={<ReceivedReview />} />
          </Route>          
          <Route element={<RoleProtectedRoute requiredRole="ROLE_ADMIN" />}>
            <Route path="/admin" element={<Navigate to="/admin/reports" />} />
            <Route path="/admin/members" element={<AdminMembers />} />
            <Route path="/admin/reports" element={<AdminReports />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;