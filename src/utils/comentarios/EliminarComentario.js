import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';
import { BiTrash } from 'react-icons/bi';

export default function EliminarComentario  ( props ) {
	
	const { token, setEstadoComentarios, handleLogout } = useContext(UserContext);	
	
	const eliminarComentario = async (id) => {			
		
		await axios({
			method: 'delete',
			url: "/comentarios/comentario/delete/" + id,			
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Comentario eliminado satisfactoriamente");		
				setEstadoComentarios("Comentario eliminado satisfactoriamente" + Math.random());
				Swal.fire("Comentario eliminado satisfactoriamente", "", "success");
				closeValue()
                //props.setShow(False);
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});
	}
	
	const handleDeleteSubmit = (event) => {
		event.preventDefault();
		if (props.comentario.id_comentario != null){
			eliminarComentario(props.comentario.id_comentario);
		}else{
			Swal.fire("Seleccione un comentario para eliminar", "", "success");	
		}
	}

	const closeValue = () => {
		props.onClose(false); 
	};
	
	return (	
		<>			
			<button type="submit" 
					className="btn btn-danger"
					onClick={(e) => handleDeleteSubmit(e)} > 
					<BiTrash />
			</button>
		</>
	);
}
