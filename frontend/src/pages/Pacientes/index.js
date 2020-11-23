import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Pacientes() {
    return(
        <div className="pacientes-container">

            <header>
                <p><b>Nome:</b> Jona do cota</p>
                <p><b>Idade:</b> 28 anos</p>
                <p><b>Localidade:</b> Charca de Famões</p>
                <p><b>Peso:</b> 70kg</p>
                <p><b>Altura:</b> 1,80m</p>
            </header>

        </div>
    );
}