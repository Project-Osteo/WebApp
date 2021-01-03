import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiHome, FiSettings, FiPlusSquare, FiPower, FiEdit2, FiTrash2, FiSave } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";

import './styles.css';

export default function Pacientes() {
    let { id } = useParams(); 

    const history = useHistory();

    const [pacienteInfo, setPacienteInfo] = useState({});
    const [listaconsultas, setListaConsultas] = useState([]);
    const [listatreinos, setListaTreinos] = useState([]);

    const [nome, setNome] = useState(pacienteInfo.nome);
    const [genero, setGenero] = useState(pacienteInfo.genero);
    const [nacionalidade, setNacionalidade] = useState(pacienteInfo.nacionalidade);
    const [localidade, setLocalidade] = useState(pacienteInfo.localidade);
    const [dataNascimento, setDataNascimento] = useState(pacienteInfo.dataNascimento);
    const [altura, setAltura] = useState(pacienteInfo.altura);
    const [telemovel, setTelemovel] = useState(pacienteInfo.telemovel);

    const updatePaciente = async () => {
        let res = await axios.patch(`http://localhost:3001/pacientes/${id}`,
        {nome: nome, genero: genero, nacionalidade: nacionalidade, 
            localidade: localidade, data_nascimento: dataNascimento, altura: altura, telemovel: telemovel})
            history.push('/pacientes/' + pacienteInfo.id_paciente);
            console.log(res);

        window.location.reload();
    }

    const deletePaciente = async () => {
        let res = await axios.delete(`http://localhost:3001/pacientes/${id}`)
        history.push('/homepage')
        console.log(res);
    } 

    useEffect(() => {
        axios
        .get(`http://localhost:3001/pacientes/${id}`)
        .then((response) => {
           /*  setPacienteInfo(response.data[0]); */
           var result = response.data[0];
           setPacienteInfo(result);
           setNome(result.nome);
           setGenero(result.genero);
           setNacionalidade(result.nacionalidade);
           setLocalidade(result.localidade);
           setDataNascimento(result.data_nascimento);
           setAltura(result.altura);
           setTelemovel(result.telemovel);
        });
    }, []);

    const handleRowClickConsulta = (id) => {
        history.push(`/consultas/${id}`);
    }

    const renderConsulta = (consulta, index) => {
        return (
            <tr key={index} onClick={() => handleRowClickConsulta(consulta.id_consulta)}>
                <td>{consulta.id_consulta}</td>
                <td>{consulta.data_consulta}</td>
                <td>{consulta.descricao_consulta}</td>
            </tr>
        )
    }

    const handleRowClickTreino = (id) => {
        history.push(`/treinos/${id}`);
    }

    const renderTreino = (treino, index) => {
        return (
            <tr key={index} onClick={() => handleRowClickTreino(treino.id_treino)}>
                <td>{treino.id_treino}</td>
                <td>{treino.data_treino}</td>
                <td>{treino.tipo_treino}</td>
            </tr>
        )
    }

    function showConsultas () {
        document.getElementById("listaConsultas").style.display = 'block';
        document.getElementById("listaTreinos").style.display = "none";

        axios
        .get(`http://localhost:3001/pacientes/${id}/consultas`)
        .then((response) => {
            console.log()
            setListaConsultas(response.data);
        });
    }

    function showTreinos () {
        document.getElementById("listaTreinos").style.display = 'block';
        document.getElementById("listaConsultas").style.display = 'none';

        axios
        .get(`http://localhost:3001/pacientes/${id}/treinos`)
        .then((response) => {
            console.log()
            setListaTreinos(response.data);
        });
    }

    function showPacienteInputUpdate () {
        document.getElementById("updatePaciente").style.display = 'block';
        document.getElementById("infoPaciente").style.display = 'none';
    }

    return(
        <div className="pacientes-container">

            <header>

                <span><h1>OSTEOCLINIC</h1></span>

                <div className="btn-group">
                    <Link type="button" to="/homepage">
                        <FiHome size={55} color="#41414d"></FiHome>
                    </Link>

                    <Link type="button" to="/settings"> 
                        <FiSettings size={55} color="#41414d"></FiSettings>
                    </Link>

                    <Link type="button">
                        <FiPower size={55} color="#41414d"></FiPower>
                    </Link>
                </div>
                
            </header>

            <div className="card text-white bg-secondary mb-3"> 
                <div className="card-header">
                    <h3>{pacienteInfo.id_paciente}. <b>{pacienteInfo.nome}</b>
                        <FiEdit2 type="button" size={20} onClick={showPacienteInputUpdate}></FiEdit2>
                        <FiTrash2 type="button" size={20} onClick={deletePaciente}></FiTrash2>
                    </h3>
                    
                </div>
                <div className="card-body" id="infoPaciente">
                    <p><b>Data de nascimento:</b> {pacienteInfo.data_nascimento}</p>

                    <p><b>Localidade:</b> {pacienteInfo.localidade}</p>

                    <p><b>Nacionalidade:</b> {pacienteInfo.nacionalidade}</p>

                    <p><b>Altura (m):</b> {pacienteInfo.altura}</p>

                    <p><b>Contacto:</b> {pacienteInfo.telemovel}</p>

                    <p><b>Sexo:</b> {pacienteInfo.genero}</p>
                </div>

                <div className="formUpdate" id="updatePaciente">
                    <p><b>Nome:</b> <input type="text" name="nome" value={nome} 
                        onChange={(e) => setNome(e.target.value)} /></p>
                    

                    <p><b>Data de nascimento:</b> <input type="text" id="dtaNasc" name="data_nascimento" value={dataNascimento} 
                        onChange={(e) => setDataNascimento(e.target.value)} /></p>
                   

                    <p><b>Localidade:</b> <input type="text" id="loc" name="localidade" value={localidade}
                        onChange={(e) => setLocalidade(e.target.value)} /></p>

                    <p><b>Nacionalidade:</b> <input type="text" id="nacio" name="nacionalidade" value={nacionalidade}
                        onChange={(e) => setNacionalidade(e.target.value)} /></p>

                    <p><b>Altura (m):</b> <input type="number" id="alt" name="altura" value={altura}
                        onChange={(e) => setAltura(e.target.valueAsNumber)} /></p>

                    <p><b>Contacto:</b> <input type="text" id="tele" name="telemovel"  value={telemovel}
                       onChange={(e) => setTelemovel(e.target.value)} /></p>
                        
                    <p><b>Sexo:</b> <input type="text" id="sexo" name="genero" defaultValue={genero}
                       onChange={(e) => setGenero(e.target.value)} /></p>

                    <FiSave type="button" size={20} onClick={updatePaciente}></FiSave>
                </div>
            </div>

            <div className="btn-container">                
                <button type="buton"  onClick={() => showConsultas()}>
                    CONSULTAS
                </button>

                <button type="buton" onClick={() => showTreinos()}>
                    TREINOS
                </button>
            </div>

            <div className="consultas"  id="listaConsultas">
                <Link type="button" to={'/novaConsulta/' + pacienteInfo.id_paciente}>
                    <FiPlusSquare size={55} color="#41414d"></FiPlusSquare>
                </Link>
                
                <div>
                    <ReactBootStrap.Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Ident.</th>
                                <th>Data</th>
                                <th>Descrição da Consulta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaconsultas.map(renderConsulta)}
                        </tbody>
                    </ReactBootStrap.Table>
                </div>
            </div>

            <div className="treinos"  id="listaTreinos">
                <Link type="button" to={'/novoTreino/' + pacienteInfo.id_paciente}>
                    <FiPlusSquare size={55} color="#41414d"></FiPlusSquare>
                </Link>

                <div>
                    <ReactBootStrap.Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Ident.</th>
                                <th>Data</th>
                                <th>Tipo de Treino</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listatreinos.map(renderTreino)}
                        </tbody>
                    </ReactBootStrap.Table>
                </div>
            </div>
        </div>
    );
}