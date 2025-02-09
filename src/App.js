import React, {useEffect} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './store/store'
import Routing from './routers/routers'
import 'axios-progress-bar/dist/nprogress.css'
import NotificationContainer from './components/Notification/NotificationContainer'
import {SVGSource} from "./utils/icons"
import ErrorBoundary from "./pages/ReactErrorPage/ReactErrorPage"
import {checkBuildVersion} from "./utils/checkBuildVersion"

function App() {
    useEffect(() => {
        setInterval(checkBuildVersion, 600000)
    }, [])


    return (
        <Provider store={store}>
            <BrowserRouter>
                <SVGSource/>

                <ErrorBoundary>
                    <Routing/>
                </ErrorBoundary>

            </BrowserRouter>
            <NotificationContainer/>
        </Provider>
    )
}


export default App
