import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUserPlus, FiSettings, FiPower } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap";
import { useHistory} from "react-router-dom";
import axios from "axios";

import './styles.css';

export default function Homepage() {

    const [listaPacientes, setListaPacientes] = useState([]);

    const history = useHistory();

    const handleRowClick = (id) => {
        history.push(`/pacientes/${id}`);
    }

    useEffect(() => {
        axios.get("http://localhost:3001/pacientes").then((response) => {
            setListaPacientes(response.data);
        });
    }, []);

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
                <span><b>OSTEOCLINIC</b></span>

                <div className="btn-group">
                    <Link type="button" to="/novoPaciente">
                        <FiUserPlus size={55} color="#41414d"></FiUserPlus>
                    </Link>

                    <Link type="button" to="/settings">
                        <FiSettings size={55} color="#41414d"></FiSettings>
                    </Link>

                    <Link type="button" to="/">
                        <FiPower size={55} color="#41414d"></FiPower>
                    </Link>
                </div>
            </header>
        
            <div>
                <ReactBootStrap.Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Ident.</th>
                            <th>Nome</th>
                            <th>Telemóvel</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {listaPacientes.map(renderPaciente)}
                    </tbody>
                </ReactBootStrap.Table>
            </div>
        </div> 
   );
}