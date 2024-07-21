import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
//import MypageProductSalesList from './components/mypage/MypageProductSalesList';
import ProductRegistration from './components/productRegistration/ProductRegistration';


function App() {
  return (
    <Router>
      <Routes>         
     <Route path="/" element={<ProductRegistration/>} /> 
      {/*  <Route path="/" element={<MypageProductSalesList/>} />  */}
      </Routes>
    </Router>

  );
}

export default App;
