import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';

import FileList from './../components/FileList';
import FileUpload from './../components/FileUpload';

const Inicio = () => {	

	const { token, handleLogout } = useContext(UserContext);
	

		
	return (		
        <div className="container">
            <div className="products-list">
                <h5>Ficheros para descargar</h5>
                <div className="grid">
                    <div>
                        <FileUpload />
                    </div>
                    <div>
                        <FileList />
                    </div>      
                </div>
            </div>
        </div>				
    );  

}

export default Inicio;
