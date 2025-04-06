import "../styles/FileManager.css";
import React, {useState, useEffect, useContext} from 'react';

import FileList from './../components/FileList';

const Muestras = () => {	

    
    return (		
        <div className="list-section">
            <FileList />
        </div>
    );  
}

export default Muestras;