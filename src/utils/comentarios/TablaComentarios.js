import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import EliminarComentario from './EliminarComentario';
        
export default function TablaComentarios ( props ) {

    const {	token, handleLogout } = useContext(UserContext);	
    const [comentarios, setComentarios] = useState([]);	
    const [show, setShow] = useState(false);

    const fetchComentarios = async ( id ) =>{
        await axios({
            method: 'get',
            url: `/comentarios/comentario/${id}/todos/`,                         
            headers: {
                'accept': 'application/json',
                'Authorization': "Bearer " + token,  
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

    const handleClose = () => {
		setShow(false);
	}
	
	const handleShow = () => {	
        if (props.file.id != null){	
            fetchComentarios( props.file.id )	
            setShow(true);  
        }else{
            Swal.fire("Seleccione un documento para mostrar comentarios", "", "error");
        }
	}

    const renderTablaData = () => {
        return comentarios?.map((comentario, index) => (
                <tr className="row-md" key={comentario.id_comentario}>
                    <th scope="row">{index + 1}</th>
                    <td>{comentario.comentario}</td>	
                    <td>{comentario.fecha_comentario}</td>	
                    <td>
                        <EliminarComentario comentario={ comentario }  />
                    </td>	
                </tr>					
            ));
        }
    

    return (
        <>
        <button className="btn btn-info" onClick={handleShow} >
			Ver
		</button>
		<Modal show={show} onHide={handleClose} size="lg" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Comentarios
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
                <div className="col">            	
                    <table className="table table-striped table-bordered" responsive="true">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">#</th>	
                                <th scope="col">Comentarios</th>	
                                <th scope="col">Fecha</th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">						
                            {renderTablaData()}								
                        </tbody>
                    </table>  
                </div>
                </Modal.Body>
                <Modal.Footer>		
                    <Button className="btn btn-secondary" variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>	  
                </Modal.Footer>
			</Modal>
		</>
    );  
}

//<EliminarProducto producto={producto}/>