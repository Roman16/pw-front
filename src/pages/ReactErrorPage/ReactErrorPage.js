import React, {Component} from 'react'

export default class ErrorBoundary extends Component {
    state = {
        error: '',
        errorInfo: '',
        hasError: false,
    }

    static getDerivedStateFromError(error) {
        console.log(error)

        return {hasError: true, error}
    }

    componentDidCatch(error, errorInfo) {
        this.setState({error, errorInfo, hasError: true})
    }

    render() {
        const {hasError, errorInfo} = this.state

        if (hasError) {
            return (
                <div className="card my-5">
                    <div className="card-header">
                        <p>
                            There was an error in loading this page.{' '}
                            <span
                                style={{cursor: 'pointer', color: '#0077FF'}}
                                onClick={() => {
                                    window.location.reload()
                                }}
                            >
            Reload this page
          </span>{' '}
                        </p>
                    </div>
                    <div className="card-body">
                        <details className="error-details">
                            <summary>Click for error details</summary>
                            {errorInfo && errorInfo.componentStack.toString()}
                        </details>
                    </div>
                </div>
            )
        } else {
            return this.props.children
        }
    }
}
