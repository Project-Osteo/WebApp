import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Form, Nav, Button, Col, Modal } from 'react-bootstrap';
import axios from 'axios';

import './styles.css';

export default function NovaConsulta (){
    let { id } = useParams();

    const [data, setData] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tratamento, setTratamento] = useState('');
    const [rec, setRec] = useState('');
    const [obs, setObs] = useState('');

    const [showSave, setShowSave] = useState(false);
    const handleCloseSave = () => setShowSave(false);
    const handleShowSave = () => setShowSave(true);
    

    const submitConsulta = async () => {
        let res = await axios.post(`http://localhost:3001/consultas/${id}`,
        { data_consulta: data, descricao_consulta: descricao, tratamento: tratamento, obs_consulta: obs, recomendacao: rec })
            console.log(res);
    }

    return(
        <div className="novaConsulta-container">

            <header>

                <Navbar bg="light" expand="lg">
                <Navbar.Brand><b>OSTEOCLINIC</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/homepage">Homepage</Nav.Link>
                    <Nav.Link href="/estatisticas">Estatísticas</Nav.Link>
                    <Nav.Link href={'/pacientes/' + id}>Voltar</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>

            </header>

            <div className="content">
                
                <Form>
                    <Form.Group controlId="dataConsulta">
                        <Col sm="4">
                        <Form.Label><b>Data da Consulta(AAAA-MM-DD)</b></Form.Label>
                        <Form.Control type="text" value={data}
                            onChange={(e) => setData(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="descricaoConsulta">
                        <Col sm="12">
                        <Form.Label><b>Descrição da Consulta</b></Form.Label>
                        <Form.Control as="textarea" rows={3} type="text" value={descricao} 
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
                        <Form.Control as="textarea" rows={3} type="text" value={rec}
                            onChange={(e) => setRec(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="observacoes">
                        <Col sm="12">
                        <Form.Label><b>Observações</b></Form.Label>
                        <Form.Control as="textarea" rows={3} type="text" value={obs}
                            onChange={(e) => setObs(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Col sm="2">
                    <Button variant="secondary" onClick={handleShowSave}>
                        Adicionar
                    </Button>
                    </Col>
                </Form>

                <Modal show={showSave} onHide={handleCloseSave}>
                    <Modal.Header closeButton>
                        <Modal.Title>Adicionar Nova Consulta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deseja mesmo adicionar esta consulta ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseSave}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={submitConsulta} href={'/pacientes/' + id}>
                            Adicionar
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
}