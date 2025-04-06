import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CardRecomendaciones from "./../../components/CardRecomendaciones";

export default function RecomendacionesModal( props ) {
	
	const { token, handleLogout } = useContext(UserContext);
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const [recomendaciones, setRecomendaciones] = useState([]);
							
	const leerRecomendaciones = async id => {
		
		await axios({
			method: 'get',
			url: "/hacer_recomendaciones_cliente_basicas/" + id,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Se leyeron las recomendaciones satisfactoriamente");	
				console.log(response.data.Result);
				setRecomendaciones(response.data.Result);
			}
		}).catch((error) => {
			if (error.response.status === 505) {
				Swal.fire("No existen datos suficientes para realizar las recomendaciones", "", "error");
				setRecomendaciones([]);
			}else{
				console.error({"message":error.message, "detail":error.response.data.detail});
				handleLogout();
			}
		});				  
	}
  
	const handleClose = () => {
		setShow(false);
	}
	
	const handleShow = () => {
		if (props.cliente.id_cliente != null){
			leerRecomendaciones(props.cliente.id_cliente);
			setShow(true); 			
		} else{
			Swal.fire("Seleccione un cliente para realizar las recomendaciones", "", "error");	
		}
	}	
	
	return (
		<>
		<button className="btn btn-success" onClick={handleShow}>
			Recomendaciones
		</button>
		<Modal show={show} onHide={handleClose} size="lg" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					<div className="col">
						Recomendaciones de productos para cliente: {" "}
						<span className="badge bg-info">{props.cliente.cli_nombre}</span> 
						<span className="badge bg-warning">{props.cliente.cli_nacionalidad}</span> 
					</div>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>			
			{recomendaciones.length > 0 ? (
				< CardRecomendaciones recomendaciones={recomendaciones} />
			) : (
				<span className="badge bg-warning">No existen datos para realizar recomendaciones al usuario {props.cliente.cli_nombre}</span> 
			)}			
			</Modal.Body>
			<Modal.Footer>		
				<Button className="btn btn-secondary" variant="secondary" onClick={handleClose}>
					Close
				</Button>	  
			</Modal.Footer>
			</Modal>
		</>
	);
}