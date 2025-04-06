import "./styles/Card.css";
import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from "react-router";
import { UserContext } from "../context/UserContext";

export default function CardRecomendaciones ( props ) {	
	
	const { token } = useContext(UserContext);
	
	return (
		<>
			{token && (
				props.recomendaciones.map((recomendacion, index) => (
					<div className="card" style={{"with": "18rem;"}}>
						<div className="card-body">
							<h6 className="card-subtitle mb-2 text-muted"> {recomendacion[0]} </h6>							
						</div>
					</div>
				))
			)}
		</>	
	);
}