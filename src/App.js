import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MyStore from './components/mypage/MyStore';
import MyInfo from './components/mypage/MyInfo';
import InterestProduct from './components/mypage/InterestProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/myStore" element={<MyStore/>}/>
        <Route path="/myInfo" element={<MyInfo/>}/>
        <Route path="/interestProduct" element={<InterestProduct/>}/>
      </Routes>
    </Router>
  );
}

export default App;