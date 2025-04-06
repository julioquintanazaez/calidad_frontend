import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

export default function EliminarCliente  ( props ) {
	
	const { token, setEstadoUsuarios, handleLogout } = useContext(UserContext);	
	
	const eliminarCliente = async (id) => {			
		
		await axios({
			method: 'delete',
			url: "/usuario/eliminar_usuario/" + id,			
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Cliente eliminado satisfactoriamente");		
				setEstadoUsuarios("Cliente eliminado satisfactoriamente" + Math.random());
				Swal.fire("Cliente eliminado satisfactoriamente", "", "success");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});
	}
	
	const handleDeleteSubmit = (event) => {
		event.preventDefault();
		if (props.cliente.id != null){
			eliminarCliente(props.cliente.id);
		}else{
			Swal.fire("Seleccione un cliente para eliminar", "", "success");	
		}
	}
	
	return (	
		<>			
			<button type="submit" 
					className="btn btn-danger"
					onClick={(e) => handleDeleteSubmit(e)} > 
					Eliminar
			</button>
		</>
	);
}
