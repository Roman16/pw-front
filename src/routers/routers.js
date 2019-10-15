import React from 'react';
import {createBrowserHistory} from 'history';
import {Route, Router, Switch} from 'react-router-dom';

import NotFound from "../pages/NotFound/NotFound";

import LoginPage from '../pages/authentication/LoginPage/LoginPage';
import RegistrationPage from '../pages/authentication/RegistrationPage/RegistrationPage';

import AuthorizedUser from '../pages';
import Optimization from "../pages/PPCAutomate/Optimization/Optimization";

export const history = createBrowserHistory();

const routers = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/login' component={LoginPage}/>
                <Route exact path="/register" component={RegistrationPage}/>



                <Route path='/' render={() => (
                    <AuthorizedUser>
                        <Route exact path='/ppc/optimization' component={Optimization}/>

                        {/*<Route component={NotFound}/>*/}
                    </AuthorizedUser>
                )}/>

            </Switch>
        </Router>
    );
};

export default routers;
