import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Pacientes from './pages/Pacientes';
import Consulta from './pages/Consulta';
import Treino from './pages/Treino';
import Settings from './pages/Settings';
import NovoPaciente from './pages/NovoPaciente';

export default function Routes() {
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/homepage" component={Homepage} />
            <Route path="/pacientes" component={Pacientes} />
            <Route path="/consulta" component={Consulta} />
            <Route path="/treino" component={Treino} />
            <Route path="/settings" component={Settings} />
            <Route path="/novoPaciente" component={NovoPaciente} />
        </Switch>
      </BrowserRouter>  
    );
}