import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import RouterView from './router';
import './App.less';


// https://profitwhales.com/ppc-automation/product?page=1&size=2
window.BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://front1.profitwhales.com';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <RouterView />
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
