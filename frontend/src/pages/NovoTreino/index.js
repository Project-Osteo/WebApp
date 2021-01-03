import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FiHome, FiSettings, FiPower, FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';

import './styles.css';

export default function NovoTreino (){
    let { id } = useParams();

    const history = useHistory();

    const [data, setData] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tipo, setTipo] = useState('');
    const [obs, setObs] = useState('');

    const submitTreino = async () => {
        let res = await axios.post(`http://localhost:3001/treinos/${id}`,
        { data_treino: data, descricao_treino: descricao, tipo_treino: tipo, obs_treino: obs})
            history.push(`/pacientes/${id}`);
            console.log(res);
    }

    return(
       <div className="novoTreino-container">

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
                <h1>ADICIONAR NOVO TREINO</h1>
            </section>

            <div className="content">
                
                <form className="myForm2" encType="application/x-www-form-urlencoded" action="/html/codes/html_form_handler.cfm">

                    <label>Tipo de Treino
                    <input type="text" name="tipo" list="optionslist" value={tipo}
                       onChange={(e) => setTipo(e.target.value)}/>
                    <datalist id="optionslist">
                        <option value="Recuperação" />
                        <option value="Fortalecimento" />
                        <option value="Rotina" />
                    </datalist>
                    </label>

                    <label>Descrição do treino
                    <textarea type="text" name="descricao" cols="40" rows="5" value={descricao}
                       onChange={(e) => setDescricao(e.target.value)}/>
                    </label>

                    <label>Observações
                    <textarea type="text" name="observacoes" cols="40" rows="5" value={obs}
                       onChange={(e) => setObs(e.target.value)}/>
                    </label>

                    <label>Data do Treino
                    <input type="text" name="observacoes" cols="40" rows="5" value={data}
                       onChange={(e) => setData(e.target.value)}/>
                    </label>

                    <p><Link type="submit" onClick={submitTreino}>ADICIONAR TREINO</Link></p>
                </form>
            </div>
        </div>
    );
}

