import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AdminMembers from './admin/components/adminMembers/AdminMembers';
import AdminReports from './admin/components/adminReports/AdminReports';

import ProductRegistration from './components/productRegistration/ProductRegistration';
import SubMain from './components/subPage/Sub_main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Navigate to="/admin/reports" />} />
        <Route path="/admin/members" element={<AdminMembers />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/productPage" element={<SubMain/>} />
        <Route path="/productRegister" element={<ProductRegistration/>} />
      </Routes>
    </Router>
  );
}

export default App;
