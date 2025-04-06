import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiHome } from 'react-icons/bi';

const RedirectButton = ({ token, redirectUrl }) => {
  const navigate = useNavigate();

  // Función para manejar el clic del botón
  const handleClick = () => {
    if (redirectUrl) {
      window.location.href = redirectUrl; // Redirige a la URL específica
    } else {
      navigate('/'); // Redirige a la página de inicio
    }
  };

  // Comprobar si el token es válido (puedes personalizar la validación)
  const isTokenValid = token && token.length > 0;

  return (
    isTokenValid && (
      <button 
        className="btn btn-sm btn-success ml-2 mr-2"
        onClick={handleClick}>
            < BiHome />
      </button>
    )
  );
};

export default RedirectButton;