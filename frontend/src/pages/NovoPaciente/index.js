import React, { useState, useEffect } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { FiHome, FiSettings, FiPower } from 'react-icons/fi';
import Axios from 'axios';
import { State } from "module";

import './styles.css';

export default function NovoPaciente () {
    const [nome, setNome] = useState('');

    const submitPaciente = () => {
        Axios.post('http://localhost:3001/api/insertpaciente', {nome: nome}).then(() => {
            alert("successful insert");
        });
    };

    return(
        
        <div className="novoPaciente-container">

            <section> 
                <h1>Adicionar novo paciente</h1>
             </section> 

            <div className="content">

                {/* <h1>Adicionar novo paciente</h1> */}

                {/* <form>
                    <input type="text" name="nome" placeholder="Nome" 
                        onChange={(e) => {
                            setNome(e.target.value);
                        }} />
                    <input type="text" placeholder="E-mail" />
                    <input placeholder="Sexo" />
                    <input type="text" placeholder="Nacionalidade" />
                    <input type="text" placeholder="Localidade" />
                    <input placeholder="Data de nascimento" />
                    <input placeholder="Altura" />
                    <input type="text" placeholder="Contacto" />
                    <Link type="submit" to="/homepage">ADICIONAR</Link>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={submitPaciente}>ADICIONAR</button>
                </form>  */}
                
                <form class="myForm" method="get" enctype="application/x-www-form-urlencoded" action="/html/codes/html_form_handler.cfm">

                    

                    <label>Nome 
                    <input type="text" name="nome" required />
                    </label>

                    <label>Email 
                    <input type="email" name="mail" />
                    </label>
                        
                    <label>Sexo 
                    <input type="text" name="Sexo" required list="optionslist"/>
                    <datalist id="optionslist">
                        <option value="Masculino"/>
                        <option value="Feminino"/>
                    </datalist>
                    </label> 
                  
                    {/* <fieldset>
                        <legend>Sexo</legend> 
                            <label class="choice"><input type="radio" name="sex" required value="masculino"/> Masculino </label>
                            <label class="choice"><input type="radio" name="sex" required value="feminino"/> Feminino </label>
                    </fieldset> */}

                    <label>Nacionalidade 
                    <input type="text" name="nacionalidade" />
                    </label>
                
                    <label>Localidade 
                    <input type="text" name="localidade" />
                    </label>
                
                    <label>Data nascimento 
                    <input type="date" name="pickup_time" required placeholder=""/>
                    </label>
                
                    <label>Altura (cm)
                    <input type="number" name="altura" />
                    </label>
                
                    <label>Contacto telemóvel 
                    <input type="tel" name="telemovel" required />
                    </label>
                    

                    {/* <p>
                        <label>Enquiry 
                        <textarea name="comments" maxlength="500"></textarea>
                        </label>
                    </p> */}

                    <p><Link type="submit" to="/homepage" onClick={submitPaciente}>Adicionar Paciente</Link></p>

                </form>
            </div>
        </div>
    );
}