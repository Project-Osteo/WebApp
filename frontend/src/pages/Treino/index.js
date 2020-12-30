import React, { useEffect, useState } from 'react';
import { Link, useParams,useHistory } from 'react-router-dom';
import { FiHome, FiSettings, FiPower, FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";

import './styles.css';

export default function Treino () {
    let { id } = useParams();

    const history = useHistory();

    const [treinoInfo, setTreinoInfo] = useState({});

    const deleteTreino = async () => {
        let res = await axios.delete(`http://localhost:3001/treinos/${id}`)
        history.push('/pacientes/' + treinoInfo.paciente_id)
        console.log(res);
    } 
    
    useEffect(() => {
        axios
        .get(`http://localhost:3001/treinos/${id}`)
        .then((response) => {
            setTreinoInfo(response.data[0]);
        });
    }, []);

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

            <div className="treinos">

                <FiTrash2 type="button" size={20} onClick={deleteTreino}></FiTrash2>

                <p><b>Id:</b> {treinoInfo.id_treino}</p>

                <p><b>Data da treino:</b> {treinoInfo.data_treino}</p>

                <p><b>Tipo de treino:</b> {treinoInfo.tipo_treino}</p>
                
                <div className="info-treinos">
                    <p><b>Descrição:</b> {treinoInfo.descricao_treino}</p>

                    <p><b>Observações:</b> {treinoInfo.obs_treino}</p>
                </div>
            </div>         
        </div>
    );
}