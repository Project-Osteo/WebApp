import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiSettings, FiPower } from 'react-icons/fi';

import './styles.css';

export default function NovaConsulta (){
    return(
        <div className="novaConsulta-container">
            <section>

                <form>
                    <h1>Adiconar nova consulta</h1>

                    <input placeholder="Descrição da consulta" />
                    <input placeholder="Peso" />
                    <input placeholder="Tratamento" />
                    <input placeholder="Observações" />
                    <input placeholder="Recomendações" />
                    <Link type="submit" to="/pacientes">ADICIONAR</Link>
                </form>

            </section>
        </div>
    );
}