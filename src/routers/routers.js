import React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { history } from '../utils/history';
import { useSelector } from 'react-redux';

import LoginPage from '../pages/authentication/LoginPage/LoginPage';
import RegistrationPage from '../pages/authentication/RegistrationPage/RegistrationPage';

import AuthorizedUser from '../pages';
import Optimization from '../pages/PPCAutomate/Optimization/Optimization';
import Report from '../pages/PPCAutomate/Report/Report';
import ProductSettings from '../pages/PPCAutomate/ProductSettings/ProductSettings';
import MWS from '../pages/authentication/AccountBinding/MWS/MWS';
import PPC from '../pages/authentication/AccountBinding/PPC/PPC';
import NotFound from '../pages/NotFound/NotFound';
import Dashboard from '../pages/PPCAutomate/Dashboard/Dashboard';
import Account from '../pages/AccountInformation/Account/Account';
import LoginWithAmazon from '../pages/authentication/LoginWitdhAmazon/LoginWithAmazon';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <AuthorizedUser>
          <Component {...props} />
        </AuthorizedUser>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const ConnectedAmazonRoute = props => {
  const mwsConnected = useSelector(state =>
      state.user.account_links
        ? state.user.account_links.amazon_mws.is_connected
        : null
    ),
    ppcConnected = useSelector(state =>
      state.user.account_links
        ? state.user.account_links.amazon_ppc.is_connected
        : null
    );

  if (!mwsConnected) {
    return <Redirect to="/mws" />;
  } else if (!ppcConnected) {
    return <Redirect to="/ppc" />;
  } else {
    return <PrivateRoute {...props} />;
  }
};

const routers = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route path="/login/amazon/rcallback" component={LoginWithAmazon} />
        <Route exact path="/registration" component={RegistrationPage} />

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
        <ConnectedAmazonRoute path="/ppc/report" component={Report} />
        <ConnectedAmazonRoute
          exact
          path="/ppc/product-settings"
          component={ProductSettings}
        />

        <PrivateRoute exact path="/mws" component={MWS} />
        <PrivateRoute exact path="/ppc" component={PPC} />
        <PrivateRoute exact path="/zero-to-hero" component={Account} />

        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default routers;
