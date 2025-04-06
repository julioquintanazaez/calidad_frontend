import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function CrearClienteModal( props ) {
	
	const { token, setEstadoUsuarios, handleLogout } = useContext(UserContext);	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	
	const roles_de_usuario = [
		{ value: "admin-usuario", label: "admin" },
		{ value: "usuario", label: "usuario" }
	];

	const crearCliente = async () => {
		
		await axios({
			method: 'post',
			url: "/usuario/crear_usuario/",
			data: {
				usuario : formik.values.usuario,
				role : formik.values.role.split("-"),
				hashed_password: formik.values.hashed_password,
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Cliente del sistema creado satisfactoriamente");	
				setEstadoUsuarios("Cliente del sistema creado satisfactoriamente" + Math.random());
				Swal.fire("Cliente del sistema creado satisfactoriamente", "", "success");
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
		setShow(true);  
	}
	
	const validationRules = Yup.object().shape({		
		usuario: Yup.string().trim()
			.required("Se requiere el nombre"),
		role: Yup.string().trim()
			.required("Se requiere seleccione un rol"),
		hashed_password: Yup.string()
			.min(5, "Password debe contener al menos 3 caracteres")
			.required("Se requiere el password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{12,99}$/,
					'Debe contener al menos 5 caracteres, 1 mayáscula, 1 miníscila, 1 caracter especial, y 1 número'),	
	});
	
	const registerInitialValues = {
		usuario: "",
		role: "usuario",
		hashed_password: "",
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Guardar datos...");
			crearCliente();
			formik.resetForm();
			handleClose();
		},
		validationSchema: validationRules
	});
	
	
	const RenderOptions = (listValues) => {
		return (
			listValues.map(item => 
				<option value={item.value} label={item.label}>{item.value}</option>
			) 
		)
	};

	return (
		<>
		<button className="btn btn-info" onClick={handleShow}>
			Datos del usuario
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Nuevo
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>
					<div className="form-group mt-3" id="usuario">
						<label>Introduzca el usuario</label>
						<input
						  type="text"
						  name="usuario"
						  value={formik.values.usuario}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.usuario && formik.touched.usuario
										? "is-invalid" : "" )}
						  placeholder="Introduzca el usuario del cliente"
						/>					
						<div>{(formik.errors.usuario) ? <p style={{color: 'red'}}>{formik.errors.usuario}</p> : null}</div>
					</div>		
					<div className="form-group mt-3" id="role">
						<label>Seleccione el role a desempeñar para el usuario del sistema</label>
						<select
						  type="text"
						  name="role"
						  value={formik.values.role}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.role && formik.touched.role
										? "is-invalid" : "" )
									}>
							{RenderOptions(roles_de_usuario)} 
						</select>
						<div>{(formik.errors.role) ? <p style={{color: 'red'}}>{formik.errors.role}</p> : null}</div>
					</div>		
					<div className="form-group mt-3" id="hashed_password">
						<label>Introduzca una contraseña para el usuario</label>
						<input
						  type="password"
						  name="hashed_password"
						  value={formik.values.hashed_password}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.hashed_password && formik.touched.hashed_password
										? "is-invalid" : "" )}
						  placeholder="Contraseña del usuario"
						/>					
						<div>{(formik.errors.hashed_password) ? <p style={{color: 'red'}}>{formik.errors.hashed_password}</p> : null}</div>
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