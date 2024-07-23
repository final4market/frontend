<<<<<<< HEAD
import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AdminMembers from './admin/components/adminMembers/AdminMembers';
import AdminReports from './admin/components/adminReports/AdminReports';
import LoginForm from './components/auth/LoginForm';
import ProductRegistration from './components/productRegistration/ProductRegistration';
import MypageProductSalesList from './components/myPage/MypageProductSalesList';
import MypageProductPurchaseHistory from './components/myPage/MypageProductPurchaseHistory';
import SubMain from './components/subPage/Sub_main';
import ProtectedRoute from './admin/components/ProtectedRoute';
import './services/AxiosSetup'; 
=======
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MyStore from './components/mypage/MyStore';
import MyInfo from './components/mypage/MyInfo';
import InterestProduct from './components/mypage/InterestProduct';
import ReceivedReview from './components/mypage/ReceivedReview';
>>>>>>> 1f7764110cb9a2fd5ed1bd561f2f4d261fd97a66

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
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
=======
        <Route path="/myStore" element={<MyStore/>}/>
        <Route path="/myInfo" element={<MyInfo/>}/>
        <Route path="/interestProduct" element={<InterestProduct/>}/>
        <Route path="/receivedReview" element={<ReceivedReview/>}/>
>>>>>>> 1f7764110cb9a2fd5ed1bd561f2f4d261fd97a66
      </Routes>
    </Router>
  );
}

export default App;