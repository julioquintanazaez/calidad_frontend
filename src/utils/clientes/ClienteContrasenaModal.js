import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function ContrasenaClienteModal( props ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, user, setEstadoUsuarios, handleLogout } = useContext(UserContext);
	
	const actualizarCliente = async (id) => {
		
		await axios({
			method: 'put',
			url: "/usuario/actualizar_usuario/" + id,
			data: {
				newpassword : formik.values.newpassword,
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Cliente actualizado satisfactoriamente");	
				setEstadoUsuarios("Cliente actualizado satisfactoriamente" + Math.random());
				Swal.fire("Cliente actualizado satisfactoriamente", "", "success");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setShow(false);
	}
	
	const handleShow = () => {
		if (props.cliente.id != null){	
			setShow(true);  
		}else{
			Swal.fire("Seleccione un cliente para actualizar", "", "error");
		}
	}
	
	const validationRules = Yup.object().shape({		
		actual: Yup.string().trim()
			.required("Se requiere el nombre"),
        newpassword: Yup.string().trim()
			.required("Se requiere seleccione el rol")
	});
	
	const registerInitialValues = {
		usuario: props.cliente.usuario,
		role: props.cliente.role.toString().replace(",", "-"),
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Actiualizando datos...");
			actualizarCliente(props.cliente.id);
			formik.resetForm();
			setShow(false);
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
		<button className="btn btn-success" onClick={handleShow}>
			Actualizar 
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Cliente 
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>
					<div className="form-group mt-3" id="usuario">
						<label>Introduzca nuevo nombre para el cliente</label>
						<input
						  type="text"
						  name="usuario"
						  value={formik.values.usuario}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.usuario && formik.touched.usuario
										? "is-invalid" : "" )}
						  placeholder="Introduzca el nombre del cliente"
						/>					
						<div>{(formik.errors.usuario) ? <p style={{color: 'red'}}>{formik.errors.usuario}</p> : null}</div>
					</div>		
					<div className="form-group mt-3" id="role">
						<label>Seleccione el role a desempeñar para el cliente del sistema</label>
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
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-success">
								Actualizar
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