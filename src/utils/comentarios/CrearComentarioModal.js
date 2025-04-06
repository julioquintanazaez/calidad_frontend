import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BiComment  } from 'react-icons/bi';

export default function CrearComentarioModal( props ) {
	
	const { token, setEstadoComentarios, handleLogout } = useContext(UserContext);	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	
	const crearComentario = async ( id ) => {
		
		await axios({
			method: 'post',
			url: "/comentarios/comentario/",
			data: {
				comentario : formik.values.comentario,
				documento_id: id,
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Comentario creado satisfactoriamente");	
				setEstadoComentarios("Comentario creado satisfactoriamente" + Math.random());
				Swal.fire("Comentario creado satisfactoriamente", "", "success");
			}
		}).catch((error) => {
			if (error.response.status === 500) {
				Swal.fire("Datos exisaten en la base de datos", "", "success");
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
        if (props.file.id != null){	
            setShow(true);  
        }else{
            Swal.fire("Seleccione un documento para mostrar comentarios", "", "error");
        }
    }
	
	const validationRules = Yup.object().shape({		
		comentario: Yup.string().trim()
			.required("Se requiere que introduzca un comentario"),
	});
	
	const registerInitialValues = {
		comentario: "",
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Guardar datos...");
			crearComentario( props.file.id );
			formik.resetForm();
			handleClose();
		},
		validationSchema: validationRules
	});
	
	
	return (
		<>
		<button className="btn btn-info" onClick={handleShow}>
			<BiComment />
		</button>
		<Modal show={show} onHide={handleClose} size="lg" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Comentario
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>
					<div className="form-group mt-3" id="comentario">
						<label>Introduzca su observación</label>
						<textarea
						  rows="3"
						  name="comentario"
						  value={formik.values.comentario}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.comentario && formik.touched.comentario
										? "is-invalid" : "" )}
						  placeholder="Introduzca su observación sobre los pricipales aspectos encontrados"
						>	
						</textarea>
						<div>{(formik.errors.comentario) ? <p style={{color: 'red'}}>{formik.errors.comentario}</p> : null}</div>
					</div>		
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-success">
                            Guardar
						</button>					
					</div>		
				</form>
			
			</Modal.Body>
			<Modal.Footer>		
				<Button className="btn btn-secondary" variant="secondary" onClick={handleClose}>
					Cerrar
				</Button>	  
			</Modal.Footer>
			</Modal>
		</>
	);
}