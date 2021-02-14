import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';

import './styles.css';

export default function Login(){

    const [_, setIsError] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [idPaciente, setIdPaciente] = useState(undefined);
    const { setAuthTokens } = useAuth();

    const login = () => {
        axios.post('http://localhost:3001/utilizadores/login', {
            mail: email,
            pwd: password,
        }).then(response => {
            if(response.status === 200) {
                setAuthTokens(response.data.token);
                setIsAdmin(response.data.isadmin);
                setIdPaciente(response.data.id_paciente);
            } else {
                setIsError(true);
                console.log('else-error', response);
            }
        }).catch(e => {
            setIsError(true);
            console.log('catch-error', e);
        });
    };
    
    if(isAdmin) {
        return <Redirect to="/homepage" />
    }
    
    if (idPaciente) {
        return <Redirect to={`/profile/${idPaciente}`} />
    }

    return (
        <div className="login-container">
            <section className="form">

            <form>
                <h1>OSTEOCLINIC</h1>

                <input placeholder="E-mail" type="email" value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }} />
                <input placeholder="Password" type="password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} />
                <a type="submit" onClick={login}>LOGIN</a>

            </form>            
            </section>
        </div>
    );
}