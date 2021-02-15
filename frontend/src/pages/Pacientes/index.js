import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import { Nav, NavDropdown, ListGroup, Modal, Button, Form, Col, Row } from 'react-bootstrap';
import axios from "axios";
import ItemsPage from '../../pagination.js';

import './styles.css';

export default function Pacientes() {
    let { id } = useParams(); 

    const history = useHistory();

    const [pacienteInfo, setPacienteInfo] = useState({});
    const [listaconsultas, setListaConsultas] = useState([]);
    const [listatreinos, setListaTreinos] = useState([]);

    const [nome, setNome] = useState(pacienteInfo.nome);
    const [sexo, setSexo] = useState(pacienteInfo.sexo);
    const [nacionalidade, setNacionalidade] = useState(pacienteInfo.nacionalidade);
    const [localidade, setLocalidade] = useState(pacienteInfo.localidade);
    const [telemovel, setTelemovel] = useState(pacienteInfo.telemovel);
    const [peso, setPeso] = useState(pacienteInfo.peso);
    const [altura, setAltura] = useState(pacienteInfo.altura);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [consultasPorPagina] = useState(6);
    const [treinosPorPagina] = useState(6);

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const indexUltimaConsulta = paginaAtual * consultasPorPagina;
    const indexPrimeiraConsulta = indexUltimaConsulta - consultasPorPagina;
    const consultasAtuais = listaconsultas.slice(indexPrimeiraConsulta, indexUltimaConsulta);

    const indexUltimoTreino = paginaAtual * treinosPorPagina;
    const indexPrimeiroTreino = indexUltimoTreino - treinosPorPagina;
    const treinosAtuais = listatreinos.slice(indexPrimeiroTreino, indexUltimoTreino);

    const paginate = (numPagina) => setPaginaAtual(numPagina);

    const updatePaciente = async () => {
        let res = await axios.patch(`http://localhost:3001/pacientes/${id}`,
        {nome: nome, sexo: sexo, nacionalidade: nacionalidade, 
            localidade: localidade, telemovel: telemovel, peso: peso, altura: altura})
            console.log(res);
        window.location.reload();
    }

    const deletePaciente = async () => {
        let res = await axios.delete(`http://localhost:3001/pacientes/${id}`)
        history.push('/homepage')
        console.log(res);
    } 

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

    const handleRowClickConsulta = (id) => {
        history.push(`/consultas/${id}`);
    }

    const renderConsulta = (consulta, index) => {
        return (
            <tr key={index} onClick={() => handleRowClickConsulta(consulta.id_consulta)}>
                <td>{consulta.id_consulta}</td>
                <td>{consulta.data_consulta}</td>
                <td>{consulta.descricao_consulta.slice(0, 60)}</td>
            </tr>
        )
    }

    const handleRowClickTreino = (id) => {
        history.push(`/treinos/${id}`);
    }

    const renderTreino = (treino, index) => {
        return (
            <tr key={index} onClick={() => handleRowClickTreino(treino.id_treino)}>
                <td>{treino.id_treino}</td>
                <td>{treino.data_treino}</td>
                <td>{treino.tipo_treino}</td>
            </tr>
        )
    }

    function showConsultas () {
        document.getElementById("listaConsultas").style.display = 'block';
        document.getElementById("listaTreinos").style.display = "none";
        document.getElementById("formUpdatePaciente").style.display = 'none';

        axios
        .get(`http://localhost:3001/pacientes/${id}/consultas`)
        .then((response) => {
            console.log()
            setListaConsultas(response.data);
        });
    }

    function showTreinos () {
        document.getElementById("listaTreinos").style.display = 'block';
        document.getElementById("listaConsultas").style.display = 'none';
        document.getElementById("formUpdatePaciente").style.display = 'none';

        axios
        .get(`http://localhost:3001/pacientes/${id}/treinos`)
        .then((response) => {
            console.log()
            setListaTreinos(response.data);
        });
    }

    function showPacienteFormUpdate () {
        document.getElementById("listaTreinos").style.display = 'none';
        document.getElementById("listaConsultas").style.display = 'none';
        document.getElementById("formUpdatePaciente").style.display = 'block';
        
    }

    function hidePacienteFormUpdate () {
        document.getElementById("formUpdatePaciente").style.display = 'none';
    }

    return(
        <div className="pacientes-container">

            <header>

                <Navbar bg="light" expand="lg">
                <Navbar.Brand><b>OSTEOCLINIC</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/homepage">Homepage</Nav.Link>
                    <Nav.Link href="/estatisticas">Estatísticas</Nav.Link>
                    <NavDropdown title="Consultas" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => showConsultas()}>Histórico</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href={'/novaConsulta/' + pacienteInfo.id_paciente}>Adicionar</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Treinos" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => showTreinos()}>Histórico</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href={'/novoTreino/' + pacienteInfo.id_paciente}>Adicionar</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </header>

            <div className="pacientesContainerInfo">

                <div className="dadosPaciente">
                    <Card style={{ width: '20rem' }}>
                        <Card.Header><b>#{pacienteInfo.id_paciente} - {pacienteInfo.nome}</b>
                            <FiEdit2 type="button" size={20} onClick={showPacienteFormUpdate}></FiEdit2>
                            <FiTrash2 type="button" size={20} onClick={handleShowDelete}></FiTrash2>
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

                <Modal show={showDelete} onHide={handleCloseDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar Paciente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deseja mesmo eliminar este paciente ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDelete}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={deletePaciente}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="consultas" id="listaConsultas">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Data da Consulta</th>
                                <th width="500" tdstyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Descrição da Consulta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consultasAtuais.map(renderConsulta)}
                        </tbody>
                    </Table>
                    <ItemsPage itemsPorPagina={consultasPorPagina} totalItems={listaconsultas.length} paginate={paginate} current={paginaAtual} />
                </div>    
                
                <div className="treinos" id="listaTreinos">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Data do Treino</th>
                                <th>Tipo de Treino</th>
                            </tr>
                        </thead>
                        <tbody>
                            {treinosAtuais.map(renderTreino)}
                        </tbody>
                    </Table>
                    <ItemsPage itemsPorPagina={treinosPorPagina} totalItems={listatreinos.length} paginate={paginate} current={paginaAtual} />
                </div>
                    
            </div>

        </div>
    );
}