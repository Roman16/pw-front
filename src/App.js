import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store, persistor} from './store/store';
import Rousting from './routers/routers';

import {PersistGate} from 'redux-persist/integration/react'

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Rousting/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
