import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ProductRegistration from './components/productRegistration/ProductRegistration';


function App() {
  return (
    <Router>
      <Routes>         
        <Route path="/" element={<ProductRegistration/>} /> 
      
      </Routes>
    </Router>

  );
}

export default App;
