import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import Navigation from './Navigation/Navigation';
import Homepage from './Homepage/Homepage';
import Home from './Home/Home';

import './index.css';

const App = () => {
  let userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <>
      <Navigation user={userInfo} />
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/Home' element={<Home user={userInfo} />} />
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
