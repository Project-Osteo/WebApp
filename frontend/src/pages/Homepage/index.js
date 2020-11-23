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
                <strong type="button" onClick={(event) => (window.location.href = "/pacientes")}> 
                    Jona do Cota
                </strong>
            </li>
        </ul>
      </div> 
   );
}