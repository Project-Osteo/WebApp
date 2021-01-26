import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FiHome, FiSettings, FiPower, FiArrowLeft } from 'react-icons/fi';
import Navbar from 'react-bootstrap/Navbar';
import { Form, Nav, Button, Col } from 'react-bootstrap';
import axios from 'axios';

import './styles.css';

export default function NovoTreino (){
    let { id } = useParams();

    const history = useHistory();

    const [data, setData] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tipo, setTipo] = useState('');
    const [obs, setObs] = useState('');

    const submitTreino = async () => {
        let res = await axios.post(`http://localhost:3001/treinos/${id}`,
        { data_treino: data, descricao_treino: descricao, tipo_treino: tipo, obs_treino: obs})
            /*history.push(`/pacientes/${id}`);*/
            console.log(res);
    }

    return(
       <div className="novoTreino-container">

            <header>


                {/*<div className="btn-group">
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
                <Navbar.Brand>OSTEOCLINIC</Navbar.Brand>
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
                
                {/*<form className="myForm2" encType="application/x-www-form-urlencoded" action="/html/codes/html_form_handler.cfm">

                    <label>TIPO DE TREINO
                    <input type="text" name="tipo" list="optionslist" value={tipo}
                       onChange={(e) => setTipo(e.target.value)}/>
                    <datalist id="optionslist">
                        <option value="Recuperação" />
                        <option value="Fortalecimento" />
                        <option value="Rotina" />
                    </datalist>
                    </label>

                    <label>DESCRIÇÃO DO TREINO
                    <textarea type="text" name="descricao" cols="40" rows="5" value={descricao}
                       onChange={(e) => setDescricao(e.target.value)}/>
                    </label>

                    <label>OBSERVAÇÕES
                    <textarea type="text" name="observacoes" cols="40" rows="5" value={obs}
                       onChange={(e) => setObs(e.target.value)}/>
                    </label>

                    <label>DATA DO TREINO(AAAA-MM-DD)
                    <input type="text" name="observacoes" cols="40" rows="5" value={data}
                       onChange={(e) => setData(e.target.value)}/>
                    </label>

                    <p><Link type="submit" onClick={submitTreino}>ADICIONAR TREINO</Link></p>
                </form>*/}


                <Form>
                <Form.Row>
                    <Form.Group>
                        <Col>
                        <Form.Label>Data do Treino(AAAA-MM-DD)</Form.Label>
                        <Form.Control type="text" value={data}
                            onChange={(e) => setData(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="tipoTreino">
                        <Col>
                        <Form.Label>Tipo de Treino</Form.Label>
                        <Form.Control type="text" value={tipo}
                            onChange={(e) => setTipo(e.target.value)} />
                        </Col>
                    </Form.Group>
                </Form.Row>    
                <Form.Group controlId="descricaoTreino">
                    <Col sm="12">
                    <Form.Label>Descrição do Treino</Form.Label>
                    <Form.Control as="textarea" rows={3} type="text" value={descricao} 
                        onChange={(e) => setDescricao(e.target.value)} />
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
                <Button variant="secondary" type="submit" onClick={submitTreino} href={'/pacientes/' + id}>
                    Guardar
                </Button>
                </Col>
                </Form>

            </div>
        </div>
    );
}

