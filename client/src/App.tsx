import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Signup from './Pages/Signup';
import Main from './Pages/Main';

import './App.css';

function App() {
  return (
    <div className="App">
      <Nav />

      <div>==여기 바디==</div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
