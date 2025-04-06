import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

import useLoadUsuarios from "../../hooks/useLoadUsuarios";
import ClientesTabla from "./../../utils/clientes/ClientesTabla";
import CrearClienteModal from "./../../utils/clientes/CrearClienteModal";

export default function GestorCliente( props ) {
	
	const { token, 
			estadoUsuarios, 
			handleLogout } = useContext(UserContext);
	
	const clientes = useLoadUsuarios();
	
	return (
		<>
			<div className="col">
			{(clientes.length > 0) ? (				
				<div className="col">							
					< ClientesTabla clientes={clientes}/>			
				</div>				
			) : (
				<span className="badge bg-info">No existen clientes para mostrar </span>
			)}
			</div>
			<div className="col">
				< CrearClienteModal />
			</div>
		</>
	);
	
}