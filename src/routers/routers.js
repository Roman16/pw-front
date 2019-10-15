import React from 'react';
import { createBrowserHistory } from 'history';

import { Redirect, Route, Router, Switch } from 'react-router-dom';

export const history = createBrowserHistory();

const routers = () => {

    return(
        <Router history={history}>
            <Switch>

            </Switch>
        </Router>
    )
};

export default routers;
