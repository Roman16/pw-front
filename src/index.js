import React from 'react';
import ReactDOM from 'react-dom';

import './index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
    dsn: "https://ad337f23da9248c997a56ad98f9e634f@o1082247.ingest.sentry.io/6090437",
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
