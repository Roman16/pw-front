import React, {Suspense} from 'react'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import {history} from '../utils/history'
import RouteLoader from "../components/RouteLoader/RouteLoader"
import PPCRedirect from "../pages/authentication/AccountBinding/components/ConnectPpc/PPCRedirect"
import PpcProcessing from "../pages/authentication/AccountBinding/components/PpcProcessing/PpcProcessing"

const AuthorizedUser = React.lazy(() => import('../pages'))
const NotFound = React.lazy(() => import('../pages/404/404'))

const LoginPage = React.lazy(() => import('../pages/authentication/LoginPage/LoginPage'))
const RegistrationPage = React.lazy(() => import('../pages/authentication/RegistrationPage/RegistrationPage'))
const AgencyRegistrationPage = React.lazy(() => import('../pages/authentication/AgencyRegistration/AgencyRegistration'))
const ConfirmEmailPage = React.lazy(() => import('../pages/authentication/ConfirmEmailPage/ConfirmEmailPage'))
const ResetPassword = React.lazy(() => import('../pages/authentication/ResetPassword/ResetPassword'))
const LoginWithAmazon = React.lazy(() => import('../pages/authentication/LoginWithAmazon/LoginWithAmazon'))
const ThankPage = React.lazy(() => import('../pages/authentication/AccountBinding/ThankPage/ThankPage'))

const developer = process.env.REACT_APP_ENV === "developer"


const routers = () => {
    return (
        <Suspense fallback={<RouteLoader/>}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to={'/login'}/>}/>

                    {/*-----------------------------------------------------------*/}
                    <Route exact path="/login/:status?" component={LoginPage}/>
                    <Route exact path="/registration/:tag?" component={RegistrationPage}/>
                    <Route exact path="/agency-registration/:token" component={AgencyRegistrationPage}/>

                    <Route exact path="/confirm-email/:token?" component={ConfirmEmailPage}/>
                    <Route exact path="/reset-password/:userId?/:token?" component={ResetPassword}/>
                    <Route path="/login/amazon/rcallback" component={LoginWithAmazon}/>
                    <Route path="/success-connect" component={ThankPage}/>
                    <Route exact path="/ppc-redirect" component={PPCRedirect}/>
                    {/*-----------------------------------------------------------*/}

                    <Route exact path={'/404'} component={NotFound}/>

                    <Route exact path={'/amazon-ads-api-oauth-callback'} component={PpcProcessing}/>

                    {/*<Route path={'/'} render={(props) => {*/}
                    {/*    if (localStorage.getItem('token')) {*/}
                    {/*        return <AuthorizedUser {...history}/>*/}
                    {/*    } else {*/}
                    {/*        return <Redirect*/}
                    {/*            to={`/login?redirect=${history.location.pathname + history.location.search}`}/>*/}
                    {/*    }*/}
                    {/*}*/}
                    {/*}/>*/}
                    <Route path={'/'} render={(props) => {
                            return <AuthorizedUser {...history}/>
                    }
                    }/>
                </Switch>
            </Router>
        </Suspense>
    )
}

export default React.memo(routers)
