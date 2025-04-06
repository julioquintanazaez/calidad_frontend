import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

export default function EliminarProducto ( props ) {
	
	const { token, setEstadoProductos, handleLogout } = useContext(UserContext);	
	
	const eliminarProducto = async (id) => {			
		
		await axios({
			method: 'delete',
			url: "/producto/eliminar_producto/" + id,			
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Producto eliminado satisfactoriamente");		
				setEstadoProductos("Producto eliminado satisfactoriamente" + Math.random());
				Swal.fire("Producto eliminado satisfactoriamente", "", "success");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});
	}
	
	const handleDeleteSubmit = (event) => {
		event.preventDefault();
		if (props.producto.id_producto != null){
			eliminarProducto(props.producto.id_producto);
		}else{
			Swal.fire("Seleccione un producto para eliminar", "", "success");	
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
