import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Homepage from './pages/Homepage';

export default function Routes() {
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/homepage" component={Homepage} />
        </Switch>
      </BrowserRouter>  
    );
}