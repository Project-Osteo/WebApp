import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiHome, FiSettings, FiPower } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap";
import { useHistory} from "react-router-dom";
import axios from "axios";

import './styles.css';

export default function Treino () {
    let { id } = useParams();
    const [treinoInfo, setTreinoInfo] = useState({});
    
    useEffect(() => {
        axios
        .get(`http://localhost:3001/treinos/${id}`)
        .then((response) => {
            setTreinoInfo(response.data[0]);
        });
    }, []);

    return(
        <div className="treinos-container">
            <div className="treinos">
                <p><b>Id:</b> {treinoInfo.id}</p>

                <p><b>Data da treino:</b> {treinoInfo.data_treino}</p>

                <p><b>Tipo de treino:</b> {treinoInfo.tipo}</p>
                
                <div className="info-treinos">
                    <p><b>Descrição:</b> {treinoInfo.descricao}</p>

                    <p><b>Observações:</b> {treinoInfo.obs}</p>
                </div>
            </div>         
        </div>
    );
}