import React, {Component} from 'react'
import * as Sentry from "@sentry/react";

export default class ErrorBoundary extends Component {
    state = {
        hasError: false,
        error: {message: '', stack: ''},
        info: {componentStack: ''}
    }

    static getDerivedStateFromError = error => {
        return {hasError: true}
    }

    componentDidCatch = (error, info) => {
        this.setState({error, info})

        Sentry.withScope((scope) => {
            scope.setExtras(info);
            const eventId = Sentry.captureException(error);
            this.setState({ eventId, info });
        });
    }

    render() {
        const {hasError, error, info} = this.state
        const {children} = this.props

        return hasError ? <div><h1>error</h1></div> : children
    }
}
