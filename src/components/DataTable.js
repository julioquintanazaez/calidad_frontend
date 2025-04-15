import "../styles/DataTable.css";
import React, {useState, useEffect, useContext, useMemo} from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';

import { BiCommentCheck  } from 'react-icons/bi';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import EliminarComentario from '../utils/comentarios/EliminarComentario';
import SearchBar from './SearchBar';

const DataTable = ( props ) => {
    const [selectedIndices, setSelectedIndices] = useState([]);
    const {	token, handleLogout } = useContext(UserContext);	
    const [show, setShow] = useState(false);
    const [comentarios, setComentarios] = useState([]);	
    const [filteredComentarios, setFilteredComentarios] = useState([]);
    //const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    // Opciones de filtrado (personaliza según tus necesidades)
    const filterOptions = [
        { value: 'all', label: 'Todos los campos' },
        { value: 'comentario', label: 'Comentario' },
        { value: 'fecha', label: 'Fecha(no_disp)' },
        { value: 'polaridad', label: 'Polaridad(no_disp)' }
        // Agrega más campos según tu tabla
    ];

    const fetchComentarios = async ( parentIndex ) =>{
        await axios({
            method: 'get',
            url: `/comentarios/comentario/${parentIndex}/todos/`,                         
            headers: {
                'accept': 'application/json',
                'Authorization': "Bearer " + token,  
            },
        }).then(response => {
            if (response.status === 201) {
                console.log(response.data);
                setComentarios(response.data);
                setFilteredComentarios(response.data);
            }else {	
                setComentarios([]);
                setFilteredComentarios([]);
                handleLogout();
            }
        }).catch((error) => {
            console.error({"message":error.message, "detail":error.response.data.detail});
            handleLogout();
        });		
    };	

    // Función para manejar la búsqueda
    const handleSearch = (term, filter) => {
        if (!term.trim()) {
            setFilteredComentarios(comentarios);
            return;
        }
        const lowercasedTerm = term.toLowerCase();
        const filtered = comentarios.filter(item => {
          if (filter === 'all') {
                // Busca en todos los campos
                return Object.values(item).some(
                val => val && val.toString().toLowerCase().includes(lowercasedTerm)
                );
            } else {
                // Busca en el campo específico
                const fieldValue = item[filter];
                return fieldValue && fieldValue.toString().toLowerCase().includes(lowercasedTerm);
            }
        });
        setFilteredComentarios(filtered);
    };

    
    const handleCheckboxChange = (index) => {
        setSelectedIndices((prev) =>
        prev.includes(index)
            ? prev.filter((i) => i !== index)
            : [...prev, index]
        );
    };

    const handleDelete = async () => {
        if (comentarios.length > 0){
            try {
            const response = await axios.delete('/comentarios/comentario/delete-items/', {
                data: { indices: selectedIndices, documento_id: props.file.id },
            });
            console.log(response.data);
            // Aquí puedes actualizar el estado de los items si es necesario
            handleClose();
            } catch (error) {
            console.error("Error deleting items:", error);
                Swal.fire("Debe seleccionar comentarios de la lista", "", "error");
            }
        }else{
            Swal.fire("No existen comentarios de la lista", "", "error");
        }
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

    // Cálculos para la paginación
    const totalItems = filteredComentarios.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredComentarios.slice(startIndex, endIndex);
    }, [filteredComentarios, currentPage, itemsPerPage]);

    // Cambiar página
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        }
    };

    // Cambiar items por página
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Volver a la primera página
    };

    const getDate = (fechaCompleta) => {
        const [fecha, hora] = fechaCompleta.split("T");
        return { fecha, hora };
    }

    const getPolaridadEstilos = (valor) => {
        const [etiqueta, valorNumerico] = valor.split('_');
        let fondo;
        let texto = '#000000'; // Establecemos el texto en blanco para todos

        switch (etiqueta) {
        case 'neg':
            fondo = '#FF0000'; // Rojo
            break;
        case 'pos':
            fondo = '#00FF00'; // Verde
            break;
        default:
        case 'neu':
            fondo = '#CCCCCC'; // Gris
            break;
        }
    
        return { valorNumerico, fondo, texto };
    };
    

    const renderTablaData = () => {
        return currentItems?.map((comentario, index) => (
            <tr className="row-md" key={comentario.id_comentario}>
                <th scope="row">{index + 1}</th>
                <td>
                    <input
                    type="checkbox"
                    checked={selectedIndices.includes(comentario.id_comentario)}
                    onChange={() => handleCheckboxChange(comentario.id_comentario)}
                    />
                </td>
                <td>{comentario.comentario}</td>	
                <td>{getDate(comentario.fecha_comentario).fecha}</td>	
                <td>
                    <span
                         style={{
                            backgroundColor: getPolaridadEstilos(comentario.pensamiento).fondo, // Color de fondo
                            color: getPolaridadEstilos(comentario.pensamiento).texto, // Color de texto (blanco)
                            padding: '2px 4px', // Opcional, para dar un poco de relleno
                            borderRadius: '2px' // Opcional, para suavizar esquinas
                          }}
                    >
                        {getPolaridadEstilos(comentario.pensamiento).valorNumerico}
                    </span>
                </td>	
                <td>
                    <EliminarComentario comentario={ comentario } onClose={handleClose} />
                </td>
            </tr>					
        ));
    }

  return (
    <>
        <button className="btn btn-secondary" onClick={handleShow} >
			<BiCommentCheck />
		</button>
		<Modal show={show} onHide={handleClose} size="lg" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Comentarios
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
                <SearchBar onSearch={handleSearch} filterOptions={filterOptions}/>

                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Mostrar:</label>
                    <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="border rounded px-2 py-1 text-sm"
                    >
                        {[5, 10, 20, 50, 100].map(size => (
                        <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                    <span className="text-sm text-gray-600">registros</span>
                </div>

                <div className="col">            	
                    <table className="table table-striped table-bordered" responsive="true">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">#</th>	
                                <th scope="col">Marca</th>	
                                <th scope="col">Comentarios</th>
                                <th scope="col">Polaridad</th>	
                                <th scope="col">Fecha</th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">						
                            {renderTablaData()}								
                        </tbody>
                    </table>  
                </div>

                {/* Paginación */}
                <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
                    <div className="text-sm text-gray-600">
                    Mostrando {((currentPage - 1) * itemsPerPage) + 1} a{' '}
                    {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} registros
                    </div>
                    
                    <div className="flex gap-1">
                    <button
                        onClick={() => goToPage(1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white border hover:bg-gray-50'}`}
                    >
                        «
                    </button>
                    
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white border hover:bg-gray-50'}`}
                    >
                        ‹
                    </button>
                    
                    {/* Números de página */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                        pageNum = i + 1;
                        } else if (currentPage <= 3) {
                        pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                        } else {
                        pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                        <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            className={`px-3 py-1 rounded ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-white border hover:bg-gray-50'}`}
                        >
                            {pageNum}
                        </button>
                        );
                    })}
                    
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white border hover:bg-gray-50'}`}
                    >
                        ›
                    </button>
                    
                    <button
                        onClick={() => goToPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white border hover:bg-gray-50'}`}
                    >
                        »
                    </button>
                    </div>
                </div>

                </Modal.Body>
                <Modal.Footer>		
                    <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
                    <Button className="btn btn-secondary" variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>	  
                </Modal.Footer>
			</Modal>
		</>
  );
};

export default DataTable;
