import React from 'react';
import { Link } from 'react-router-dom';
import { FiUserPlus, FiSettings, FiPower } from 'react-icons/fi';

import './styles.css';

export default function Homepage() {
   return(
      <div className="homepage-container">
          <header>

              <span>Bem-vindo Osteo</span>

              <div className="btn-group">
                    <Link type="button" to="/pacientes">
                        <FiUserPlus size={55} color="#41414d"></FiUserPlus>
                    </Link>

                    <Link type="button" to="/pacientes">
                        <FiSettings size={55} color="#41414d"></FiSettings>
                    </Link>

                    <Link type="button" to="/pacientes">
                        <FiPower size={55} color="#41414d"></FiPower>
                    </Link>
              </div>

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