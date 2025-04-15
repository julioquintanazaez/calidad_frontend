import React from 'react';
import Button from 'react-bootstrap/Button';

const DropComponent = ({ onToggle }) => {
  const toggleValue = () => {
    // Cambia el valor booleano (por ejemplo, de falso a verdadero)
    onToggle(true); // o onToggle(false) según sea necesario
  };

  return (
      <div>
        <button onClick={toggleValue}>Activar</button>
      </div>
  );
};
export default DropComponent;
