import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../context/UserContext';
import Logout from "./Logout";
import { Navigate } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router";

import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";

import Login from "./../components/Login";
import Inicio from "./../components/BtnInicio";
import logo from '../assets/logo.png'; 
import CloudWords from '../utils/comentarios/CloudWords';

const BarraMenuesNavegacion = ( props ) => {
	
	const { token, usuarioactual, roles } = useContext(UserContext);	
	
	return (
		<>	
			<div className="container-fluid-md">	
				<div className="columns">
					<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="warning">
						<Container>
							<img src={logo} alt="Logo" style={{ height: '50px', marginRight: '20px' }} />
							<Navbar.Brand href="#inicio">
								Gestión de calidad
							</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="me-auto">
									{roles.includes("admin") && (
									<LinkContainer to="/usuarios">
										<Nav.Link>Panel de administración</Nav.Link>
									</LinkContainer>
									)}									
								</Nav>
								<CloudWords />
								<Inicio token={token} redirectUrl="/" />
								<Login />
								<Logout />
							</Navbar.Collapse>
						</Container>
					</Navbar>						
				</div>				
			</div>	
		</>		
	);
};

export default BarraMenuesNavegacion;