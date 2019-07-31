import React, { Component, Fragment } from 'react';
import './App.less';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import RouterView from './router';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Fragment>
                        <RouterView />
                    </Fragment>
                </BrowserRouter>


            </Provider>
        );
    }
}

export default App;
