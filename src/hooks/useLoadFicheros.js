import React, { useEffect, useRef, useState, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import axios from 'axios'; 

export default function useLoadFicheros(){
	
	const { estadoFicheros  } = useContext(UserContext);
	const [ficheros, setFicheros] = useState([]);	
	
	useEffect(() => {
		
		const fetchFicheros = async () =>{
			await axios({
				method: 'get',
				url: '/documents/files/',   
				headers: {
					'accept': 'application/json',
				},                       
			}).then(response => {
				if (response.status === 200) {
					console.log(response.data);
					setFicheros(response.data);
				}else {	
					setIsLoading(false);
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
			});		
		};		
		
		fetchFicheros();
		
	}, [ estadoFicheros ]);

	return ficheros;
};