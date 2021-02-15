import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiEdit2 } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card'
import { Nav, CardGroup, Col, Form, Row, ListGroup, Button, Modal } from 'react-bootstrap';
import axios from "axios";


import './styles.css';

export default function Profile () {
    let { id } = useParams();

    const [statsInfo, setStatsInfo] = useState({});

    const [pacienteInfo, setPacienteInfo] = useState({});

    const [nome, setNome] = useState(pacienteInfo.nome);
    const [sexo, setSexo] = useState(pacienteInfo.sexo);
    const [nacionalidade, setNacionalidade] = useState(pacienteInfo.nacionalidade);
    const [localidade, setLocalidade] = useState(pacienteInfo.localidade);
    const [telemovel, setTelemovel] = useState(pacienteInfo.telemovel);
    const [peso, setPeso] = useState(pacienteInfo.peso);
    const [altura, setAltura] = useState(pacienteInfo.altura);

    useEffect(() => {
        axios
        .get(`http://localhost:3001/pacientes/${id}`)
        .then((response) => {
           var result = response.data;
           setPacienteInfo(result);
           setNome(result.nome);
           setSexo(result.sexo);
           setNacionalidade(result.nacionalidade);
           setLocalidade(result.localidade);
           setTelemovel(result.telemovel);
           setPeso(result.peso);
           setAltura(result.altura);
        });
    }, []);

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

    const updatePaciente = async () => {
        let res = await axios.patch(`http://localhost:3001/pacientes/${id}`,
        {nome: nome, sexo: sexo, nacionalidade: nacionalidade, 
            localidade: localidade, telemovel: telemovel, peso: peso, altura: altura})
            console.log(res);
        window.location.reload();
    }

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const [numConsultas, setNumConsultas] = useState(statsInfo.numConsultas);
    const [numTreinos, setNumTreinos] = useState(statsInfo.numTreinos);
    const [numFeedbacks, setNumFeedbacks] = useState(statsInfo.numFeedbacks);

    function logOut() {
        localStorage.removeItem("tokens");
        window.location.reload();
    }

    function showPacienteFormUpdate () {
        document.getElementById("dados").style.display = 'none';
        document.getElementById("formUpdatePaciente").style.display = 'block';

        
    }

    function hidePacienteFormUpdate () {
        document.getElementById("formUpdatePaciente").style.display = 'none';
        document.getElementById("dados").style.display = 'block';
    }

    return (
        <div className="profile-container">

            <header>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand><b>OSTEOCLINIC</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link onClick={logOut}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>

            <div className="container">

                <div className="dadosPaciente" id="dados">
                    <Card style={{ width: '20rem' }}>
                        <Card.Header><b>#{pacienteInfo.id_paciente} - {pacienteInfo.nome}</b>
                        <FiEdit2 type="button" size={20} onClick={showPacienteFormUpdate}></FiEdit2>
                        </Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item><b>Sexo:</b> {pacienteInfo.sexo}</ListGroup.Item>
                            <ListGroup.Item><b>Nacionalidade:</b> {pacienteInfo.nacionalidade}</ListGroup.Item>
                            <ListGroup.Item><b>Localidade:</b> {pacienteInfo.localidade}</ListGroup.Item>
                            <ListGroup.Item><b>Telemóvel:</b> {pacienteInfo.telemovel}</ListGroup.Item>
                            <ListGroup.Item><b>Peso(kg):</b> {pacienteInfo.peso}</ListGroup.Item>
                            <ListGroup.Item><b>Altura(m):</b> {pacienteInfo.altura}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>

                
                <div className="updatePacientes" id="formUpdatePaciente">
                    <Form>
                        <Form.Group>
                            <Form.Label><h5><b>Altere os campos que deseja atualizar:</b></h5></Form.Label>
                        </Form.Group>
                        <Form.Group as={Row} controlId="nome">
                            <Form.Label column sm={4}>Nome</Form.Label>
                            <Col sm={8}>
                            <Form.Control type="text" value={nome}
                                onChange={(e) => setNome(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="sexo">
                            <Form.Label column sm={4}>Sexo</Form.Label>
                            <Col sm={8}>
                            <Form.Control type="text" value={sexo}
                                onChange={(e) => setSexo(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="nacionalidade">
                            <Form.Label column sm={4}>Nacionalidade</Form.Label>
                            <Col sm={8}>
                            <Form.Control type="text" value={nacionalidade}
                                onChange={(e) => setNacionalidade(e.target.value)} />
                            </Col>                  
                        </Form.Group>
                        <Form.Group as={Row} controlId="localidade">
                            <Form.Label column sm={4}>Localidade</Form.Label>
                            <Col sm={8}>
                            <Form.Control type="text" value={localidade}
                                onChange={(e) => setLocalidade(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="telemovel">
                            <Form.Label column sm={4}>Telemóvel</Form.Label>
                            <Col sm={8}>
                            <Form.Control type="text" value={telemovel}
                                onChange={(e) => setTelemovel(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="peso">
                            <Form.Label column sm={4}>Peso(kg)</Form.Label>
                            <Col sm={8}>
                            <Form.Control type="number" value={peso}
                                onChange={(e) => setPeso(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="altura">
                            <Form.Label column sm={4}>Altura(m)</Form.Label>
                            <Col sm={8}>
                            <Form.Control type="number" value={altura}
                                onChange={(e) => setAltura(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={3}>
                            <Button variant="secondary" onClick={hidePacienteFormUpdate}>
                                Cancelar
                            </Button> 
                            </Col>
                            <Col sm={3}>
                            <Button variant="secondary"  onClick={handleShowUpdate}>
                                Guardar
                            </Button>
                            </Col>  
                        </Form.Group>
                    </Form>
                </div>

                <div className="statsProfile">
                    <CardGroup>
                            <Card>
                                <Card.Body>
                                <Card.Title style={{ fontSize: '40px' }}>#{numConsultas}</Card.Title>
                                <Card.Text style={{ fontSize: '20px' }}>
                                    Número de consultas em que esteve presente.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                <Card.Title style={{ fontSize: '40px' }}>#{numFeedbacks}</Card.Title>
                                <Card.Text style={{ fontSize: '20px' }}>
                                    Número de feedbacks que você atribuiu às consultas.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                <Card.Title style={{ fontSize: '40px' }}>#{numTreinos}</Card.Title>
                                <Card.Text style={{ fontSize: '20px' }}>
                                    Número de treinos que você realizou.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                    </CardGroup>
                </div>

                <Modal show={showUpdate} onHide={handleCloseUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Alterar Dados do Paciente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Desejo mesmo guardar as alterações ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpdate}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={updatePaciente}>
                            Guardar Alterações
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>

        </div>
    );
}