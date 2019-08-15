import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.less';
import PPCAutomate from './pages/PPCAutomate';
import PPCReport from './pages/PPCReport';
import store from './store';


// https://profitwhales.com/ppc-automation/product?page=1&size=2


class App extends Component {
    render() {
        return (
            <Provider store={store}>

                <PPCReport />
            </Provider>
        );
    }
}

export default App;
