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
                    <textarea type="text" name="descricao Consulta" cols="40" rows="5" />
                    </label>

                    <label>Tratamento
                    <textarea type="text" name="tratamento" cols="40" rows="5" />
                    </label>

                    <label>Recomendações
                    <textarea type="text" name="recomendacoes" cols="40" rows="5" />
                    </label>

                    <label>Observações
                    <textarea type="text" name="observacoes" cols="40" rows="5" />
                    </label>

                    <p><Link type="submit" to="/pacientes">ADICIONAR CONSULTA</Link></p>
                </form>
            </div>
        </div>
    );
}