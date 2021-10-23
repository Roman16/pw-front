import React, {Suspense} from 'react'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import {history} from '../utils/history'
import RouteLoader from "../components/RouteLoader/RouteLoader"
import PPCRedirect from "../pages/authentication/AccountBinding/components/ConnectPpc/PPCRedirect"

const LandingZTH = React.lazy(() => import('../pages/LandingPages/ZTH/ZTH'))
const LandingAutomation = React.lazy(() => import('../pages/LandingPages/Automation/LandingAutomation'))
const LandingAffiliates = React.lazy(() => import('../pages/LandingPages/Affiliates/LandingAffiliates'))
const Ebook = React.lazy(() => import('../pages/LandingPages/Ebook/Ebook'))
const ThankYou = React.lazy(() => import('../pages/LandingPages/Ebook/ThankYou'))
const AboutUs = React.lazy(() => import('../pages/LandingPages/AboutUs/AboutUs'))
const Pricing = React.lazy(() => import('../pages/LandingPages/Pricing/Pricing'))
const PricingOld = React.lazy(() => import('../pages/LandingPages/PricingOld/PricingOld'))
const PPCScanner = React.lazy(() => import('../pages/LandingPages/PPCScanner/PPCScanner'))
const DemoCall = React.lazy(() => import('../pages/LandingPages/DemoCall/DemoCall'))
const ContactUs = React.lazy(() => import('../pages/LandingPages/ContactUs/ContactUs'))
const HelpSupport = React.lazy(() => import('../pages/LandingPages/ContactUs/HelpSupport'))
const BookDemo = React.lazy(() => import('../pages/LandingPages/ContactUs/BookDemo'))
const Partners = React.lazy(() => import('../pages/LandingPages/ContactUs/Partners'))
const Audit = React.lazy(() => import('../pages/LandingPages/ContactUs/Audit'))
const PrivacyPolicy = React.lazy(() => import('../pages/LandingPages/PrivacyPolicy/PrivacyPolicy'))
const TermsOfUse = React.lazy(() => import('../pages/LandingPages/TermsOfUse/TermsOfUse'))
const Video = React.lazy(() => import('../pages/LandingPages/Video/Video'))
const CareWeDo = React.lazy(() => import('../pages/LandingPages/CareWeDo/CareWeDo'))
const OurWhale = React.lazy(() => import('../pages/LandingPages/OurWhale/OurWhale'))
const Recognition = React.lazy(() => import('../pages/LandingPages/Recognition/Recognition'))
const Contact = React.lazy(() => import('../pages/LandingPages/Contact/Contact'))
const GetAudit = React.lazy(() => import('../pages/LandingPages/GetAudit/GetAudit'))
const GetAuditNew = React.lazy(() => import('../pages/LandingPages/GetAuditNew/GetAudit'))
const IdentifyOption = React.lazy(() => import('../pages/LandingPages/IdentifyOption/IdentifyOption'))
const EnlightenFuture = React.lazy(() => import('../pages/LandingPages/EnlightenFuture/EnlightenFuture'))
const RedefineApproach = React.lazy(() => import('../pages/LandingPages/RedefineApproach/RedefineApproach'))
const CustomerSatisfactionSurvey = React.lazy(() => import('../pages/LandingPages/CustomerSatisfactionSurvey/CustomerSatisfactionSurvey'))
const MainPage = React.lazy(() => import('../pages/LandingPages/MainPage/MainPage'))
const Course = React.lazy(() => import('../pages/LandingPages/Course/Course'))

const AuthorizedUser = React.lazy(() => import('../pages'))
const NotFound = React.lazy(() => import('../pages/LandingPages/NotFound/NotFound'))

const LoginPage = React.lazy(() => import('../pages/authentication/LoginPage/LoginPage'))
const RegistrationPage = React.lazy(() => import('../pages/authentication/RegistrationPage/RegistrationPage'))
const AgencyRegistrationPage = React.lazy(() => import('../pages/authentication/AgencyRegistration/AgencyRegistration'))
const AuditRegistration = React.lazy(() => import('../pages/authentication/AuditRegistration/AuditRegistration'))
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
                    {/*-----------------------------------------------------------*/}

                    <Route exact path={'/404'} component={NotFound}/>

                    <Route path={'/'} render={(props) => {
                        if (localStorage.getItem('token')) {
                            return <AuthorizedUser {...history}/>
                        } else {
                            return <Redirect
                                to={`/login?redirect=${history.location.pathname + history.location.search}`}/>
                        }
                    }
                    }/>
                </Switch>
            </Router>
        </Suspense>
    )
}

export default React.memo(routers)
