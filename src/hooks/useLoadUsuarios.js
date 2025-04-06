import React, { useEffect, useRef, useState, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import axios from 'axios'; 

export default function useLoadUsuarios(){
	
	const {token, handleLogout, estadoUsuarios
		   } = useContext(UserContext);
	const [clientes, setClientes] = useState([]);	
	
	useEffect(() => {
		
		const fetchClientes = async () =>{
			await axios({
				method: 'get',
				url: '/usuario/leer_usuarios/',                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 201) {
					//console.log(response.data);
					setClientes(response.data);
				}else {	
					setClientes([]);
					handleLogout();
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
				handleLogout();
			});		
		};		
		
		fetchClientes();
		
	}, [ estadoUsuarios ]);
	
	return clientes;
};