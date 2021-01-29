import React, { useEffect, useState } from 'react';
import { Link, useParams,useHistory } from 'react-router-dom';
import { FiHome, FiSettings, FiPower, FiArrowLeft, FiEdit2, FiTrash2, FiSave } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import { Nav, Col, Form, Button, Modal, Row } from 'react-bootstrap';
import axios from "axios";

import './styles.css';

export default function Treino () {
    let { id } = useParams();

    const history = useHistory();

    const [treinoInfo, setTreinoInfo] = useState({});

    const [dataTreino, setData] = useState(treinoInfo.data);
    const [descricaoTreino, setDescricao] = useState(treinoInfo.descricaoTreino);
    const [obsTreino, setObs] = useState(treinoInfo.obs);
    const [tipoTreino, setTipo] = useState(treinoInfo.tipoTreino);
    const [nomePaciente, setNomePaciente] = useState(treinoInfo.nome)
    
    const updateTreino = async () => {
        let res = await axios.patch(`http://localhost:3001/treinos/${id}`,
            {data_treino: dataTreino, tipo_treino: tipoTreino, descricao_treino: descricaoTreino, obs_treino: obsTreino, nome: nomePaciente})
        console.log(res)

        window.location.reload();
    }


    const deleteTreino = async () => {
        let res = await axios.delete(`http://localhost:3001/treinos/${id}`)
        history.push('/pacientes/' + treinoInfo.paciente_id)
        console.log(res);
    } 
    
    useEffect(() => {
        axios
        .get(`http://localhost:3001/treinos/${id}`)
        .then((response) => {
            var result = response.data[0];
            setTreinoInfo(result);
            setData(result.data_treino);
            setTipo(result.tipo_treino);
            setDescricao(result.descricao_treino);
            setObs(result.obs_treino);
            setNomePaciente(result.nome);
        });
    }, []);

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    
    function showTreinoInputUpdate () {
        document.getElementById("updateTreino").style.display = 'block';
        document.getElementById("infoTreino").style.display = 'none';
    }

    return(
        <div className="treinos-container">

            <header>
                <Navbar bg="light" expand="lg">
                <Navbar.Brand><b>OSTEOCLINIC</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/homepage">Homepage</Nav.Link>
                    <Nav.Link href="/estatisticas">Estatísticas</Nav.Link>
                    <Nav.Link href={'/pacientes/' + treinoInfo.paciente_id}>Voltar</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </header>

            {/*<div className="card text-white bg-secondary mb-3">

                <div className="card-header">
                    <h3>{treinoInfo.id_treino}. <b>{treinoInfo.nome} ({treinoInfo.data_treino})</b> 
                        <FiEdit2 type="button" size={20} onClick={showTreinoInputUpdate}></FiEdit2>
                        <FiTrash2 type="button" size={20} onClick={deleteTreino}></FiTrash2>
                    </h3>
                </div>

                <div className="card-body" id="infoTreino">
                    <p><b>Tipo de Treino:</b> {treinoInfo.tipo_treino}</p>

                    <p><b>Descricção:</b> {treinoInfo.descricao_treino}</p>

                    <p><b>Observações:</b> {treinoInfo.obs_treino}</p>
                </div>

                <div className="formUpdate" id="updateTreino">
                    <p><b>Data da consulta:</b> <input type="text" name="data" value={dataTreino} maxlength={10}
                        onChange={(e) => setData(e.target.value)} /></p>

                    <p><b>Tipo de treino:</b> <input type="text" name="tipo" value={tipoTreino}
                       onChange={(e) => setTipo(e.target.value)} /></p>

                    <p><b>Descrição:</b></p>
                    <textarea type="text" name="descricao" cols="142" rows="5" value={descricaoTreino}
                       onChange={(e) => setDescricao(e.target.value)} />

                    <p><b>Observações:</b></p>
                    <textarea type="text" name="obs" cols="142" rows="5" value={obsTreino}
                       onChange={(e) => setObs(e.target.value)} />

                    <FiSave type="button" size={20} onClick={updateTreino}></FiSave>   
                </div>
            </div>*/}

            <div className="container">
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm={11}><b>#{treinoInfo.id_treino} - {treinoInfo.nome}</b>
                        </Form.Label>
                        <Col sm={1}>
                            <FiTrash2 type="button" size={20} onClick={handleShowDelete}></FiTrash2>
                        </Col>
                    </Form.Group>    
                    <Form.Row>
                        <Form.Group controlId="dataTreino">
                            <Col>
                            <Form.Label>Data do Treino(AAAA-MM-DD)</Form.Label>
                            <Form.Control type="text" value={dataTreino}
                                onChange={(e) => setData(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="tipoTreino">
                            <Col>
                            <Form.Label>Tipo de Treino</Form.Label>
                            <Form.Control type="text" value={tipoTreino}
                                onChange={(e) => setTipo(e.target.value)} />
                            </Col>
                        </Form.Group>
                    </Form.Row>    
                    <Form.Group controlId="descricaoTreino">
                        <Col sm="12">
                        <Form.Label>Descrição do Treino</Form.Label>
                        <Form.Control as="textarea" rows={3} type="text" value={descricaoTreino} 
                            onChange={(e) => setDescricao(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="observacoes">
                        <Col sm="12">
                        <Form.Label>Observações</Form.Label>    
                        <Form.Control as="textarea" rows={3} type="text" value={obsTreino} 
                        onChange={(e) => setObs(e.target.value)} /> 
                        </Col>
                    </Form.Group>
                    <Col sm="2">
                    <Button variant="secondary" onClick={handleShowUpdate}>
                        Alterar
                    </Button>
                    </Col>
                </Form>

                <Modal show={showUpdate} onHide={handleCloseUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Alterar Detalhes do Treino</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Desejo mesmo guardar as alterações ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpdate}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={updateTreino}>
                            Guardar Alterações
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showDelete} onHide={handleCloseDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar Treino</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deseja mesmo eliminar este treino ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDelete}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={deleteTreino}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>         
        </div>
    );
}