import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiSettings, FiPower } from 'react-icons/fi';

export default function NovoPaciente () {
    return(
        <div className="novoPaciente-container">
            <section>
                <h1>Adicionar um novo paciente</h1>
            </section>

            <form>
                <input placeholder="Nome" />
                <input placeholder="E-mail" />
                <input placeholder="Género" />
                <input placeholder="Nacionalidade" />
                <input placeholder="Localidade" />
                <input placeholder="Data de nascimento" />
                <input placeholder="Altura" />
                <input placeholder="Contacto" />
                <button>ADICIONAR</button>
            </form>
        </div>
    );
}