import React, {Component} from 'react'
import * as Sentry from "@sentry/react"
import img from '../../assets/img/icons/react-error-img.svg'
import {SocialLinks} from "../../components/Sidebar/Sidebar"
import './ReactErrorPage.less'
import {history} from "../../utils/history"
import {checkBuildVersion} from "../../utils/checkBuildVersion"

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
            scope.setExtras(info)
            const eventId = Sentry.captureException(error)
            this.setState({eventId, info})
        })
    }

    goBackHandler = () => {
        this.setState({hasError: false}, () => history.goBack())
        setTimeout(() => {
            window.location.reload();
        }, 100)
    }

    hoHomeHandler = () => {
        this.setState({hasError: false}, () => history.push('/home'))
        setTimeout(() => {
            window.location.reload();
        }, 100)
    }

    render() {
        const {hasError, error, info} = this.state
        const {children} = this.props

        if (hasError) {
            checkBuildVersion()
        }

        return hasError ? <ErrorTemplate
            onGoBack={this.goBackHandler}
            onGoHome={this.hoHomeHandler}
        /> : children
    }
}


const ErrorTemplate = ({onGoBack, onGoHome}) => {

    return (
        <div className="react-error-page">
            <img src={img} alt=""/>
            <h2>Oops! Something went wrong</h2>
            <p>
                Brace yourself till we get the error fixed. <br/>
                You may also refresh the page or try again later.
            </p>

            <div className="actions">
                <button className="btn white" onClick={onGoBack}>
                    Go Back
                </button>

                <button className="btn default" onClick={onGoHome}>
                    Go Home
                </button>
            </div>

            <SocialLinks/>
        </div>
    )
}
