import React from 'react'; // 👈 necesario para que JSX funcione correctamente
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import { Login } from './pages/Login';
import Admin from './pages/Admin';
import MainAdmin from "./components/admin/MainAdmin";
import Dashboard from "./components/admin/Dashboard";
import './App.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/inicio" element={<MainAdmin><Dashboard /></MainAdmin>} />
      </Routes>
    </div>
  );
}

export default App;
