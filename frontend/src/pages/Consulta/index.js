import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FiHome, FiSettings, FiPower, FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card'
import { Nav, Col, Form, Button, Modal, Row } from 'react-bootstrap';
import axios from "axios";

import './styles.css';

export default function Consulta () {
    let { id } = useParams();

    const history = useHistory();

    const [consultaInfo, setConsultaInfo] = useState({});

    const [dataConsulta, setData] = useState(consultaInfo.dataConsulta);
    const [descricaoConsulta, setDescricao] = useState(consultaInfo.descricaoConsulta);
    const [tratamento, setTratamento] = useState(consultaInfo.tratamento);
    const [recomendacao, setRec] = useState(consultaInfo.recomendacao);
    const [obsConsulta, setObs] = useState(consultaInfo.obsConsulta);
    const [nomePaciente, setNomePaciente] = useState(consultaInfo.nome)

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const updateConsulta = async () => {
        let res = await axios.patch(`http://localhost:3001/consultas/${id}`,
        {data_consulta: dataConsulta, descricao_consulta: descricaoConsulta, 
            tratamento: tratamento, recomendacao: recomendacao, obs_consulta: obsConsulta, nome: nomePaciente})
        console.log(res);
        window.location.reload();
    }

    const deleteConsulta = async () => {
        let res = await axios.delete(`http://localhost:3001/consultas/${id}`)
        history.push('/pacientes/' + consultaInfo.paciente_id)
        console.log(res);
    }

    useEffect(() => {
        axios
        .get(`http://localhost:3001/consultas/${id}`)
        .then((response) => {
            var result = response.data[0];
            setConsultaInfo(result);
            setData(result.data_consulta);
            setDescricao(result.descricao_consulta);
            setTratamento(result.tratamento);
            setObs(result.obs_consulta);
            setRec(result.recomendacao);
            setNomePaciente(result.nome);
        });
    }, []);

    return(       

        <div className="consultas-container">

            <header>
                {/*<div className="btn-group">
                    <Link type="button" to={'/pacientes/' + consultaInfo.paciente_id}>
                        <FiArrowLeft size={55} color="#41414d" />
                    </Link>

                    <Link type="button" to="/homepage">
                        <FiHome size={55} color="#41414d"></FiHome>
                    </Link>

                    <Link type="button" to="/settings">
                        <FiSettings size={55} color="#41414d"></FiSettings>
                    </Link>

                    <Link type="button" to="/">
                        <FiPower size={55} color="#41414d"></FiPower>
                    </Link>
                </div>*/}
                
                <Navbar bg="light" expand="lg">
                <Navbar.Brand><b>OSTEOCLINIC</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/homepage">Homepage</Nav.Link>
                    <Nav.Link href="/estatisticas">Estatísticas</Nav.Link>
                    <Nav.Link href={'/pacientes/' + consultaInfo.paciente_id}>Voltar</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>

            </header>

            {/*<div className="consultas">

                <FiEdit2 type="button" size={20} onClick={updateConsulta}></FiEdit2>
                
                <FiTrash2 type="button" size={20} onClick={deleteConsulta}></FiTrash2>

                <p><b>Id:</b> {consultaInfo.id_consulta}</p>

                <p><b>Data da consulta:</b> {consultaInfo.data_consulta}</p>
                <input type="text" name="data" value={dataConsulta}
                       onChange={(e) => setData(e.target.value)} />

                <p><b>Descrição:</b> {consultaInfo.descricao_consulta}</p>
                <input type="text" name="descricao" value={descricaoConsulta}
                       onChange={(e) => setDescricao(e.target.value)} />

                <div className="tratamento">

                    <p><b>Tratamento realizado:</b> {consultaInfo.tratamento}</p>
                    <input type="text" name="tratamento" value={tratamento}
                       onChange={(e) => setTratamento(e.target.value)} />

                    <p><b>Observações:</b> {consultaInfo.obs_consulta}</p>
                    <input type="text" name="obs" value={obsConsulta}
                       onChange={(e) => setObs(e.target.value)} />
                </div>

                <p><b>Recomendações:</b> {consultaInfo.recomendacao}</p>
                <input type="text" name="recomendacao" value={recomendacao}
                       onChange={(e) => setRec(e.target.value)} />
            </div>*/}

            <div className="container">

                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm={11}><b>#{consultaInfo.id_consulta} - {consultaInfo.nome}</b>
                        </Form.Label>
                        <Col sm={1}>
                            <FiTrash2 type="button" size={20} onClick={handleShowDelete}></FiTrash2>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="dataConsulta">
                        <Col sm="4">
                        <Form.Label>Data da Consulta(AAAA-MM-DD)</Form.Label>
                        <Form.Control type="text" value={dataConsulta}
                            onChange={(e) => setData(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="descricaoConsulta">
                        <Col sm="12">
                        <Form.Label>Descrição da Consulta</Form.Label>
                        <Form.Control as="textarea" rows={3} type="text" value={descricaoConsulta} 
                            onChange={(e) => setDescricao(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="tratamento">
                        <Col sm="12">
                        <Form.Label>Tratamento</Form.Label>    
                        <Form.Control as="textarea" rows={3} type="text" value={tratamento} 
                            onChange={(e) => setTratamento(e.target.value)} /> 
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="recomendacoes">
                        <Col sm="12">
                        <Form.Label>Recomendações</Form.Label>   
                        <Form.Control as="textarea" rows={3} type="text" value={recomendacao}
                            onChange={(e) => setRec(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="observacoes">
                        <Col sm="12">
                        <Form.Label>Observações</Form.Label>
                        <Form.Control as="textarea" rows={3} type="text" value={obsConsulta}
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
                        <Modal.Title>Alterar Detalhes da Consulta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Desejo mesmo guardar as alterações ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpdate}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={updateConsulta}>
                            Guardar Alterações
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showDelete} onHide={handleCloseDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar Consulta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deseja mesmo eliminar esta consulta ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDelete}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={deleteConsulta}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
            
        </div>
    );
}