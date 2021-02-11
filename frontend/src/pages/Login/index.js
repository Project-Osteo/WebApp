import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';

import './styles.css';

export default function Login(){

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [idPaciente, setIdPaciente] = useState('');
    const { setAuthTokens } = useAuth();

    const login = () => {
        axios.post('http://localhost:3001/utilizadores/login', {
            mail: email,
            pwd: password,
        }).then(response => {
            if(response.status === 200) {
                setAuthTokens(response.data);
                setIsAdmin(response.data.isadmin);
                setIdPaciente(response.data["id_paciente"]);
                setLoggedIn(true);
                console.log(response.data["id_paciente"]);
                console.log(response);
                
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    };

    if(isAdmin) {
        return <Redirect to="/homepage" />
    }

    if (isLoggedIn) {
        return <Redirect to={`/profile/${idPaciente}`} />
    }

    return (
        <div className="login-container">
            <section className="form">

            <form>
                <h1>OSTEOCLINIC</h1>

                <input placeholder="E-mail" value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }} />
                <input placeholder="Password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} />
                <Link type="submit" onClick={login}>LOGIN</Link>

            </form>            
            </section>
        </div>
    );
}