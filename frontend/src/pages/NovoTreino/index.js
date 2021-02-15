import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Form, Nav, Button, Col, Modal } from 'react-bootstrap';
import axios from 'axios';

import './styles.css';

export default function NovoTreino (){
    let { id } = useParams();

    const [data, setData] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tipo, setTipo] = useState('');
    const [obs, setObs] = useState('');

    const [showSave, setShowSave] = useState(false);
    const handleCloseSave = () => setShowSave(false);
    const handleShowSave = () => setShowSave(true);

    const submitTreino = async () => {
        let res = await axios.post(`http://localhost:3001/treinos/${id}`,
        { data_treino: data, descricao_treino: descricao, tipo_treino: tipo, obs_treino: obs})
            console.log(res);
    }

    return(
       <div className="novoTreino-container">

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
                <Form.Row>
                    <Form.Group controlId="dataTreino">
                        <Col>
                        <Form.Label><b>Data do Treino(AAAA-MM-DD)</b></Form.Label>
                        <Form.Control type="text" value={data}
                            onChange={(e) => setData(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="tipoTreino">
                        <Col>
                        <Form.Label><b>Tipo de Treino</b></Form.Label>
                        <Form.Control type="text" value={tipo}
                            onChange={(e) => setTipo(e.target.value)} />
                        </Col>
                    </Form.Group>
                </Form.Row>    
                <Form.Group controlId="descricaoTreino">
                    <Col sm="12">
                    <Form.Label><b>Descrição do Treino</b></Form.Label>
                    <Form.Control as="textarea" rows={3} type="text" value={descricao} 
                        onChange={(e) => setDescricao(e.target.value)} />
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
                    Guardar
                </Button>
                </Col>
                </Form>

                <Modal show={showSave} onHide={handleCloseSave}>
                    <Modal.Header closeButton>
                        <Modal.Title>Adicionar Novo Treino</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deseja mesmo adicionar este treino ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseSave}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={submitTreino} href={'/pacientes/' + id}>
                            Adicionar
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
}

