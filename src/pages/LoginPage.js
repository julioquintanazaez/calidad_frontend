import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';

import Login from "./../components/Login";


const LoginPage = () => {	

    const { token, handleLogout } = useContext(UserContext);
    
    return (		
       <>   
            {!token && (				
				<a className="button is-danger" onClick={handleLogout}>
					< Login />
				</a>
			)}	
       </>			
    );  
}

export default LoginPage;