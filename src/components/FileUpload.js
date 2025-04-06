import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './../context/UserContext';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

function FileUpload() {

  const { token, setEstadoFicheros } = useContext(UserContext);	
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file || !name) {
      setMessage('Nombre y archivo son requeridos');
      return;
    }

    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    if (description) formData.append('description', description);

    try {
      const response = await axios.post('/documents/files/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
				  'Authorization': "Bearer " + token,
        }
      });
      setMessage('Archivo subido exitosamente!');
      // Reset form
      setName('');
      setDescription('');
      setFile(null);
      setEstadoFicheros("Ficheros cambian" + Math.random())
    } catch (error) {
      //setMessage(`Error: ${error.response?.data?.detail || error.message}`);
      Swal.fire(`${error.response?.data?.detail || error.message}`, "", "success");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
		setShow(false);
	}
	
	const handleShow = () => {		
		setShow(true);  
	}

  return (

    <>
		<button className="btn btn-info" onClick={handleShow}>
      Subir Archivo de Texto
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					  Subir
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label>Descripción:</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
              />
            </div>
            <div>
              <label>Archivo:</label>
              <input 
                type="file" 
                onChange={(e) => setFile(e.target.files[0])} 
                accept=".txt,.text" 
                required 
              />
            </div>
            <button type="submit" disabled={isUploading}>
              {isUploading ? 'Subiendo...' : 'Subir Archivo'}
            </button>
          </form>
        </div>
        </Modal.Body>
			<Modal.Footer>		
				<Button className="btn btn-secondary" variant="secondary" onClick={handleClose}>
					Cerrar
				</Button>	  
			</Modal.Footer>
			</Modal>
		</>
  );
}

export default FileUpload;