import React from 'react';

import './styles.css';

export default function Login(){
    return (
        <div className="login-container">
            <section className="form">

            <form>
                <h1>OSTEOCLINIC</h1>

                <input placeholder="E-mail" />
                <input placeholder="Password" />
                <button type="submit">LOGIN</button>

            </form>            
            </section>
        </div>
    );
}