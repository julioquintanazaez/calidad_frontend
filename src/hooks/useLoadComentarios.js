import React, { useEffect, useRef, useState, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import axios from 'axios'; 

export default function useLoadComentarios( id ){
	
	const { estadoFicheros, estadoComentarios, handleLogout  } = useContext(UserContext);
	const [comentarios, setComentarios] = useState([]);	
	
	useEffect(() => {
		
		const fetchComentarios = async ( id ) =>{
			await axios({
				method: 'get',
				url: `/comentarios/comentario/${id}/todos/`,   
				headers: {
					'accept': 'application/json',
				},                       
			}).then(response => {
				if (response.status === 201) {
					console.log(response.data);
					setComentarios(response.data);
				}else {	
                    setComentarios([]);
					handleLogout();
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
                handleLogout();
			});		
		};		
		
		fetchComentarios();
		
	}, [ estadoFicheros, estadoComentarios ]);

	return comentarios;
};