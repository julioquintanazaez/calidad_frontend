import '../styles/Footer.css'; // Importa el CSS para el pie de página
import React from 'react';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Información de Contacto</h3>
        <p>Creadores: Yaimi Sifonte</p>
        <p>Dirección del Hotel: Calle Ficticia 123, Ciudad, País</p>
        <p>Referencia: www.ejemplo.com</p>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;