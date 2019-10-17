import React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { history } from '../utils/history';

import LoginPage from '../pages/authentication/LoginPage/LoginPage';
import RegistrationPage from '../pages/authentication/RegistrationPage/RegistrationPage';

import AuthorizedUser from '../pages';
import Optimization from '../pages/PPCAutomate/Optimization/Optimization';
import Report from '../pages/PPCAutomate/Report/Report';
import MWS from '../pages/authentication/AccountBinding/MWS/MWS';
import PPC from '../pages/authentication/AccountBinding/PPC/PPC';

const routers = () => {
    const token = localStorage.getItem('token');

    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegistrationPage} />

                <Route
                    path="/"
                    render={
                        (/*:*/
                        /*:*/) => ((
                            // token ?
                            <AuthorizedUser>
                                <Route
                                    exact
                                    path="/ppc/optimization"
                                    component={Optimization}
                                />
                                <Route
                                    exact
                                    path="/ppc/report"
                                    component={Report}
                                />
                                <Route exact path="/mws" component={MWS} />
                                <Route exact path="/ppc" component={PPC} />
                            </AuthorizedUser>
                            // :
                            // <Redirect to='login'/>
                        ) /*:*/)
                    }
                />
            </Switch>
        </Router>
    );
};

export default routers;
