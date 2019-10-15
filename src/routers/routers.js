import React from 'react';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';

import LoginPage from '../pages/authentication/LoginPage/LoginPage';
import RegistrationPage from '../pages/authentication/RegistrationPage/RegistrationPage';

export const history = createBrowserHistory();

const routers = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegistrationPage} />
            </Switch>
        </Router>
    );
};

export default routers;
