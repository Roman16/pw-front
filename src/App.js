import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';
import Routing from './routers/routers';
import 'axios-progress-bar/dist/nprogress.css';
import NotificationContainer from './components/Notification/NotificationContainer';
import {SVGSource} from "./utils/icons";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <SVGSource/>
                <Routing/>
            </BrowserRouter>

            <NotificationContainer/>
        </Provider>
    );
}


export default App;
