import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiHome, FiSettings, FiPower, FiArrowLeft } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap";
import { useHistory} from "react-router-dom";
import axios from "axios";

import './styles.css';

export default function Consulta () {
    let { id } = useParams();
    const [consultaInfo, setConsultaInfo] = useState({});
    
    useEffect(() => {
        axios
        .get(`http://localhost:3001/consultas/${id}`)
        .then((response) => {
            setConsultaInfo(response.data[0]);
        });
    }, []);

    return(       

        <div className="consultas-container">

            <header>
                <span><b>OSTEOCLINIC</b></span>

                <div className="btn-group">
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
                </div>
            </header>

            <div className="consultas">
                <p><b>Id:</b> {consultaInfo.id_consulta}</p>

                <p><b>Data da consulta:</b> {consultaInfo.data_consulta}</p>

                <p><b>Descrição:</b> {consultaInfo.descricao_consulta}</p>
                

                <div className="tratamento">
                    <p><b>Peso:</b> {consultaInfo.peso}</p>

                    <p><b>Tratamento realizado:</b> {consultaInfo.tratamento}</p>

                    <p><b>Observações:</b> {consultaInfo.obs_consulta}</p>
                </div>

                <p><b>Recomendações:</b> {consultaInfo.recomendacao}</p>
            </div>
            
        </div>
    );
}