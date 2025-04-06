import React, { useContext } from 'react';

import { UserContext } from "../context/UserContext";
import { BiLogOut } from 'react-icons/bi';

const Logout = () => {
	
	const {token, handleLogout} = useContext(UserContext); 
	
	return (
		<>		
			{token && (		
				<button 
						className="btn btn-sm btn-danger ml-2 mr-2"
						onClick={handleLogout}>
							< BiLogOut />
				</button>		
				//<a className="button is-danger" onClick={handleLogout}>
				//	Salir
				//</a>
			)}	
		</>
	);
};

export default Logout;