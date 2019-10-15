import React from 'react';
import {createBrowserHistory} from 'history';
import {Redirect, Route, Router, Switch} from 'react-router-dom';

import Login from '../pages/authentication/Login/Login';
import AuthorizedUser from "../pages";

export const history = createBrowserHistory();


const routers = () => {

    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/login' component={Login}/>

                <Route path='/' render={() => (
                    <AuthorizedUser>
                        <Route exact path='/login' component={Login}/>
                    </AuthorizedUser>
                )}/>
            </Switch>
        </Router>
    )
};

export default routers;
