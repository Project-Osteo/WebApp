import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiSettings, FiFilePlus, FiPower } from 'react-icons/fi';

import './styles.css';

export default function NovoTreino (){
    return(
       <div className="novoTreino-container">

            <section>

                <form>
                    <h1>Adicionar novo treino</h1>

                    <input placeholder="Descrição" />
                    <input placeholder="Tipo de Treino" />
                    <input placeholder="Observações" />
                    <Link type="subomit" to="/pacientes">ADICIONAR</Link>
                </form>

            </section>

       </div>
    );
}