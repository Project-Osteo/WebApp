import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FiHome, FiSettings, FiPower, FiArrowLeft } from 'react-icons/fi';
import Navbar from 'react-bootstrap/Navbar';
import { Form, Nav, Button, Col } from 'react-bootstrap';
import axios from 'axios';

import './styles.css';

export default function NovaConsulta (){
    let { id } = useParams();

    const history = useHistory();

    const [data, setData] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tratamento, setTratamento] = useState('');
    const [rec, setRec] = useState('');
    const [obs, setObs] = useState('');
    

    const submitConsulta = async () => {
        let res = await axios.post(`http://localhost:3001/consultas/${id}`,
        { data_consulta: data, descricao_consulta: descricao, tratamento: tratamento, obs_consulta: obs, recomendacao: rec })
            /*history.push(`/pacientes/${id}`);*/
            console.log(res);
    }

    return(
        <div className="novaConsulta-container">

            <header>
                {/*<span><b>OSTEOCLINIC</b></span>

                <div className="btn-group">
                    <Link type="button" to={'/pacientes/' + id}>
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
                    <Nav.Link href={'/pacientes/' + id}>Voltar</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>

            </header>

            <div className="content">
                
                {/*<form class="myForm2" method="get" enctype="application/x-www-form-urlencoded" action="/html/codes/html_form_handler.cfm">

                    <label>Descrição da consulta
                    <textarea type="text" name="descricao Consulta" cols="40" rows="5" value={descricao}
                       onChange={(e) => setDescricao(e.target.value)}/>
                    </label>

                    <label>Tratamento
                    <textarea type="text" name="tratamento" cols="40" rows="5" value={tratamento}
                       onChange={(e) => setTratamento(e.target.value)}/>
                    </label>

                    <label>Recomendações
                    <textarea type="text" name="recomendacoes" cols="40" rows="5" value={rec}
                       onChange={(e) => setRec(e.target.value)}/>
                    </label>

                    <label>Observações
                    <textarea type="text" name="observacoes" cols="40" rows="5" value={obs}
                       onChange={(e) => setObs(e.target.value)}/>
                    </label>

                    <label>Data da Consulta(AAAA-MM-DD)
                    <input type="text" name="observacoes" cols="40" rows="5" value={data}
                       onChange={(e) => setData(e.target.value)}/>
                    </label>

                    <p><Link type="submit" onClick={submitConsulta}>ADICIONAR CONSULTA</Link></p>
                </form>*/}

            

                <Form>
                    <Form.Group controlId="dataConsulta">
                        <Col sm="4">
                        <Form.Label>Data da Consulta(AAAA-MM-DD)</Form.Label>
                        <Form.Control type="text" value={data}
                            onChange={(e) => setData(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="descricaoConsulta">
                        <Col sm="12">
                        <Form.Label>Descrição da Consulta</Form.Label>
                        <Form.Control as="textarea" rows={3} type="text" value={descricao} 
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
                        <Form.Control as="textarea" rows={3} type="text" value={rec}
                            onChange={(e) => setRec(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="observacoes">
                        <Col sm="12">
                        <Form.Label>Observações</Form.Label>
                        <Form.Control as="textarea" rows={3} type="text" value={obs}
                            onChange={(e) => setObs(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Col sm="2">
                    <Button variant="secondary" type="submit" onClick={submitConsulta} href={'/pacientes/' + id}>
                        Guardar
                    </Button>
                    </Col>
                </Form>

            </div>
        </div>
    );
}