import React, { Component, Fragment } from 'react';
import RenderRoutes from './render-routers';

import routers from './routers';

class RouterView extends Component {
  state = {};

  render() {
      return (
          <Fragment>
              <RenderRoutes routers={routers} />
          </Fragment>
      );
  }
}

export default RouterView;
