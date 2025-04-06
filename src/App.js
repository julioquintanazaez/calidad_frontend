import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ProtectedRoute } from './router/ProtectedRoute';
import { UserContext } from "./context/UserContext";

import BarraMenuesNavegacion from "./components/BarraMenuesNavegacion";
import Inicio from './pages/Inicio.js';
import Usuarios from './pages/Usuarios.js';
import Muestras from './pages/Muestras.js';

const App = () => {	
	
	const {token, roles} = useContext(UserContext); 
	
	return (
		<>				
			<BarraMenuesNavegacion />			
			{token && (				
				<div className="columns">							
					<Routes>
						<Route index element={<Inicio />} />
						<Route path="/" element={<Inicio />} />	
						<Route element={<ProtectedRoute isAllowed={ roles.includes("admin") } />}>
							<Route path="/usuarios" element={< Usuarios />} />
						</Route>			
					</Routes>						
				</div>
			)}
			{!token && (		
				<>
					<Muestras />
				</>
			)}		
		</>
	);
};

export default App;