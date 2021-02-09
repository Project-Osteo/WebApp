import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card'
import { Nav, Col, Form, Button, Modal, Row, CardGroup } from 'react-bootstrap';
import axios from "axios";

import './styles.css';

export default function Consulta () {
    let { id } = useParams();

    const history = useHistory();

    const [consultaInfo, setConsultaInfo] = useState({});
    const [feedbackInfo, setFeedbackInfo] = useState({});

    const [listaFeedbacks, setListaFeedbacks] = useState([]);
 
    const [dataConsulta, setData] = useState(consultaInfo.dataConsulta);
    const [descricaoConsulta, setDescricao] = useState(consultaInfo.descricaoConsulta);
    const [tratamento, setTratamento] = useState(consultaInfo.tratamento);
    const [recomendacao, setRec] = useState(consultaInfo.recomendacao);
    const [obsConsulta, setObs] = useState(consultaInfo.obsConsulta);
    const [nomePaciente, setNomePaciente] = useState(consultaInfo.nome)

    const [mensagem, setMensagem] = useState(feedbackInfo.mensagem);
    const [dataHora, setDataHora] = useState(feedbackInfo.dataHora);

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
        axios
        .get(`http://localhost:3001/feedbacks/consulta/${id}`)
        .then((response) => {
            setListaFeedbacks(response.data);
        });
    }, []);

    function showFeedbacks () {
        document.getElementById("feedbacks").style.display = 'block';
    }

    const renderFeedback = (feedbacks, index) => {
        return (
            <div className="feedback-container" style={{ padding: '5px', marginLeft: '30px', marginRight: '30px' }}>
                <Card key={index}>
                <Card.Header><b>Data e hora do Feedback:</b> {feedbacks.dataehora}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <b>Mensagem:</b> {feedbacks.mensagem}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            
        )
    }

    return(       

        <div className="consultas-container">

            <header>
                
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
                        <Form.Label><b>Data da Consulta(AAAA-MM-DD)</b></Form.Label>
                        <Form.Control type="text" value={dataConsulta}
                            onChange={(e) => setData(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="descricaoConsulta">
                        <Col sm="12">
                        <Form.Label><b>Descrição da Consulta</b></Form.Label>
                        <Form.Control as="textarea" rows={3} type="text" value={descricaoConsulta} 
                            onChange={(e) => setDescricao(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="tratamento">
                        <Col sm="12">
                        <Form.Label><b>Tratamento</b></Form.Label>    
                        <Form.Control as="textarea" rows={3} type="text" value={tratamento} 
                            onChange={(e) => setTratamento(e.target.value)} /> 
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="recomendacoes">
                        <Col sm="12">
                        <Form.Label><b>Recomendações</b></Form.Label>   
                        <Form.Control as="textarea" rows={3} type="text" value={recomendacao}
                            onChange={(e) => setRec(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="observacoes">
                        <Col sm="12">
                        <Form.Label><b>Observações</b></Form.Label>
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

                {listaFeedbacks.map(renderFeedback)}

            </div>

        </div>
    );
}