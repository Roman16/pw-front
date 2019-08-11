import React, { Component } from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import './App.less';
import 'bootstrap/dist/css/bootstrap.css';
import PPCAutomate from './pages/PPCAutomate';
import store from './store';


// https://profitwhales.com/ppc-automation/product?page=1&size=2
axios.defaults.withCredentials = true;
document.cookie = 'sdsd=sss;domain=profitwhales.com;path=/';
axios.get('https://profitwhales.com/ppc-automation/product?page=1&size=2', {
    withCredentials: true,
})
    .then((response) => {
        console.log(response);
    });

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
