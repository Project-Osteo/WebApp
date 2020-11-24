import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Homepage() {
   return(
      <div className="homepage-container">
          <header>
              <span>Bem-vindo Osteo</span>
          </header>

        <ul>
            <li>
                <Link to="/pacientes">
                <p><b>Nome:</b> Jona do cota</p>
                <p><b>Email:</b> jonadocota@hotmail.com</p>
                </Link>              
            </li>
            <li>
                <Link to="/pacientes">
                <p><b>Nome:</b>Jona do cota</p>
                <p><b>Email:</b>jonadocota@hotmail.com</p>
                </Link>    
            </li>
        </ul>
      </div> 
   );
}