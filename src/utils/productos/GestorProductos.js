import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

import useLoadProductos from "../../hooks/useLoadProductos";
import ProductosTabla from "./../../utils/productos/ProductosTabla";
import CrearProductoModal from "./../../utils/productos/CrearProductoModal";


export default function GestorProducto( ) {
	
	const { token, 
			handleLogout
		 } = useContext(UserContext);
	
	const productos = useLoadProductos();

	return (
		<>
			<div className="col">
			{(productos.length > 0) ? (				
				<div className="col">							
					< ProductosTabla />
				</div>				
			) : (
				<span className="badge bg-info">No existen productos para mostrar </span>
			)}
			</div>
			<div className="col">
				< CrearProductoModal />
			</div>
		</>
	);
	
}