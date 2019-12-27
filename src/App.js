import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store, persistor} from './store/store';
import Routing from './routers/routers';
import 'axios-progress-bar/dist/nprogress.css';
import NotificationContainer from './components/Notification/NotificationContainer';
import {PersistGate} from 'redux-persist/integration/react'

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Routing/>
                </BrowserRouter>
            </PersistGate>

            <NotificationContainer/>
        </Provider>
    );
}



export default App;
