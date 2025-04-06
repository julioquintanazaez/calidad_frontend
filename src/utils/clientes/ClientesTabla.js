import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';

import ActualizarClienteModal from "./../../utils/clientes/ActualizarClienteModal";
import EliminarCliente from "./../../utils/clientes/EliminarCliente";

const ClientesTabla = ( props ) => {

	const {	token } = useContext(UserContext);	
		
	
	const renderTablaData = () => {
		
		return props.clientes?.map((cliente, index) => (
				<tr className="row-md" key={cliente.id_cliente}>
					<th scope="row">{index + 1}</th>
					<td>{cliente.usuario}</td>	
					<td>{cliente.role[0]}</td>	
					<td>
						<ActualizarClienteModal cliente={cliente}/>
						<EliminarCliente cliente={cliente}/>
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
						<th scope="col">Role</th>
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

export default ClientesTabla;