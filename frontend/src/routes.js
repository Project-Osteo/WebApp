import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Pacientes from './pages/Pacientes';
import Consulta from './pages/Consulta';
import Treino from './pages/Treino';
import Estatisticas from './pages/Estatisticas';
import NovaConsulta from './pages/NovaConsulta';
import NovoTreino from './pages/NovoTreino';
import Profile from './frontoffice/Profile';

import { AuthContext } from './context/auth';
import PrivateRoute from './PrivateRoute';

export default function Routes() {

    const existingTokens = JSON.parse(localStorage.getItem("tokens"));
    const [authTokens, setAuthTokens] = useState(existingTokens);

    const setTokens = (data) => {
      localStorage.setItem("tokens", JSON.stringify(data));
      setAuthTokens(data);
    }

    return (

      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>

          <BrowserRouter>
          <Switch>
              <Route path="/" exact component={Login} />
              <PrivateRoute path="/homepage" component={Homepage} />
              <PrivateRoute path="/pacientes/:id" component={Pacientes} />
              <PrivateRoute path="/consultas/:id" component={Consulta} />
              <PrivateRoute path="/treinos/:id" component={Treino} />
              <PrivateRoute path="/estatisticas" component={Estatisticas} />
              <PrivateRoute path="/novaConsulta/:id" component={NovaConsulta} />
              <PrivateRoute path="/novoTreino/:id" component={NovoTreino} />

              <PrivateRoute path="/profile/:id" component={Profile} />

          </Switch>
        </BrowserRouter>  

      </AuthContext.Provider>
      
    );
}