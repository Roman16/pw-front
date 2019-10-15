import React from 'react';
import {createBrowserHistory} from 'history';
import {Redirect, Route, Router, Switch} from 'react-router-dom';

import Login from '../pages/authentication/Login/Login';

export const history = createBrowserHistory();


const routers = () => {

    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/login' component={Login}/>
            </Switch>
        </Router>
    )
};

export default routers;
