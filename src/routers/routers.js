import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import {history} from "../utils/history";

import NotFound from "../pages/NotFound/NotFound";

import LoginPage from '../pages/authentication/LoginPage/LoginPage';
import RegistrationPage from '../pages/authentication/RegistrationPage/RegistrationPage';

import AuthorizedUser from '../pages';
import Optimization from "../pages/PPCAutomate/Optimization/Optimization";


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
