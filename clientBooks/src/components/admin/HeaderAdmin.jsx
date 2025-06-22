import React, { useContext } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { assets } from '../../assets/assets';
import '../../index.css';
import { AppContent } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  // Import navigate
import { HiArrowRight } from 'react-icons/hi';
 
const HeaderAdmin = ({ toggleSidebar }) => {
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);
  const navigate = useNavigate();  // Initialize navigate

  // Función para cerrar sesión
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
  
      console.log('Backend response:', data); // Verifica la respuesta del backend
      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
      if (data.succes) {
        setIsLoggedin(false);  // Cambia el estado de inicio de sesión
        setUserData(false);      // Limpia los datos del usuario
        
        toast.success('Successfully logged out');
        navigate('/');         // Redirige al inicio
      } else {
        toast.error('Error logging out');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(error?.response?.data?.message || 'Error during logout');
    }
  };

  // Función para manejar la verificación de correo
  const sendVerifiOTP = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);

      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message + ' Verification email sent!');
      } else {
        toast.error(data.message || 'Error sending verification email');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error during OTP sending');
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full dark:bg-gray-800 dark:border-gray-700">
     
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Botón de las barritas para abrir/cerrar el Sidebar */}
            <button
              onClick={toggleSidebar} // Llama a toggleSidebar al hacer clic
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <HiOutlineMenuAlt2 className="text-2xl" />
            </button>
            <a href="#" className="flex ms-2 md:me-24">
              <img src={assets.bookLogo} alt="logo" className="w-8 sm:w-12" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Lit Library
              </span>
            </a>
          </div>

          {/* User Profile & Logout Section */}
          {userData ? (
            <div className="w-8 h-8 flex justify-center items-center rounded-full bg-gradient-to-r from-sky-500 to-blue-900 text-white relative group">
            {/* Mostrar la primera letra del nombre del usuario */}
            {userData.name.charAt(0).toUpperCase()}
          
            {/* Menú desplegable al hacer hover */}
            <div className="absolute hidden group-hover:block top-0 right-0 z-10  text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-sm rounded">
            {/* Mostrar la opción "Verify email" solo si el usuario no tiene la cuenta verificada */}
                {!userData.isAccountVerified && (
                  <li
                  onClick={sendVerifiOTP}
                  className="py-1 px-2 cursor-pointer rounded text-gray-800 dark:text-white hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-900 hover:text-white transition duration-300"
                >
                  Verificar email
                </li>
                
                )}

                {/* Opción para cerrar sesión */}
                <li
                  onClick={logout}
                  className="py-1 px-2 cursor-pointer rounded text-white hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-900 hover:text-white transition duration-300"
                >
                  Cerrar Sesión
                </li>
              </ul>
            </div>
          </div>
          
          ) : (
            <button
            onClick={() => navigate('/login')}
            className={`flex items-center gap-4 p-3 rounded-lg text-white cursor-pointer bg-gradient-to-r from-sky-500 to-blue-900 transform hover:scale-105 transition duration-300`}
            >
            Login
            <HiArrowRight className="text-xl" /> {/* Ícono de flecha */}
          </button>
          )}
        </div>
    </nav>
  );
};

export default HeaderAdmin;
