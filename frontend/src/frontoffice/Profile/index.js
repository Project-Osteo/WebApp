import React, { useEffect, useState } from 'react';
import { Link, useParams,useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card'
import { Nav, CardGroup } from 'react-bootstrap';
import axios from "axios";

import './styles.css';

export default function Profile () {
    let { id } = useParams();

    const [statsInfo, setStatsInfo] = useState({});

    const [numConsultas, setNumConsultas] = useState(statsInfo.numConsultas);
    const [numTreinos, setNumTreinos] = useState(statsInfo.numTreinos);
    const [numFeedbacks, setNumFeedbacks] = useState(statsInfo.numFeedbacks);

    useEffect(() => {
        axios
        .get(`http://localhost:3001/pacientes/${id}/stats`)
        .then((response) => {
            var result = response.data;
            setStatsInfo(result);
            setNumConsultas(result.n_consultas);
            setNumTreinos(result.n_treinos);
            setNumFeedbacks(result.n_feedbacks);        
        });
    }, []);

    function logOut() {
        localStorage.removeItem("tokens");
        window.location.reload();
    }

    return (
        <div className="profile-container">
            <header>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand><b>OSTEOCLINIC</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="/editarPerfil">Editar Perfil</Nav.Link>
                        <Nav.Link onClick={logOut}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>

            <div className="container">

            <CardGroup>
            <Card>
                <Card.Body>
                <Card.Title style={{ fontSize: '50px' }}>{numConsultas}</Card.Title>
                <Card.Text style={{ fontSize: '25px' }}>
                    Número de consultas em que esteve presente.
                </Card.Text>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                <Card.Title style={{ fontSize: '50px' }}>{numFeedbacks}</Card.Title>
                <Card.Text style={{ fontSize: '25px' }}>
                    Número de feedbacks que você atribuiu às consultas.
                </Card.Text>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                <Card.Title style={{ fontSize: '50px' }}>{numTreinos}</Card.Title>
                <Card.Text style={{ fontSize: '25px' }}>
                    Número de treinos que você realizou.
                </Card.Text>
                </Card.Body>
            </Card>
            </CardGroup>

            </div>

        </div>
    );
}