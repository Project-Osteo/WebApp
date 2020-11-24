import React from 'react';
import { Link } from 'react-router-dom';
import { FiSettings, FiPower } from 'react-icons/fi';

import './styles.css';

export default function Pacientes() {
    return(
        <div className="pacientes-container">

            <header>

                <span>Jona do cota</span>

                <div className="btn-group">
                    <Link>
                        <FiSettings size={55} color="#41414d"></FiSettings>
                    </Link>

                    <Link>
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
            
        </div>
    );
}