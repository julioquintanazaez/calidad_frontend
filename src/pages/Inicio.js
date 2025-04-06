import "../styles/FileManager.css";
import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';

import FileList from './../components/FileList';
import FileUpload from './../components/FileUpload';

const Inicio = () => {	

	const { token, handleLogout } = useContext(UserContext);
		
	return (		
        <div className="list-section">
            <FileList />
        </div>
    );  

}

export default Inicio;
