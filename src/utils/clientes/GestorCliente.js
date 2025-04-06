import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/GestorUsuarios.css";
import React, { useContext } from "react";
import { UserContext } from './../../context/UserContext';

import useLoadUsuarios from "../../hooks/useLoadUsuarios";
import ClientesTabla from "./../../utils/clientes/ClientesTabla";

export default function GestorCliente( props ) {
	
	const { token } = useContext(UserContext);
	
	const clientes = useLoadUsuarios();
	
	return (
		<>
			<div class="contenedor">
				<div class="tabla-container">
					<div className="tabla">
					{(clientes.length > 0) ? (				
						< ClientesTabla clientes={clientes}/>			
					) : (
						<span className="badge bg-info">No existen clientes para mostrar </span>
					)}
					</div>
				</div>
			</div>
		</>
	);
	
}