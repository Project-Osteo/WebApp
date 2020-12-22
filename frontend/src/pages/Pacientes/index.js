import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiHome, FiSettings, FiPlusSquare, FiPower } from 'react-icons/fi';
import axios from "axios";

import './styles.css';

export default function Pacientes() {
    let { id } = useParams(); 
    const [pacienteInfo, setPacienteInfo] = useState({});
    const [listaconsultas, setListaConsultas] = useState([]);
    const [listatreinos, setListaTreinos] = useState([]);
    

    useEffect(() => {
        axios
        .get(`http://localhost:3001/api/pacientes/${id}`)
        .then((response) => {
            setPacienteInfo(response.data[0]);
        });
    }, []);


    const renderPaciente = (pacienteInfo) => {
        return (
            <div>
                <p><b>Id:</b> {pacienteInfo.id}</p>
                <p><b>Nome:</b> {pacienteInfo.nome}</p>
                <p><b>Data de nascimento:</b> {pacienteInfo.datanascimento}</p>
                <p><b>Localidade:</b> {pacienteInfo.localidade}</p>
                <p><b>Nacionalidade:</b> {pacienteInfo.nacionalidade}</p>
                <p><b>Altura:</b> {pacienteInfo.altura}</p>
                <p><b>Contacto:</b> {pacienteInfo.telemovel}</p>
                <p><b>Sexo:</b> {pacienteInfo.sexo}</p>
                <p><b>Email:</b> {pacienteInfo.mail}</p>  
            </div>
        )
    }


    const renderConsultaCard = (consulta, index) => {
        return (
            <li key={index} >
                <Link to="/consultas">
                    <p><b>Ident:</b>{consulta.id} &emsp; <b>Data:</b>{consulta.data}</p>
                    <p><b>Descrição da Consulta:</b>{consulta.descricao}</p>
                </Link>    
            </li>
        )
    }


    function showConsultas () {
        document.getElementById("listaConsultas").style.display = 'block';
        document.getElementById("listaTreinos").style.display = "none";

        axios
        .get(`http://localhost:3001/api/pacientes/${id}/consultas`)
        .then((response) => {
            console.log()
            setListaConsultas(response.data);
        });
    }


    function showTreinos () {
        document.getElementById("listaTreinos").style.display = 'block';
        document.getElementById("listaConsultas").style.display = 'none';
    }


    return(
        <div className="pacientes-container">

            <header>

                <span><h1>OSTEOCLINIC</h1></span>

                <div className="btn-group">
                    <Link type="button" to="/homepage">
                        <FiHome size={55} color="#41414d"></FiHome>
                    </Link>

                    <Link type="button" to="/settings"> 
                        <FiSettings size={55} color="#41414d"></FiSettings>
                    </Link>

                    <Link type="button">
                        <FiPower size={55} color="#41414d"></FiPower>
                    </Link>
                </div>
                
            </header>

            <div className="info-paciente">
                //CARREGAR A INFORMAÇÃO DO CLIENTE
                <div>
                    <p><b>Id:</b> {pacienteInfo.id}</p>
                    <p><b>Nome:</b> {pacienteInfo.nome}</p>
                    <p><b>Data de nascimento:</b> {pacienteInfo.datanascimento}</p>
                    <p><b>Localidade:</b> {pacienteInfo.localidade}</p>
                    <p><b>Nacionalidade:</b> {pacienteInfo.nacionalidade}</p>
                    <p><b>Altura:</b> {pacienteInfo.altura}</p>
                    <p><b>Contacto:</b> {pacienteInfo.telemovel}</p>
                    <p><b>Sexo:</b> {pacienteInfo.sexo}</p>
                    <p><b>Email:</b> {pacienteInfo.mail}</p>  
                </div>
            </div>

            <div className="btn-container">                
                <button type="buton"  onClick={() => showConsultas()}>
                    CONSULTAS
                </button>

                <button type="buton" onClick={() => showTreinos()}>
                    TREINOS
                </button>
            </div>

            <div className="consultas"  id="listaConsultas">
                <Link type="button" to="/novaConsulta">
                    <FiPlusSquare size={55} color="#41414d"></FiPlusSquare>
                </Link>
                <ul>
                        <Link to="/consulta">
                        {listaconsultas.map(renderConsultaCard)}
                        </Link> 
                </ul>
            </div>

            <div className="treinos"  id="listaTreinos">
                <Link type="button" to="/novoTreino">
                    <FiPlusSquare size={55} color="#41414d"></FiPlusSquare>
                </Link>
                <ul>
                    <li>
                        <Link to="/pacientes">
                        <p><b>Nome:</b>Jona do cota</p>
                        <p><b>Email:</b>jonadocota@hotmail.com</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}