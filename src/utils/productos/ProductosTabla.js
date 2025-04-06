import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';

import ActualizarProductoModal from "./../../utils/productos/ActualizarProductoModal";
import EliminarProducto from "./../../utils/productos/EliminarProducto";
import ActualizarProductoConsumoModal from "./../../utils/productos/ActualizarProductoConsumoModal";
import useLoadProductos from "./../../hooks/useLoadProductos";
		
export default function ProductosTabla ( ) {

	const {	token } = useContext(UserContext);	
	const productos = useLoadProductos();

	const renderTablaData = () => {
		
		return productos?.map((producto, index) => (
				<tr className="row-md" key={producto.id_producto}>
					<th scope="row">{index + 1}</th>
					<td>{producto.nombre_producto}</td>	
					<td>{producto.desc_producto}</td>	
					<td>{producto.consumo_producto}</td>	
					<td>
						<ActualizarProductoModal producto={producto}/>
						<EliminarProducto producto={producto}/>
						<ActualizarProductoConsumoModal producto={producto}/>
					</td>	
				</tr>					
			));
		}

	return (
		<div className="col">            	
            <table className="table table-striped table-bordered" responsive="true">
				<thead className="table-light">
					<tr>
						<th scope="col">#</th>	
						<th scope="col">Nombre</th>	
						<th scope="col">Descripción</th>
						<th scope="col">Consumo</th>
						<th scope="col">Gestión</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">						
					{renderTablaData()}								
				</tbody>
			</table>  
        </div>
	);  
}

