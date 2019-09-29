import React, { Component } from 'react';
import MainContent from '../templates/MainContent';
import RenderRoutes from '../router/render-routers';

class PagesRouterWithMain extends Component {
    render() {
        const { routes } = this.props.route;

        return (
            <MainContent>
                <RenderRoutes routers={routes} />
            </MainContent>
        );
    }
}


export default PagesRouterWithMain;
