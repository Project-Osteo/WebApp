import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FiHome, FiSettings, FiPower, FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card'
import { Nav, ListGroup, CardGroup } from 'react-bootstrap';
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

    const updateConsulta = async () => {
        let res = await axios.patch(`http://localhost:3001/consultas/${id}`,
        {data_consulta: dataConsulta, descricao_consulta: descricaoConsulta, 
            tratamento: tratamento, recomendacao: recomendacao, obs_consulta: obsConsulta, nome: nomePaciente})
        console.log(res);
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

                <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                crossOrigin="anonymous"
                />

                <Navbar bg="light" expand="lg">
                <Navbar.Brand>OSTEOCLINIC</Navbar.Brand>
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

            <Card>
                <Card.Header><b>#{consultaInfo.id_consulta} - Data da Consulta:</b> {consultaInfo.data_consulta}</Card.Header>
                <CardGroup>
                    <Card>
                        <Card.Body>
                            <Card.Title>Descrição:</Card.Title>
                            <Card.Text>{consultaInfo.descricao_consulta}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Tratamento:</Card.Title>
                            <Card.Text>{consultaInfo.tratamento}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Observações:</Card.Title>
                            <Card.Text>{consultaInfo.obs_consulta}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Recomendações:</Card.Title>
                            <Card.Text>{consultaInfo.recomendacao}</Card.Text>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Card>

            </div>
            
        </div>
    );
}