import "../styles/FileManager.css";
import React, {useState, useEffect, useContext} from 'react';

import FileList from './../components/FileList';
import FileUpload from './../components/FileUpload';

const Muestras = () => {	

    
    return (		
        <div className="grid">
            <div className="list-section">
                <FileList />
            </div>
        </div>		
    );  
}

export default Muestras;