import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiSettings, FiPower } from 'react-icons/fi';
import Axios from 'axios';


import './styles.css';

export default function NovaConsulta (){
    return(
        <div className="novaConsulta-container">
            <section>
                <h1>Adiconar nova consulta</h1>
            </section>

            <div className="content">
                
                <form class="myForm2" method="get" enctype="application/x-www-form-urlencoded" action="/html/codes/html_form_handler.cfm">

                    <label>Peso
                    <input type="number" name="Peso" />
                    </label>

                    <label>Descrição da consulta
                    <input type="text" name="descricao Consulta" />
                    </label>

                    <label>Tratamento
                    <input type="text" name="tratamento" />
                    </label>

                    <label>Recomendações
                    <input type="text" name="recomendacoes" />
                    </label>

                    <label>Observações
                    <input type="text" name="observacoes" />
                    </label>

                    <p><Link type="submit" to="/pacientes">ADICIONAR</Link></p>
                </form>
            </div>
        </div>
    );
}