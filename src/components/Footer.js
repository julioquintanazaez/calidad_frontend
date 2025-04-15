import '../styles/Footer.css'; // Importa el CSS para el pie de página
import React from 'react';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Información de Contacto</h3>
        <p>Creadores: Yaimi Sifonte Marty</p>
        <p>Cargo: Encargada de calidad</p>
        <p>Teléfono: </p>
        <p>Dirección del Hotel: Playa Hermosa, Cayo Paredón, Ciego de Ávila, Cuba</p>
        <p>Referencia: www.ejemplo.com</p>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;