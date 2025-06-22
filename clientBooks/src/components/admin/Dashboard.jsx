import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContent } from '../../context/AppContext';

const Dashboard = () => {

    const { userData } = useContext(AppContent);
    
  return (
<div className="max-w-xl p-6 mx-auto rounded-lg shadow-md bg-background">                {/* Logo con efecto de flotación */}
      <img 
        src={assets.bookLogo || '/default-image.jpg'} 
        alt="Header Illustration" 
        className="w-24 sm:w-32 h-24 sm:h-32 rounded-full mb-4 shadow-lg border-4 border-cyan-500 animate-float" 
      />

      {/* Saludo con icono animado */}
      <h1 className="text-2xl sm:text-4xl font-bold">
        Hello {userData ? userData.name : 'Admin'}!
        <img 
          className="w-8 sm:w-10 inline-block ml-2 animate-wave" 
          src={assets.hand_wave} 
          alt="Hand waving emoji"
        />
      </h1>

      {/* Título con efectos de brillo y onda */}
      <h2 className="text-4xl sm:text-6xl font-extrabold text-black mt-3 drop-shadow-lg animate-text-glow">
        Welcome the  <span className="text-gradient">BOOK</span>
      </h2>

      {/* Descripción con animación de desvanecimiento constante */}
      <p className="text-lg sm:text-xl text-black/90 max-w-lg mx-auto animate-fade-pulse">
        Where knowledge begins and curiosity never ends.
      </p>         
        </div>
  )
}

export default Dashboard