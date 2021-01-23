import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiHome, FiSettings, FiPower } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import Axios from 'axios';

import './styles.css';

export default function NovoPaciente () {

    const history = useHistory();

    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');
    const [nacionalidade, setNacionalidade] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [telemovel, setTelemovel] = useState('');

    const submitPaciente = async () => {
        let res = await Axios.post('http://localhost:3001/pacientes',
        {nome: nome, sexo: sexo, nacionalidade: nacionalidade, 
            localidade: localidade, peso: peso, altura: altura, telemovel: telemovel})
            history.push('/homepage')
            console.log(res);
    }

    return(
        <div className="novoPaciente-container">

            <header>
                {/*<div className="btn-group">
                    <Link type="button" to="/homepage">
                        <FiHome size={55} color="#41414d"></FiHome>
                    </Link>

                    <Link type="button" to="/settings">
                        <FiSettings size={55} color="#41414d"></FiSettings>
                    </Link>

                    <Link type="button" to="/">
                        <FiPower size={55} color="#41414d"></FiPower>
                    </Link>
                </div>*/}

                <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                crossOrigin="anonymous"
                />

                <Navbar bg="light" expand="lg">
                <Navbar.Brand>OSTEOCLINIC</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/homepage">Homepage</Nav.Link>
                    <Nav.Link href="/estatisticas">Estatísticas</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>

            </header>

            <section> 
                <h1>ADICIONAR NOVO PACIENTE</h1>
             </section> 

            <div className="content">
                
                <form className="myForm" encType="application/x-www-form-urlencoded" action="/html/codes/html_form_handler.cfm">

                    
                    <label>Nome 
                    <input type="text" name="nome" required value={nome}
                       onChange={(e) => setNome(e.target.value)} />
                    </label>
                        
                    <label>Sexo 
                    <input type="text" name="sexo" required value={sexo}
                       onChange={(e) => setSexo(e.target.value)} />
                    </label> 

                    <label>Nacionalidade 
                    <input type="text" name="nacionalidade" value={nacionalidade}
                       onChange={(e) => setNacionalidade(e.target.value)} />
                    </label>
                
                    <label>Localidade 
                    <input type="text" name="localidade" value={localidade}
                       onChange={(e) => setLocalidade(e.target.value)} />
                    </label>

                    <label>Telemóvel 
                    <input type="tel" name="telemovel" required value={telemovel}
                       onChange={(e) => setTelemovel(e.target.value)} />
                    </label>

                    <label>Peso(m)
                    <input type="number" name="peso" value={peso}
                       onChange={(e) => setPeso(e.target.value)} />
                    </label>
                
                    <label>Altura(m)
                    <input type="number" name="altura" value={altura}
                       onChange={(e) => setAltura(e.target.value)} />
                    </label>
                    

                    <p><Link type="submit" onClick={submitPaciente}>Adicionar Paciente</Link></p>

                </form>
            </div>
        </div>
    );
}