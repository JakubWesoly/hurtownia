import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import Navigation from './Navigation/Navigation';
import Homepage from './Homepage/Homepage';
import Home from './Home/Home';

import './index.css';
import LogOut from './LogOut/LogOut';
import AddOrder from './AddOrder/AddOrder';
import Shop from './Shop/Shop';
import CheckOrders from './CheckOrders/CheckOrders';
import ManageUsers from './ManageUsers/ManageUsers';

const App = () => {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/add-order' element={<AddOrder />} />
          <Route path='/check-orders' element={<CheckOrders />} />
          <Route path='/manage-users' element={<ManageUsers />} />
          <Route path='/logout' element={<LogOut />} />
        </Routes>
      </Router>
    </>
  );
};

const root = createRoot(document.querySelector('#root'));
root.render(
  <>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </>
);
