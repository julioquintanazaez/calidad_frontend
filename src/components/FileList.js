import "../styles/Documentspanel.css";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { UserContext } from './../context/UserContext';
import Swal from 'sweetalert2';
import { BiDownload, BiTrash  } from 'react-icons/bi';
import FileUpload from './../components/FileUpload';

//import TablaComentarios from "../utils/comentarios/TablaComentarios";
import CrearComentarioModal from "../utils/comentarios/CrearComentarioModal";
import DataTable from "./DataTable";

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

  //<h5>{file.description || 'Sin descripción'}</h5>
  return (
    <div className="file-list-container">
      <h5>Archivos Disponibles</h5>
      {token && (
      <div className="upload-section">
          <FileUpload />
      </div>
      )}
      {files.length === 0 ? (
        <p>No hay archivos disponibles</p>
      ) : (
        <ul className="file-list">
          {files.map((file) => (
            <li key={file.id} className="file-item">
              <div className="file-info">
                <h5>{file.name}</h5>
                <hr/>                
              </div>
              <div className="file-actions">
                <CrearComentarioModal file={ file } />
                <button 
                  className="btn btn-success"
                  onClick={() => handleDownload(file.id, file.file_path)}>
                  <BiDownload />
                </button>
                {token && (
                  <>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(file.id)}>
                    <BiTrash />
                  </button>
                  <DataTable file={ file } />
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FileList;