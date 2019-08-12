import React, { Component } from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import './App.less';
import 'bootstrap/dist/css/bootstrap.css';
import PPCAutomate from './pages/PPCAutomate';
import store from './store';


// https://profitwhales.com/ppc-automation/product?page=1&size=2


class App extends Component {
    render() {
        return (
            <Provider store={store}>

                <PPCAutomate />
            </Provider>
        );
    }
}

export default App;
