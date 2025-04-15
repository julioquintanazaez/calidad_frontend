import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from './../../context/UserContext';
import { BiCloud } from 'react-icons/bi';


export default function CloudWords  (  ) {
    
    const { token, handleLogout } = useContext(UserContext);	
    
    const calcularCloudWords = async () => {
      try {
          const response = await axios.get(
              `/comentarios/comentario/wordcloud/`,
              {
                  headers: {
                      'accept': 'application/json',
                      'Authorization': "Bearer " + token,
                  },
                  responseType: 'blob' // 'blob' en lugar de 'blob' (ambos funcionan, pero es mejor usar 'blob')
              }
          );
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', "wordcloud.png");
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          link.remove();
      } catch (err) {
          console.error('Error al descargar el archivo:', err);
          handleLogout();
      }
    };
    
    const handleDeleteSubmit = (event) => {
        event.preventDefault();
        calcularCloudWords();
        console.log("Creando nube de palabra.....")
    }
    
    return (	
        <>	
        {token && (			
            <button type="submit" 
                    className="btn btn-info"
                    onClick={(e) => handleDeleteSubmit(e)} > 
                    Wordcloud <BiCloud />
            </button>
        )}
        </>
    );
}
