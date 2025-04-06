import "../styles/PanelUsuarios.css";
import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';

import GestorCliente from "./../utils/clientes/GestorCliente";

const Clientes = () => {	

	const { token, handleLogout } = useContext(UserContext);
	
	return (	
		<>
			<div className="contenedor-usuarios">
				< GestorCliente />
			</div>
		</>
	);  
}

export default Clientes;
