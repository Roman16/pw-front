import React, { Component } from 'react';
import RenderRoutes from '../router/render-routers';

class PagesRouter extends Component {
    render() {
        const { routes } = this.props.route;

        return (
            <RenderRoutes routers={routes} />
        );
    }
}

export default PagesRouter;
