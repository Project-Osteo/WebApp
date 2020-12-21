import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Login(){

    return (
        <div className="login-container">
            <section className="form">

            <form>
                <h1>OSTEOCLINIC</h1>

                <input placeholder="E-mail" />
                <input placeholder="Password" />
                <Link type="submit" to="/homepage" >LOGIN</Link>

            </form>            
            </section>
        </div>
    );
}