import React from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css';

import LoginPage from './pages/login-page/LoginPage.js';
import SignUpPage from './pages/signup-page/SignupPage.js';
import MainApp from './pages/main-app/main-app.js';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='signup' element={<SignUpPage />}></Route>
        <Route path='mainpage' element={<MainApp />}></Route>
      </Routes>
    </>
  );
}

export default App;
