import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiSettings, FiFilePlus, FiPower } from 'react-icons/fi';

import './styles.css';

export default function NovoTreino (){
    return(
       <div className="novoTreino-container">
            <section>
                <h1>ADICIONAR NOVO TREINO</h1>
            </section>

            <div className="content">
                
                <form class="myForm2" method="get" enctype="application/x-www-form-urlencoded" action="/html/codes/html_form_handler.cfm">

                    <label>Tipo de Treino
                    <input type="text" name="tipo" required list="optionslist" />
                    <datalist id="optionslist">
                        <option value="Recuperação" />
                        <option value="Fortalecimento" />
                        <option value="Rotina" />
                    </datalist>
                    </label>

                    <label>Descrição do treino
                    <textarea type="text" name="descricao" cols="40" rows="5" />
                    </label>

                    <label>Observações
                    <textarea type="text" name="observacoes" cols="40" rows="5" />
                    </label>

                    <p><Link type="submit" to="/pacientes">ADICIONAR TREINO</Link></p>
                </form>
            </div>
        </div>
    );
}

