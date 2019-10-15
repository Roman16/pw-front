import React from 'react';
import {createBrowserHistory} from 'history';
import {Redirect, Route, Router, Switch} from 'react-router-dom';

import Login from '../pages/authentication/Login/Login';
import AuthorizedUser from "../pages";

import Optimization from "../pages/PPCAutomate/Optimization/Optimization";

export const history = createBrowserHistory();

const routers = () => {

    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/login' component={Login}/>

                <Route path='/' render={() => (
                    <AuthorizedUser>
                        <Route path='/ppc/optimization' component={Optimization}/>
                    </AuthorizedUser>
                )}/>
            </Switch>
        </Router>
    )
};

export default routers;
