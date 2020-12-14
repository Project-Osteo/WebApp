import React from 'react';
/* import Table from './Table' */
import { Link } from 'react-router-dom';
import { FiUserPlus, FiSettings, FiPower } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap";
import { useHistory} from "react-router-dom";

import './styles.css';

export default function Homepage() {
    const fakedata = [
        {id: 1, name: 'Nelsan', mail: 'nelsan@mail.com'},
        {id: 2, name: 'Toja', mail: 'toja@mail.com'},
        {id: 3, name: 'Frigido', mail: 'frigido@mail.com'}
    ]

    const pacientes = [
        {id: 1, name: 'Nelsan', mail: 'nelsan@mail.com'},
        {id: 2, name: 'Toja', mail: 'toja@mail.com'},
        {id: 3, name: 'Frigido', mail: 'frigido@mail.com'}
    ]

    const history = useHistory();
    const handleRowClick = (row) => {
        history.push(`/pacientes/${row}`);
    }  

    const renderPaciente = (paciente, index) => {
        return (
            <tr key={index} onClick={()=> handleRowClick(index)}>
                <td>{paciente.id}</td>
                <td>{paciente.name}</td>
                <td>{paciente.mail}</td>
            </tr>
        )
    }

    const renderPacienteCard = (paciente, index) => {
        return (
            <li key={index}>
                <Link to="/pacientes">
                    <p><b>Ident:</b>{paciente.id}</p>
                    <p><b>Nome:</b>{paciente.name}</p>
                    <p><b>E-mail:</b>{paciente.mail}</p>
                </Link>              
            </li>
        )
    }
    

    return(
        <div className="homepage-container">
            <header>
                <span>Bem-vindo Osteo</span>

                <div className="btn-group">
                    <Link type="button" to="/novoPaciente">
                        <FiUserPlus size={55} color="#41414d"></FiUserPlus>
                    </Link>

                    <Link type="button" to="/settings">
                        <FiSettings size={55} color="#41414d"></FiSettings>
                    </Link>

                    <Link type="button">
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
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.map(renderPaciente)}
                    </tbody>
                </ReactBootStrap.Table>    
            </div>

            <ul>
                {pacientes.map(renderPacienteCard)}
                {/* <li>
                    <Link to="/pacientes">
                    <p><b>Nome:</b>Jona do cota</p>
                    <p><b>Email:</b>jonadocota@hotmail.com</p>
                    </Link>    
                </li> */}
            </ul> 
        </div> 
   );
}