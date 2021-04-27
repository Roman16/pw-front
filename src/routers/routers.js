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
const NotFound = React.lazy(() => import('../pages/LandingPages/NotFound/NotFound'))
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

const LoginPage = React.lazy(() => import('../pages/authentication/LoginPage/LoginPage'))
const RegistrationPage = React.lazy(() => import('../pages/authentication/RegistrationPage/RegistrationPage'))
const AuditRegistration = React.lazy(() => import('../pages/authentication/AuditRegistration/AuditRegistration'))
const ConfirmEmailPage = React.lazy(() => import('../pages/authentication/RegistrationPage/ConfirmEmailPage/ConfirmEmailPage'))
const ResetPassword = React.lazy(() => import('../pages/authentication/ResetPassword/ResetPassword'))
const LoginWithAmazon = React.lazy(() => import('../pages/authentication/LoginWithAmazon/LoginWithAmazon'))
const ThankPage = React.lazy(() => import('../pages/authentication/AccountBinding/ThankPage/ThankPage'))

const developer = process.env.REACT_APP_ENV === "developer"


const routers = () => {
    return (
        <Suspense fallback={<RouteLoader/>}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route exact path="/affiliates" component={LandingAffiliates}/>
                    <Route exact path="/about-us" component={AboutUs}/>
                    {/*<Route exact path="/scanner" component={PPCScanner}/>*/}
                    {/*<Route exact path="/pricing" component={Pricing}/>*/}
                    <Route exact path="/amazon-ppc-blueprint" component={Ebook}/>
                    <Route exact path="/thank-you" component={ThankYou}/>
                    {/*<Route exact path="/demo-call" component={DemoCall}/>*/}
                    <Route exact path="/contact-us/:status?" component={Contact}/>
                    {/*<Route exact path="/help-support" component={HelpSupport}/>*/}
                    <Route exact path="/partners" component={Partners}/>
                    <Route exact path="/audit" component={Audit}/>
                    <Route exact path="/book-a-demo" component={BookDemo}/>
                    <Route exact path="/policy" component={PrivacyPolicy}/>
                    <Route exact path="/terms-and-conditions" component={TermsOfUse}/>
                    <Route exact path="/videos/:block?" component={Video}/>
                    <Route exact path="/ppc-redirect" component={PPCRedirect}/>
                    <Route exact path="/zero-to-hero-info" component={LandingZTH}/>
                    <Route exact path="/care-we-do" component={CareWeDo}/>
                    <Route exact path="/our-whale" component={OurWhale}/>
                    <Route exact path="/recognition" component={Recognition}/>
                    <Route exact path="/get-audit" component={GetAuditNew}/>
                    <Route exact path="/get-audit-new" component={GetAudit}/>
                    <Route exact path="/identify-option/:filter?" component={IdentifyOption}/>
                    <Route exact path="/enlighten-future" component={EnlightenFuture}/>
                    <Route exact path="/redefine-approach" component={RedefineApproach}/>
                    <Route exact path="/customer-satisfaction-survey" component={CustomerSatisfactionSurvey}/>
                    <Route exact path="/course" component={Course}/>
                    {/*-----------------------------------------------------------*/}
                    <Route exact path="/login/:status?" component={LoginPage}/>
                    {/*<Route exact path="/registration/:tag" component={RegistrationPage}/>*/}
                    <Route exact path="/registration/:tag?" render={(props) => {
                        if (props.match.params.tag && props.match.params.tag === 'from-agency') {
                            return (<RegistrationPage {...props}/>)
                        } else {
                            return (<AuditRegistration/>)
                        }
                    }}/>
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
                            return <Redirect to={`/login?redirect=${props.location.pathname}`}/>
                        }
                    }
                    }/>
                </Switch>
            </Router>
        </Suspense>
    )
}

export default React.memo(routers)
