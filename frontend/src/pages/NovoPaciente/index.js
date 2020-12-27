import React, { useState, useEffect } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { FiHome, FiSettings, FiPower } from 'react-icons/fi';
import Axios from 'axios';
import { State } from "module";

import './styles.css';

export default function NovoPaciente () {

    function handleNovoPaciente(e){
        e.preventDefault();

        const data = {
            nome,
            mail,
            genero,
            nacionalidade,
            localidade,
            dataNascimento,
            altura,
            telemovel,
        };

        Axios.post('http://localhost:3001/pacientes', data);
    }

    const [pacienteId, setPacienteId] = useState(null);
    const [nome, setNome] = useState('');
    const [mail, setMail] = useState('');
    const [genero, setGenero] = useState('');
    const [nacionalidade, setNacionalidade] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [altura, setAltura] = useState('');
    const [telemovel, setTelemovel] = useState('');


    /* const SubmitPaciente = () => {
    
            Axios.post('http://localhost:3001/pacientes', {
                
                nome: nome,
                mail: mail,
                genero: genero,
                nacionalidade: nacionalidade,
                localidade: localidade,
                data_nascimento: dataNascimento,
                altura: altura,
                telemovel: telemovel
            });

                setPaciente([...paciente, {nome: nome, mail: mail,
                genero: genero, nacionalidade: nacionalidade, localidade: localidade,
            data_nascimento: dataNascimento, altura: altura, telemovel: telemovel}
                ]);
        }; */
    

    /*useEffect(() => {
        const paciente = {
            nome: nome,
            mail: mail,
            genero: genero,
            nacionalidade: nacionalidade,
            localidade: localidade,
            data_nascimento: dataNascimento,
            altura: altura,
            telemovel: telemovel,
        };
        Axios.post('http://localhost:3001/pacientes', paciente)
        .then(response => setPacienteId(response.data.id));
    }, []); */

    return(
        
        <div className="novoPaciente-container">

            <header>
                <span><b>OSTEOCLINIC</b></span>

                <div className="btn-group">
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
                
                <form class="myForm" method="get" enctype="application/x-www-form-urlencoded" action="/html/codes/html_form_handler.cfm" onSubmit={handleNovoPaciente}>

                    

                    <label>Nome 
                    <input type="text" name="nome" required value={nome}
                       onChange={(e) => setNome(e.target.value)} />
                    </label>

                    <label>Email 
                    <input type="email" name="mail" required value={mail}
                       onChange={(e) => setMail(e.target.value)}/>
                    </label>
                        
                    <label>Genero 
                    {/* <input type="text" name="Sexo" list="optionslist"/>
                    <datalist id="optionslist">
                        <option value="Masculino"/>
                        <option value="Feminino"/>
                    </datalist> */}

                    <input type="text" name="genero" required value={genero}
                       onChange={(e) => setGenero(e.target.value)}/>
                    </label> 
                  
                    {/* <fieldset>
                        <legend>Sexo</legend> 
                            <label class="choice"><input type="radio" name="sex" required value="masculino"/> Masculino </label>
                            <label class="choice"><input type="radio" name="sex" required value="feminino"/> Feminino </label>
                    </fieldset> */}

                    <label>Nacionalidade 
                    <input type="text" name="nacionalidade" value={nacionalidade}
                       onChange={(e) => setNacionalidade(e.target.value)}/>
                    </label>
                
                    <label>Localidade 
                    <input type="text" name="localidade" value={localidade}
                       onChange={(e) => setLocalidade(e.target.value)}/>
                    </label>
                
                    <label>Data nascimento 
                    {/* <input type="date" name="pickup_time" required placeholder=""/> */}
                    <input type="text" name="pickup_time" required value={dataNascimento}
                       onChange={(e) => setDataNascimento(e.target.value)}/>
                    </label>
                
                    <label>Altura (cm)
                    <input type="number" name="altura" value={altura}
                       onChange={(e) => setAltura(e.target.value)}/>
                    </label>
                
                    <label>Contacto telemóvel 
                    <input type="tel" name="telemovel" required value={telemovel}
                       onChange={(e) => setTelemovel(e.target.value)}/>
                    </label>
                    

                    {/* <p>
                        <label>Enquiry 
                        <textarea name="comments" maxlength="500"></textarea>
                        </label>
                    </p> */}

                    <p><Link type="submit" to="/homepage">Adicionar Paciente</Link></p>

                </form>
            </div>
        </div>
    );
}