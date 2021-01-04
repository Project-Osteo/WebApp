import React, { useEffect, useState } from 'react';
import { Link, useParams,useHistory } from 'react-router-dom';
import { FiHome, FiSettings, FiPower, FiArrowLeft, FiEdit2, FiTrash2, FiSave } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";

import './styles.css';

export default function Treino () {
    let { id } = useParams();

    const history = useHistory();

    const [treinoInfo, setTreinoInfo] = useState({});

    const [dataTreino, setData] = useState(treinoInfo.data);
    const [descricaoTreino, setDescricao] = useState(treinoInfo.descricaoTreino);
    const [obsTreino, setObs] = useState(treinoInfo.obs);
    const [tipoTreino, setTipo] = useState(treinoInfo.tipoTreino);
    const [nomePaciente, setNomePaciente] = useState(treinoInfo.nome)
    
    const updateTreino = async () => {
        let res = await axios.patch(`http://localhost:3001/treinos/${id}`,
            {data_treino: dataTreino, tipo_treino: tipoTreino, descricao_treino: descricaoTreino, obs_treino: obsTreino, nome: nomePaciente})
        console.log(res)

        window.location.reload();
    }


    const deleteTreino = async () => {
        let res = await axios.delete(`http://localhost:3001/treinos/${id}`)
        history.push('/pacientes/' + treinoInfo.paciente_id)
        console.log(res);
    } 
    
    useEffect(() => {
        axios
        .get(`http://localhost:3001/treinos/${id}`)
        .then((response) => {
            var result = response.data[0];
            setTreinoInfo(result);
            setData(result.data_treino);
            setTipo(result.tipo_treino);
            setDescricao(result.descricao_treino);
            setObs(result.obs_treino);
            setNomePaciente(result.nome);
        });
    }, []);
    
    function showTreinoInputUpdate () {
        document.getElementById("updateTreino").style.display = 'block';
        document.getElementById("infoTreino").style.display = 'none';
    }

    return(
        <div className="treinos-container">

            <header>
                <span><b>OSTEOCLINIC</b></span>

                <div className="btn-group">
                    <Link type="button" to={'/pacientes/' + treinoInfo.paciente_id}>
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

            <div className="card text-white bg-secondary mb-3">

                <div className="card-header">
                    <h3>{treinoInfo.id_treino}. <b>{treinoInfo.nome} ({treinoInfo.data_treino})</b> 
                        <FiEdit2 type="button" size={20} onClick={showTreinoInputUpdate}></FiEdit2>
                        <FiTrash2 type="button" size={20} onClick={deleteTreino}></FiTrash2>
                    </h3>
                </div>

                <div className="card-body" id="infoTreino">
                    <p><b>Tipo de Treino:</b> {treinoInfo.tipo_treino}</p>

                    <p><b>Descricção:</b> {treinoInfo.descricao_treino}</p>

                    <p><b>Observações:</b> {treinoInfo.obs_treino}</p>
                </div>

                <div className="formUpdate" id="updateTreino">
                    <p><b>Data da consulta:</b> <input type="text" name="data" value={dataTreino} maxlength={10}
                        onChange={(e) => setData(e.target.value)} /></p>

                    <p><b>Tipo de treino:</b> <input type="text" name="tipo" value={tipoTreino}
                       onChange={(e) => setTipo(e.target.value)} /></p>

                    <p><b>Descrição:</b></p>
                    <textarea type="text" name="descricao" cols="142" rows="5" value={descricaoTreino}
                       onChange={(e) => setDescricao(e.target.value)} />

                    <p><b>Observações:</b></p>
                    <textarea type="text" name="obs" cols="142" rows="5" value={obsTreino}
                       onChange={(e) => setObs(e.target.value)} />

                    <FiSave type="button" size={20} onClick={updateTreino}></FiSave>   
                </div>
            </div>         
        </div>
    );
}