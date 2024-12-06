import React from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css';

import LoginPage from './pages/login-page/LoginPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
