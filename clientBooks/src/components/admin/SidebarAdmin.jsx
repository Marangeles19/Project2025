import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BsShield, BsHouse } from 'react-icons/bs';
import { FaStar,  FaFileAlt, FaChartBar } from 'react-icons/fa';

const SidebarAdmin = ({ selectedMenu, onSelect, isSidebarOpen }) => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, setUserData } = useContext(AppContent);

  // Función de cierre de sesión
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);

      if (data.success) {
        setIsLoggedin(false);
        setUserData(null); // Limpiar los datos del usuario
        toast.success('Successfully logged out');
        navigate('/');
      } else {
        toast.error('Error logging out');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error during logout');
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 sm:translate-x-0 
   dark:bg-gray-800 dark:border-gray-700 
      transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`} >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <ul className="space-y-3 flex-grow">
          {/* Item de Inicio */}
          <li
            onClick={() => onSelect('Inicio')}
            className={`flex items-center gap-4 p-3 rounded-lg text-gray-200 cursor-pointer hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-900 hover:text-white transition duration-300 transform hover:scale-105 ${selectedMenu === 'Inicio' ? 'text-cyan-400' : ''
              }`}
          >
            <BsHouse size={22} />
            <span className="text-lg font-medium">Home</span>
          </li>

          {/* Item de RegisterBook */}
          <li
            onClick={() => onSelect('RegisterBook')}
            className={`flex items-center gap-4 p-3 rounded-lg text-gray-200 cursor-pointer hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-900 hover:text-white transition duration-300 transform hover:scale-105 ${selectedMenu === 'Conquistadores' ? 'text-cyan-400' : ''
              }`}
          >
            <BsShield size={30} />
            <span className="text-lg font-medium">Register Book</span>
          </li>

          {/* Item de Catalog */}
          <li
            onClick={() => onSelect('Catalog')}
            className={`flex items-center gap-4 p-3 rounded-lg text-gray-200 cursor-pointer hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-900 hover:text-white transition duration-300 transform hover:scale-105 ${selectedMenu === 'Puntaje' ? 'text-sky-500' : ''
              }`}
          >
            <FaStar size={22} />
            <span className="text-lg font-medium">Catalog</span>
          </li>

     
          {/* Item de Historial */}
          <li
            onClick={() => onSelect('historial')}
            className={`flex items-center gap-4 p-3 rounded-lg text-gray-200 cursor-pointer hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-900 hover:text-white transition duration-300 transform hover:scale-105 ${selectedMenu === 'reporte-por-fechas' ? 'text-cyan-400' : ''
              }`}
          >
            <FaFileAlt size={22} />
            <span className="text-lg font-medium">Historial</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
