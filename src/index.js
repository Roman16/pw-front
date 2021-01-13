import React from 'react';
import ReactDOM from 'react-dom';

import './index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';

const localStorageVersion = '20_3'

if (!localStorage.getItem('analyticsLocalStorageVersion') || localStorage.getItem('analyticsLocalStorageVersion') !== localStorageVersion) {
    localStorage.removeItem('analyticsMetricsState')
    localStorage.removeItem('analyticsFiltersList')
    localStorage.removeItem('analyticsChartState')
    localStorage.setItem('analyticsLocalStorageVersion', localStorageVersion)
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
