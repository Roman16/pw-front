import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store, persistor} from './store/store';
import Routing from './routers/routers';
import 'axios-progress-bar/dist/nprogress.css';

import Notification from './components/Notification/Notification';

import {PersistGate} from 'redux-persist/integration/react'

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Routing/>
                </BrowserRouter>
            </PersistGate>

            <Notification/>
        </Provider>
    );
}

export default App;
