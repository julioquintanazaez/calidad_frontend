import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from '../../context/UserContext';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function ActualizarProductoConsumoModal( props ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, setEstadoProductos, handleLogout } = useContext(UserContext);
	
	const actualizarProductoConsumo = async (id) => {
		
		await axios({
			method: 'put',
			url: "/producto/actualizar_producto_consumo/" + id,
			data: {
				consumo_producto: formik.values.consumo_producto,
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Producto actualizado satisfactoriamente");
				setEstadoProductos("Producto actualizado satisfactoriamente" + Math.random());
				Swal.fire("Producto actualizado satisfactoriamente", "", "success");
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
		if (props.producto.id_producto != null){	
			setShow(true);  
		}else{
			Swal.fire("Seleccione un producto para actualizar", "", "error");
		}
	}
	
	const validationRules = Yup.object().shape({		
		consumo_producto: Yup.string().trim()
			.required("Se requiere el nuevo consumo producto"),
	});
	
	const registerInitialValues = {
		consumo_producto: props.producto.consumo_producto
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Actualizando data...");
			actualizarProductoConsumo(props.producto.id_producto);
			formik.resetForm();
			setShow(false);
			handleClose()
		},
		validationSchema: validationRules
	});
	
	return (
		<>
		<button className="btn btn-info" onClick={handleShow}>
			Consumo 
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Nuevo
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>
				<div className="form-group mt-3" id="consumo_producto">
						<label>Introduzca el consumo del producto</label>
						<input
						  type="text"
						  name="consumo_producto"
						  value={formik.values.consumo_producto}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.consumo_producto && formik.touched.consumo_producto
										? "is-invalid" : "" )}
						  placeholder="Introduzca el consumo del producto"
						/>					
						<div>{(formik.errors.consumo_producto) ? <p style={{color: 'red'}}>{formik.errors.consumo_producto}</p> : null}</div>
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