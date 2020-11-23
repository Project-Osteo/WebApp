import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Pacientes from './pages/Pacientes';

export default function Routes() {
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/homepage" component={Homepage} />
            <Route path="/pacientes" component={Pacientes} />
        </Switch>
      </BrowserRouter>  
    );
}