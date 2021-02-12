import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FiHome, FiSettings, FiPower, FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card'
import { Nav, Col, Form, Button, Modal, Row, CardGroup } from 'react-bootstrap';
import axios from "axios";
 
import './styles.css';

export default function Estatisticas () {

    const [statsInfo, setStatsInfo] = useState({});

    const [numPacientes, setNumPacientes] = useState(statsInfo.numPacientes);
    const [numConsultas, setNumConsultas] = useState(statsInfo.numConsultas);
    const [numTreinos, setNumTreinos] = useState(statsInfo.numTreinos);
    const [numFeedbacks, setNumFeedbacks] = useState(statsInfo.numFeedbacks);

    useEffect(() => {
        axios
        .get(`http://localhost:3001/pacientes/stats`)
        .then((response) => {
          var result = response.data;
          setStatsInfo(result);
          setNumPacientes(result.n_pacientes);    
        });
        axios
        .get(`http://localhost:3001/consultas/stats`)
        .then((response) => {
          var result = response.data;
          setStatsInfo(result);
          setNumConsultas(result.n_consultas);    
        });
        axios
        .get(`http://localhost:3001/feedbacks/stats`)
        .then((response) => {
          var result = response.data;
          setStatsInfo(result);
          setNumFeedbacks(result.n_feedbacks);
        });
        axios
        .get(`http://localhost:3001/treinos/stats`)
        .then((response) => {
          var result = response.data;
          setStatsInfo(result);
          setNumTreinos(result.n_treinos);
        });
    }, []);


    return(

      <div className="estatisticas-container">

        <header>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand><b>OSTEOCLINIC</b></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/homepage">Homepage</Nav.Link>
                </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>

        <div className="container">

        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title style={{ fontSize: '50px' }}>{numPacientes}</Card.Title>
              <Card.Text style={{ fontSize: '20px' }}>
                Número de pacientes registados na aplicação.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title style={{ fontSize: '50px' }}>#{numConsultas}</Card.Title>
              <Card.Text style={{ fontSize: '20px' }}>
                Número de consultas realizadas.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title style={{ fontSize: '50px' }}>{numFeedbacks}</Card.Title>
              <Card.Text style={{ fontSize: '20px' }}>
                Número de feedbacks atribuídos às consultas.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title style={{ fontSize: '50px' }}>{numTreinos}</Card.Title>
              <Card.Text style={{ fontSize: '20px' }}>
                Número de treinos que foram atribuídos.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>

        </div>

      </div>
    );
}