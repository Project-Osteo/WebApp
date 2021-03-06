import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import { Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useHistory} from "react-router-dom";
import axios from "axios";
import ItemsPage from '../../pagination.js';

import './styles.css';


export default function Homepage() {

    function logOut() {
        localStorage.removeItem("tokens");
        window.location.reload();
    }

    const [listaPacientes, setListaPacientes] = useState([]);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [pacientesPorPagina] = useState(12);

    const history = useHistory();

    const handleRowClick = (id) => {
        history.push(`/pacientes/${id}`);
    }

    useEffect(() => {
        axios.get("http://localhost:3001/pacientes").then((response) => {
            setListaPacientes(response.data);
        });
    }, []);

    const indexUltimoPaciente = paginaAtual * pacientesPorPagina;
    const indexPrimeiroPaciente = indexUltimoPaciente - pacientesPorPagina;
    const pacientesAtuais = listaPacientes.slice(indexPrimeiroPaciente, indexUltimoPaciente);

    const paginate = (numPagina) => setPaginaAtual(numPagina);

    const renderPaciente = (paciente, index) => {
        return (
            <tr key={index} onClick={() => handleRowClick(paciente.id_paciente)}>
                <td>{paciente.id_paciente}</td>
                <td>{paciente.nome}</td>
                <td>{paciente.telemovel}</td>
            </tr>
        )
    }

    return(
        <div className="homepage-container">

            <header>

                <Navbar bg="light" expand="lg">
                <Navbar.Brand><b>OSTEOCLINIC</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/estatisticas">Estatísticas</Nav.Link>
                    <Nav.Link onClick={logOut}>Logout</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Pesquisar" className="mr-sm-2" />
                    <Button variant="outline-secondary">Pesquisar</Button>
                    </Form>
                </Navbar.Collapse>
                </Navbar>
                
            </header>
        
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Telemóvel</th>
                        </tr>
                    </thead>
                    <tbody>                     
                        {pacientesAtuais.map(renderPaciente)}
                    </tbody>
                </Table>
                <ItemsPage itemsPorPagina={pacientesPorPagina} totalItems={listaPacientes.length} paginate={paginate} current={paginaAtual} />
            </div>
        </div> 
   );
}