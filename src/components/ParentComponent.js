import React, { useState } from 'react';
import DropComponent from './DropComponent';

const ParentComponent = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = (value) => {
    setIsActive(value);
  };

  return (
    <div>
      <h1>Estado: {isActive ? 'Activo' : 'Inactivo'}</h1>
      <DropComponent onToggle={handleToggle} />
    </div>
  );
};

export default ParentComponent;
