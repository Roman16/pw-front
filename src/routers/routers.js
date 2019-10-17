import React from 'react';
import {Route, Router, Switch, Redirect} from 'react-router-dom';
import {history} from '../utils/history';

import LoginPage from '../pages/authentication/LoginPage/LoginPage';
import RegistrationPage from '../pages/authentication/RegistrationPage/RegistrationPage';

import AuthorizedUser from '../pages';
import Optimization from '../pages/PPCAutomate/Optimization/Optimization';
import Report from '../pages/PPCAutomate/Report/Report';
import MWS from '../pages/authentication/AccountBinding/MWS/MWS';
import PPC from '../pages/authentication/AccountBinding/PPC/PPC';
import NotFound from "../pages/NotFound/NotFound";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('token')
            ? <Component {...props} />
            : <Redirect to='/login'/>
    )}/>
);

const routers = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/register" component={RegistrationPage}/>

                <AuthorizedUser>
                    <Switch>
                        <PrivateRoute exact path="/ppc/optimization" component={Optimization}/>
                        <PrivateRoute exact path="/ppc/report" component={Report}/>
                        <PrivateRoute exact path="/mws" component={MWS}/>
                        <PrivateRoute exact path="/ppc" component={PPC}/>

                        <Route component={NotFound}/>
                    </Switch>
                </AuthorizedUser>
            </Switch>
        </Router>
    );
};

export default routers;
