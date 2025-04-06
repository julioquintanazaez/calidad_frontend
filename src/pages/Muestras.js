import '../styles/Muestras.css'; 
import React, {useState, useEffect, useContext} from 'react';

import FileList from './../components/FileList';
import FileUpload from './../components/FileUpload';

const Muestras = () => {	

    
    return (		
        <div className="container">
            <div className="products-list">
                <h5>Ficheros para descargar</h5>
                <div className="grid">
                    <div>
                        <FileList />
                    </div>                    
                </div>
            </div>
        </div>				
    );  
}

export default Muestras;