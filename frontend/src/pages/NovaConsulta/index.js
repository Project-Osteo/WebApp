import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FiHome, FiSettings, FiPower, FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';

import './styles.css';

export default function NovaConsulta (){
    let { id } = useParams();

    const history = useHistory();

    const [data, setData] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tratamento, setTratamento] = useState('');
    const [rec, setRec] = useState('');
    const [obs, setObs] = useState('');
    

    const submitConsulta = async () => {
        let res = await axios.post(`http://localhost:3001/consultas/${id}`,
        { data_consulta: data, descricao_consulta: descricao, tratamento: tratamento, obs_consulta: obs, recomendacao: rec })
            history.push(`/pacientes/${id}`);
            console.log(res);
    }

    return(
        <div className="novaConsulta-container">

            <header>
                <span><b>OSTEOCLINIC</b></span>

                <div className="btn-group">
                    <Link type="button" to={'/pacientes/' + id}>
                        <FiArrowLeft size={55} color="#41414d" />
                    </Link>

                    <Link type="button" to="/homepage">
                        <FiHome size={55} color="#41414d"></FiHome>
                    </Link>

                    <Link type="button" to="/settings">
                        <FiSettings size={55} color="#41414d"></FiSettings>
                    </Link>

                    <Link type="button" to="/">
                        <FiPower size={55} color="#41414d"></FiPower>
                    </Link>
                </div>
            </header>

            <section>
                <h1>ADICIONAR NOVA CONSULTA</h1>
            </section>

            <div className="content">
                
                <form class="myForm2" method="get" enctype="application/x-www-form-urlencoded" action="/html/codes/html_form_handler.cfm">

                    <label>Descrição da consulta
                    <textarea type="text" name="descricao Consulta" cols="40" rows="5" value={descricao}
                       onChange={(e) => setDescricao(e.target.value)}/>
                    </label>

                    <label>Tratamento
                    <textarea type="text" name="tratamento" cols="40" rows="5" value={tratamento}
                       onChange={(e) => setTratamento(e.target.value)}/>
                    </label>

                    <label>Recomendações
                    <textarea type="text" name="recomendacoes" cols="40" rows="5" value={rec}
                       onChange={(e) => setRec(e.target.value)}/>
                    </label>

                    <label>Observações
                    <textarea type="text" name="observacoes" cols="40" rows="5" value={obs}
                       onChange={(e) => setObs(e.target.value)}/>
                    </label>

                    <label>Data da Consulta(AAAA-MM-DD)
                    <input type="text" name="observacoes" cols="40" rows="5" value={data}
                       onChange={(e) => setData(e.target.value)}/>
                    </label>

                    <p><Link type="submit" onClick={submitConsulta}>ADICIONAR CONSULTA</Link></p>
                </form>
            </div>
        </div>
    );
}