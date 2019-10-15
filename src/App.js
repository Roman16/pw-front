import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import RenderRoutes from './router/render-routers';
import store from './store';
import routers from './router/routers';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <RenderRoutes routers={routers} />
            </BrowserRouter>
        </Provider>
    );
}

export default App;
