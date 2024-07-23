import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AdminMembers from './admin/components/adminMembers/AdminMembers';
import AdminReports from './admin/components/adminReports/AdminReports';
import LoginForm from './components/auth/LoginForm';
import ProductRegistration from './components/productRegistration/ProductRegistration';
import MypageProductSalesList from './components/myPage/MypageProductSalesList';
import MypageProductPurchaseHistory from './components/myPage/MypageProductPurchaseHistory';
import MyStore from './components/myPage/MyStore';
import MyInfo from './components/myPage/MyInfo';
import InterestProduct from './components/myPage/InterestProduct';
import ReceivedReview from './components/myPage/ReceivedReview';
import SubMain from './components/subPage/Sub_main';
import ProtectedRoute from './admin/components/ProtectedRoute';
import './services/AxiosSetup';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<LoginForm />} />
        <Route path="/productPage" element={<SubMain/>} />
        <Route path="/myStore" element={<MyStore/>}/>
        <Route path="/myInfo" element={<MyInfo/>}/>
        <Route path="/productRegister" element={<ProductRegistration/>} />
        <Route path="/sell-history" element={<MypageProductSalesList />} />
        <Route path="/buy-history" element={<MypageProductPurchaseHistory />} />        
        <Route path="/interestProduct" element={<InterestProduct/>}/>
        <Route path="/receivedReview" element={<ReceivedReview/>}/> 
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