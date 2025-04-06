import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { UserContext } from './../context/UserContext';
import Swal from 'sweetalert2';

function FileList() {
  
  const {	token, estadoFicheros, setEstadoFicheros, handleLogout } = useContext(UserContext);	
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('/documents/files/');
        setFiles(response.data);
      } catch (err) {
        setError('Error al cargar los archivos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, [estadoFicheros]);

  const handleDownload = async (fileId, fileName) => {
    try {
      const response = await axios.get(
        `/documents/files/${fileId}/download`,
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      // Revocar el objeto URL después de la descarga
      window.URL.revokeObjectURL(url);
      link.remove();
    } catch (err) {
      console.error('Error al descargar el archivo:', err);
    }
  };

  const handleDelete = async (fileId) => {
    await axios({
			method: 'delete',
			url: `/documents/files/${fileId}/delete`,			
			headers: {
				'accept': 'application/json',
				//'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 200) {
				setEstadoFicheros("Fichero eliminado satisfactoriamente" + Math.random());
				Swal.fire("Fichero eliminado satisfactoriamente", "", "success");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});
  };

  if (isLoading) return <p>Cargando archivos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Archivos Disponibles</h2>
      {files.length === 0 ? (
        <p>No hay archivos disponibles</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              <h3>{file.name}</h3>
              <p>{file.description || 'Sin descripción'}</p>
              <button onClick={() => handleDownload(file.id, file.file_path)}>
                Descargar
              </button>
              <button onClick={() => handleDelete(file.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FileList;