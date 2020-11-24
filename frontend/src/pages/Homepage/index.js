import React from 'react';
import { Link } from 'react-router-dom';
import { FiUserPlus, FiSettings, FiPower } from 'react-icons/fi';

import './styles.css';

export default function Homepage() {
   return(
      <div className="homepage-container">
          <header>
              <span>Bem-vindo Osteo</span>

                <Link to="/pacientes">
                    <FiUserPlus size={18} />
                </Link>

                <Link>
                    <FiSettings size={18} />
                </Link>

                <Link>
                    <FiPower size={18} />
                </Link>

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