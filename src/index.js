import React from 'react';
import ReactDOM from 'react-dom';
import initialInterceptors from './authentication/interceptors';
import App from './App';

import './index.less';

import * as serviceWorker from './serviceWorker';

initialInterceptors();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
