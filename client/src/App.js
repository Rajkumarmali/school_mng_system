import Login from './auth/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Layout from './components/Layout';
import { useState } from 'react';
import { useSelector } from 'react-redux';
function App() {
  const token = useSelector((state) => state.auth.token)
    || localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {!token ? <Route path='/' element={<Login />} /> : <Route path="/*" element={<Layout />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
