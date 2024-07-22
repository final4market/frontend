import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
//import MypageProductSalesList from './components/mypage/MypageProductSalesList';
//import ProductRegistration from './components/productRegistration/ProductRegistration';
import MypageProductPurchaseHistory from './components/mypage/MypageProductPurchaseHistory';


function App() {
  return (
    <Router>
      <Routes>         
     {/* <Route path="/" element={<ProductRegistration/>} 
     <Route path="/" element={<MypageProductSalesList/>} />  */}
 *    <Route path="/" element={<MypageProductPurchaseHistory/>} />
      </Routes>
    </Router>

  );
}

export default App;
