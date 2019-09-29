import React, { Component } from 'react';
import RenderRoutes from '../router/render-routers';
import MainContent from '../templates/MainContent';

class PagesRouter extends Component {
    render() {
        const { route: { routes } } = this.props;

        return (
            <MainContent>
                <RenderRoutes routers={routes} />
            </MainContent>
        );
    }
}

export default PagesRouter;
