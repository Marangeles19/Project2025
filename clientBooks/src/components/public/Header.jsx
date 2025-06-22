import React from 'react'; // 👈 necesario para que JSX funcione correctamente
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import '../../index.css'

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex flex-col items-center mt-16 px-6 text-center text-white animate-fade-in">
      {/* Logo con efecto de flotación */}
      <img 
        src={assets.bookLogo } 
        alt="Header Illustration" 
        
      />

      {/* Título con efectos de brillo y onda */}
      <h2 className="text-4xl sm:text-6xl font-extrabold text-white mt-3 drop-shadow-lg animate-text-glow">
         Welcome to the <span className="text-gradient">Lit Library</span>
      </h2>

      {/* Descripción con animación de desvanecimiento constante */}
      <p className="text-lg sm:text-xl text-white/90 max-w-lg mx-auto animate-fade-pulse">
        Where knowledge begins and curiosity never ends.
      </p>

      {/* Botón con efecto de escala y sombra
      <button 
       onClick={() => navigate('/login')}
       className="mt-6 px-6 py-3 bg-white/20 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/30 hover-shadow-lg">
        sad🔥
      </button> */}
    </header>
  );
};

export default Header;
