import { Routes, Route } from 'react-router-dom';
import { useState, createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
