import React, {Suspense} from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {history} from '../utils/history';
import RouteLoader from "../components/RouteLoader/RouteLoader";

const LandingAutomation = React.lazy(() => import('../pages/LandingPages/Automation/LandingAutomation'));
const LandingAffiliates = React.lazy(() => import('../pages/LandingPages/Affiliates/LandingAffiliates'));
const Ebook = React.lazy(() => import('../pages/LandingPages/Ebook/Ebook'));
const ThankYou = React.lazy(() => import('../pages/LandingPages/Ebook/ThankYou'));
const AboutUs = React.lazy(() => import('../pages/LandingPages/AboutUs/AboutUs'));
const Pricing = React.lazy(() => import('../pages/LandingPages/Pricing/Pricing'));
const PPCScanner = React.lazy(() => import('../pages/LandingPages/PPCScanner/PPCScanner'));
const DemoCall = React.lazy(() => import('../pages/LandingPages/DemoCall/DemoCall'));
const ContactUs = React.lazy(() => import('../pages/LandingPages/ContactUs/ContactUs'));
const PrivacyPolicy = React.lazy(() => import('../pages/LandingPages/PrivacyPolicy/PrivacyPolicy'));
const TermsOfUse = React.lazy(() => import('../pages/LandingPages/TermsOfUse/TermsOfUse'));
const Video = React.lazy(() => import('../pages/LandingPages/Video/Video'));
const NotFound = React.lazy(() => import('../pages/LandingPages/NotFound/NotFound'));

const AuthorizedUser = React.lazy(() => import('../pages'));

const LoginPage = React.lazy(() => import('../pages/authentication/LoginPage/LoginPage'));
const RegistrationPage = React.lazy(() => import('../pages/authentication/RegistrationPage/RegistrationPage'));
const ConfirmEmailPage = React.lazy(() => import('../pages/authentication/RegistrationPage/ConfirmEmailPage/ConfirmEmailPage'));
const ResetPassword = React.lazy(() => import('../pages/authentication/ResetPassword/ResetPassword'));
const LoginWithAmazon = React.lazy(() => import('../pages/authentication/LoginWithAmazon/LoginWithAmazon'));

const routers = () => {
    return (
        <Suspense fallback={<RouteLoader/>}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={LandingAutomation}/>
                    <Route exact path="/affiliates" component={LandingAffiliates}/>
                    <Route exact path="/about-us" component={AboutUs}/>
                    <Route exact path="/scanner" component={PPCScanner}/>
                    <Route exact path="/pricing" component={Pricing}/>
                    <Route exact path="/amazon-ppc-blueprint" component={Ebook}/>
                    <Route exact path="/thank-you" component={ThankYou}/>
                    <Route exact path="/demo-call" component={DemoCall}/>
                    <Route exact path="/contact-us/:status?" component={ContactUs}/>
                    <Route exact path="/policy" component={PrivacyPolicy}/>
                    <Route exact path="/terms-and-conditions" component={TermsOfUse}/>
                    <Route exact path="/videos" component={Video}/>
                    {/*-----------------------------------------------------------*/}
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/registration" component={RegistrationPage}/>
                    <Route exact path="/confirm-email/:token?" component={ConfirmEmailPage}/>
                    <Route exact path="/reset-password/:userId?/:token?" component={ResetPassword}/>
                    <Route path="/login/amazon/rcallback" component={LoginWithAmazon}/>
                    {/*-----------------------------------------------------------*/}

                    <Route exact path={'/404'} component={NotFound}/>

                    <Route path={'/'} render={() =>
                        localStorage.getItem('token') ? (
                            <AuthorizedUser {...history}/>
                        ) : (
                            <Redirect to="/login"/>
                        )
                    }/>
                </Switch>
            </Router>
        </Suspense>
    );
};

export default React.memo(routers);
