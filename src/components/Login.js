import "./Login.css";
import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from "react-router";
import { UserContext } from "../context/UserContext";
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from "yup";
import { useFormik } from "formik";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Login = () =>{
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const {token, setToken} = useContext(UserContext);
	const [sending, setSending] = useState(false);
	
	const autenticar_usuario = async () =>{
		
		const form_data = new FormData();
		form_data.append("username",  formik.values.username);
		form_data.append("password", formik.values.password);	
		
		await axios({
			method: 'post',
			url: '/token/',  
			header: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: form_data,			
		}).then(response => {
			if (response.status === 200) {						
				setToken(response.data.access_token);
				console.log(window.localStorage.getItem("recomendador-applicacion-v1.0"));
				setSending(false);
			}
			else{
				window.localStorage.removeItem("recomendador-applicacion-v1.0");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			Swal.fire("Acceso denegado!", error.response.data.detail, "error");
			window.localStorage.removeItem("recomendador-applicacion-v1.0");
		});	 		
	};	
	
	const validationRules = Yup.object().shape({
		username: Yup.string().trim()	
			.min(4, "El usuario debe contener 3 caracteres como mínimo")
			.max(25, "El usuario debe contener 15 caracteres como máximo")
			.required("Se requiere introduzca el nombre de usuario"),
		password: Yup.string()
			.min(7, "La contraseña debe contener 7 caracteres como mínimo")
			.required("Se requiere introduzca la contraseña").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{12,99}$/,
					'La contraseña debe conener 7 caracteres como mínimo, 1 mayúscula, 1 munúscula, 1 caracter especial, y 1 número'),
	});
	
	const registerInitialValues = {
		username: '',
		password: ''
	};
	
	const formik = useFormik({
		initialValues: registerInitialValues,		
		onSubmit: (data) => {
			console.log("Enviando datos...");
			autenticar_usuario();
			formik.resetForm();
			setSending(true);
		},
		validationSchema: validationRules,
	});
	
	const handleClose = () => {
			setShow(false);
		}
		
	const handleShow = () => {
		setShow(true);  
	}

	return (
		<>
		{!token && (
			<>
			<button className="btn btn-success" onClick={handleShow}>
				Autenticarse 
			</button>
			<Modal show={show} onHide={handleClose} size="sm" > 
				<form className="Auth-form" onSubmit={formik.handleSubmit}>
					<div className="Auth-form-content">				
						<h1 className="text-sigin text-center">Autenticarse</h1>
						<label className="label">Usuario</label>
						<div className="form-group mt-3">
							<input
								type="text"
								name="username"
								value={formik.values.username}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className={"form-control mt-1" + 
											(formik.errors.username && formik.touched.username
											? "is-invalid" : "" )}
								placeholder="Entre un nombre de usuario valido"
							/>
							<div>{(formik.errors.username) ? <p style={{color: 'red'}}>{formik.errors.username}</p> : null}</div>
						</div>							
						<label className="label">Contraseña</label>
						<div className="form-group">
							<input
								type="password"
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className={"form-control mt-1" + 
											(formik.errors.password && formik.touched.password
											? "is-invalid" : "" )}
								placeholder="Entre una contraseña valida"
							/>
							<div>{(formik.errors.password) ? <p style={{color: 'red'}}>{formik.errors.password}</p> : null}</div>
						</div>							
						<br/>
						<button className="btn btn-success" 
								type="submit" 
								disabled={sending}>
							{!sending ? "Acceder" : "Esperando"}
						</button>
					</div>
				</form>		
				
			</Modal>
		</>
		)}			
		</>
	);
};

export default Login;
