import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FiHome, FiSettings, FiPower, FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";

import './styles.css';

export default function Consulta () {
    let { id } = useParams();

    const history = useHistory();

    const [consultaInfo, setConsultaInfo] = useState({});

    const [dataConsulta, setData] = useState(consultaInfo.dataConsulta);
    const [peso, setPeso] = useState(consultaInfo.peso);
    const [descricaoConsulta, setDescricao] = useState(consultaInfo.descricaoConsulta);
    const [tratamento, setTratamento] = useState(consultaInfo.tratamento);
    const [recomendacao, setRec] = useState(consultaInfo.recomendacao);
    const [obsConsulta, setObs] = useState(consultaInfo.obsConsulta);

    const updateConsulta = async () => {
        let res = await axios.patch(`http://localhost:3001/consultas/${id}`,
        {data_consulta: dataConsulta, peso: peso, descricao_consulta: descricaoConsulta, 
            tratamento: tratamento, recomendacao: recomendacao, obs_consulta: obsConsulta})
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
            setPeso(result.peso);
            setTratamento(result.tratamento);
            setObs(result.obs_consulta);
            setRec(result.recomendacao);
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
                    <p><b>Peso:</b> {consultaInfo.peso}</p>
                    <input type="text" name="peso" value={peso}
                       onChange={(e) => setPeso(e.target.value)} />

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
            </div>
            
        </div>
    );
}