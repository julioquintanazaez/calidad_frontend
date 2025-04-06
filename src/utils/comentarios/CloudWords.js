import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';
import { BiTrash } from 'react-icons/bi';


export default function CloudWords  (  ) {
    
    const { token, handleLogout } = useContext(UserContext);	
    
    const calcularCloudWords = async (fileId, fileName) => {
        try {
            const response = await axios.get('/comentarios/comentario/sumario', {
            headers: {
                'accept': 'application/json',
                'Authorization': "Bearer " + token,
            }},             
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
            handleLogout();
        }
    };
    
    const handleDeleteSubmit = (event) => {
        event.preventDefault();
        //calcularCloudWords();
        console.log("Creando nube de palabra.....")
    }
    
    return (	
        <>	
        {token && (			
            <button type="submit" 
                    className="btn btn-danger"
                    onClick={(e) => handleDeleteSubmit(e)} > 
                    <BiTrash />
            </button>
        )}
        </>
    );
}
