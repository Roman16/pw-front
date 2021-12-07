import React from 'react';
import ReactDOM from 'react-dom';

import './index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_TOKEN,
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
});

Sentry.setTag("build_type", process.env.REACT_APP_ENV === 'production' ? 'production' : 'developer');


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
