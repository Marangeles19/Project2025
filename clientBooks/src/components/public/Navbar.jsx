import React from 'react'; // 👈 necesario para que JSX funcione correctamente
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className='w-full bg-transparent fixed top-0 left-0 p-4 sm:px-24 flex items-center justify-between z-50'>
  
      {/* Botones en desktop */}
      <div className="hidden sm:flex gap-4 fixed top-6 right-6 z-20">
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-white/20 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/30 hover:shadow-lg"
        >
         Login
        </button>
      </div>

      {/* Menú hamburguesa en móviles */}
      <div className="sm:hidden z-30 absolute top-6 right-6">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <FaTimes size={24} className="text-white" />
          ) : (
            <FaBars size={24} className="text-white" />
          )}
        </button>
      </div>

      {/* Menú desplegable en móviles */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white bg-opacity-90 text-white rounded-lg p-4 flex flex-col items-center gap-3 sm:hidden">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 border border-sky-500 text-black rounded-full px-6 py-2"
          >
            Iniciar Sesión
            <FaArrowRight size={16} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
