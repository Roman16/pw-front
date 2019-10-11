import React, { Component } from 'react';
import RenderRoutes from '../router/render-routers';
import MainContent from '../templates/MainContent';

class PagesRouter extends Component {
    state = {};

    render() {
        const {
            route: { routes },
        } = this.props;

        // console.log('PagesRouter routes', routes);

        return (
            <MainContent>
                <RenderRoutes routers={routes} />
            </MainContent>
        );
    }
}

export default PagesRouter;
