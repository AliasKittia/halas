import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FishListPage from './FishListPage';  
import FishDetail from './FishDetail';
import FishEdit from './FishEdit';
import HomePage from './HomePage'; 
import Navbar from './Navbar'; 



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Fish" element={<FishListPage />} />  
        <Route path="/fish/:id" element={<FishDetail />} />
        <Route path="/halak/edit/:id" element={<FishEdit/>} />
      </Routes>
    </Router>
  );
}

export default App;
