import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiSettings, FiPower } from 'react-icons/fi';

import './styles.css';

export default function Pacientes() {
    return(
        <div className="pacientes-container">

            <header>

                <span>Jona do cota</span>

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
                    <p><b>Idade:</b> 28 anos</p>
                    <p><b>Localidade:</b> Charca de Famões</p>
                    <p><b>Peso:</b> 70kg</p>
                    <p><b>Nacionalidade:</b> Portuguesa</p>
                    <p><b>Altura:</b> 1,80m</p>
                    <p><b>Contacto:</b> 9112121212</p>
                    <p><b>Sexo:</b> Masculino</p>
                    <p><b>Email:</b> jonadocota@gmail.com</p>               
            </div>

            <div className="btn-container">                
                <button type="buton">
                    CONSULTAS
                </button>

                <button type="buton">
                    TREINOS
                </button>
            </div>

            <ul>
                <li>
                    <Link to="/consulta">
                    <p><b>Data:</b> 26/11/2020</p>
                    <p><b>Descrição:</b> Dores de qualquer coisa</p>
                    </Link> 
                </li>
            </ul>
            
        </div>
    );
}