import React from 'react';
import { createBrowserHistory } from 'history';

import { Redirect, Route, Router, Switch, HashRouter } from 'react-router-dom';

export const history = createBrowserHistory();

const renderComponent = (route, props, extraProps) => (
    <route.component {...props} {...extraProps} route={route} />

);

export const next = (path) => (
    path || true
);

const RenderRoutes = ({ routers }, { extraProps = {} }) => (routers ? (
    <HashRouter history={history}>

        <Switch>

            {routers && routers.map((route, i) => (
                <Route
                    key={route.key || i}
                    path={route.path}
                    exact={route.exact}
                    strict={route.strict}
                    render={(props) => {
                        const { before } = route;

                        if (route.hasOwnProperty('before')
                            && typeof before === 'function') {
                            const result = before();

                            if (typeof result === 'string') {
                                return <Redirect to={result} />;
                            }

                            return renderComponent(route, props, extraProps);
                        }

                        return renderComponent(route, props, extraProps);
                    }}
                />
            ))}
        </Switch>
    </HashRouter>

) : null);

export default RenderRoutes;
