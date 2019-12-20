import React from 'react';
import {Route, Router, Switch, Redirect} from 'react-router-dom';
import {history} from '../utils/history';
import {useSelector} from 'react-redux';

import LoginPage from "../pages/authentication/LoginPage/LoginPage";
import RegistrationPage from "../pages/authentication/RegistrationPage/RegistrationPage";

import AuthorizedUser from "../pages";
import Optimization from "../pages/PPCAutomate/Optimization/Optimization";
import Report from "../pages/PPCAutomate/Report/Report";
import ProductSettings from "../pages/PPCAutomate/ProductSettings/ProductSettings";
import MWS from "../pages/authentication/AccountBinding/MWS/MWS";
import PPC from "../pages/authentication/AccountBinding/PPC/PPC";
import NotFound from "../pages/NotFound/NotFound";
import LandingAffiliates from "../pages/LandingAffiliates/LandingAffiliates";
import Dashboard from "../pages/PPCAutomate/Dashboard/Dashboard";
import Information from "../pages/Account/Information/Information";
import Billing from "../pages/Account/Billing/Billing";
import Subscription from "../pages/Account/Subscription/Subscription";
import LoginWithAmazon from "../pages/authentication/LoginWitdhAmazon/LoginWithAmazon";
import ProductList from "../components/ProductList/ProductList";
import Home from "../pages/Home/Home";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem('token') ? (
                <AuthorizedUser>
                    <Component {...props} />
                </AuthorizedUser>
            ) : (
                <Redirect to="/login"/>
            )
        }
    />
);

const ConnectedAmazonRoute = props => {
    const {mwsConnected, ppcConnected} = useSelector(state => ({
        mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
        ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false
    }));

    if (!mwsConnected) {
        return <Redirect to="/mws"/>;
    } else if (!ppcConnected) {
        return <Redirect to="/ppc"/>;
    } else {
        return <PrivateRoute {...props} />;
    }
};

const developer = process.env.REACT_APP_ENV === "developer";

const routers = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/login" component={LoginPage}/>
                {developer && <Route exact path="/affiliates" component={LandingAffiliates}/>}
                <Route path="/login/amazon/rcallback" component={LoginWithAmazon}/>
                <Route exact path="/registration" component={RegistrationPage}/>

                <ConnectedAmazonRoute
                    exact
                    path="/ppc/dashboard"
                    component={Dashboard}
                />

                <ConnectedAmazonRoute
                    exact
                    path="/ppc/optimization"
                    component={Optimization}
                />

                <ConnectedAmazonRoute
                    path="/ppc/report"
                    component={Report}
                />

                <ConnectedAmazonRoute
                    exact
                    path="/ppc/product-settings"
                    component={ProductSettings}
                />

                <PrivateRoute exact path="/mws" component={MWS}/>
                <PrivateRoute exact path="/ppc" component={PPC}/>

                {developer && <PrivateRoute exact path="/home" component={Home}/>}

                {/* ACCOUNT */}
                <PrivateRoute exact path="/account-settings" component={Information}/>
                <PrivateRoute exact path="/account-billing" component={Billing}/>
                <PrivateRoute
                    exact
                    path="/account-subscription"
                    component={Subscription}
                />

                <Route component={NotFound}/>
            </Switch>
        </Router>
    );
};

export default routers;
