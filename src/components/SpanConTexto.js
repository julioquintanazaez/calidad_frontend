import React, { useState, useContext } from 'react';
import { UserContext } from './../context/UserContext';

const SpanConTexto = ({ texto }) => {
  const { token } = useContext(UserContext);
  const [mostrarTexto, setMostrarTexto] = useState(false);

  const manejarClick = () => {
    setMostrarTexto(!mostrarTexto); // Alterna la visibilidad del texto
  };

  return (
    <div>
      <span
        onClick={manejarClick}
        style={{
          cursor: 'pointer',
          padding: '10px 20px',
          backgroundColor: '#007BFF', // Color de fondo
          color: 'white', // Color del texto
          borderRadius: '5px', // Bordes redondeados
          border: 'none', // Sin borde
          textAlign: 'center',
          display: 'inline-block', // Para que el span se comporte como un bloque en línea
          textDecoration: 'none', // Sin subrayado
          transition: 'background-color 0.3s', // Transición suave para el color de fondo
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')} // Color al pasar el mouse
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007BFF')} // Color original
      >
        Hacer clic aquí
      </span>
      {mostrarTexto && <p>{texto}</p>} {/* Muestra el texto si mostrarTexto es true */}
    </div>
  );
};

export default SpanConTexto;