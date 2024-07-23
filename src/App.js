import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AdminMembers from './admin/components/adminMembers/AdminMembers';
import AdminReports from './admin/components/adminReports/AdminReports';
import LoginForm from './components/auth/LoginForm';
import ProductRegistration from './components/productRegistration/ProductRegistration';
import SubMain from './components/subPage/Sub_main';
import ProtectedRoute from './admin/components/ProtectedRoute';
import './services/AxiosSetup'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/productPage" element={<SubMain/>} />
        <Route path="/productRegister" element={<ProductRegistration/>} />
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
