import React, { useState } from 'react';
import SidebarAdmin from '../components/admin/SidebarAdmin';
import HeaderAdmin from '../components/admin/HeaderAdmin';
import Dashboard from '../components/admin/Dashboard';
import RegisterBook from '../components/admin/RegisterBook'; // Asegúrate de que este componente exista
import Catalog from '../components/admin/Catalog';

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Inicio');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSelect = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <HeaderAdmin toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <SidebarAdmin isSidebarOpen={isSidebarOpen} onSelect={handleSelect} />

      {/* Contenido principal */}
      <div className="text-gray-500 bg-gray-100 sm:ml-64 flex-1 p-4 mt-14 transition-all duration-300">
        {selectedMenu === 'Inicio' && <Dashboard />}
        {selectedMenu === 'RegisterBook' && <RegisterBook />}
         {selectedMenu === 'Catalog' && <Catalog />}
      </div>
    </div>
  );
};

export default Admin;
