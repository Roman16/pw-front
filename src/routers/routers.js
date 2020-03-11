import React, {Suspense } from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {history} from '../utils/history';
import RouteLoader from "../components/RouteLoader/RouteLoader";
//

import LandingAutomation from '../pages/LandingPages/Automation/LandingAutomation';
import LandingAffiliates from '../pages/LandingPages/Affiliates/LandingAffiliates';
import Ebook from '../pages/LandingPages/Ebook/Ebook';
import ThankYou from '../pages/LandingPages/Ebook/ThankYou';
import AboutUs from '../pages/LandingPages/AboutUs/AboutUs';
import Pricing from '../pages/LandingPages/Pricing/Pricing';
import PPCScanner from '../pages/LandingPages/PPCScanner/PPCScanner';
import DemoCall from '../pages/LandingPages/DemoCall/DemoCall';
import ContactUs from '../pages/LandingPages/ContactUs/ContactUs';
import PrivacyPolicy from '../pages/LandingPages/PrivacyPolicy/PrivacyPolicy';
import TermsOfUse from '../pages/LandingPages/TermsOfUse/TermsOfUse';
import NotFound from '../pages/LandingPages/NotFound/NotFound';

import AuthorizedUser from '../pages';

import LoginPage from '../pages/authentication/LoginPage/LoginPage';
import RegistrationPage from '../pages/authentication/RegistrationPage/RegistrationPage';
import ResetPassword from '../pages/authentication/ResetPassword/ResetPassword';
import LoginWithAmazon from '../pages/authentication/LoginWithAmazon/LoginWithAmazon';

// const LandingAutomation = React.lazy(() => import('../pages/LandingPages/Automation/LandingAutomation'));
// const LandingAffiliates = React.lazy(() => import('../pages/LandingPages/Affiliates/LandingAffiliates'));
// const Ebook = React.lazy(() => import('../pages/LandingPages/Ebook/Ebook'));
// const ThankYou = React.lazy(() => import('../pages/LandingPages/Ebook/ThankYou'));
// const AboutUs = React.lazy(() => import('../pages/LandingPages/AboutUs/AboutUs'));
// const Pricing = React.lazy(() => import('../pages/LandingPages/Pricing/Pricing'));
// const PPCScanner = React.lazy(() => import('../pages/LandingPages/PPCScanner/PPCScanner'));
// const DemoCall = React.lazy(() => import('../pages/LandingPages/DemoCall/DemoCall'));
// const ContactUs = React.lazy(() => import('../pages/LandingPages/ContactUs/ContactUs'));
// const PrivacyPolicy = React.lazy(() => import('../pages/LandingPages/PrivacyPolicy/PrivacyPolicy'));
// const TermsOfUse = React.lazy(() => import('../pages/LandingPages/TermsOfUse/TermsOfUse'));
// const NotFound = React.lazy(() => import('../pages/LandingPages/NotFound/NotFound'));
//
// const AuthorizedUser = React.lazy(() => import('../pages'));
//
// const LoginPage = React.lazy(() => import('../pages/authentication/LoginPage/LoginPage'));
// const RegistrationPage = React.lazy(() => import('../pages/authentication/RegistrationPage/RegistrationPage'));
// const ResetPassword = React.lazy(() => import('../pages/authentication/ResetPassword/ResetPassword'));
// const LoginWithAmazon = React.lazy(() => import('../pages/authentication/LoginWithAmazon/LoginWithAmazon'));

const routers = () => {
    return (
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
                <Route exact path="/contact-us" component={ContactUs}/>
                <Route exact path="/policy" component={PrivacyPolicy}/>
                <Route exact path="/terms-and-conditions" component={TermsOfUse}/>
                {/*-----------------------------------------------------------*/}
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/registration" component={RegistrationPage}/>
                <Route exact path="/reset-password" component={ResetPassword}/>
                <Route path="/login/amazon/rcallback" component={LoginWithAmazon}/>
                {/*-----------------------------------------------------------*/}

                <Route path={'/'} render={() =>
                    localStorage.getItem('token') ? (
                        <AuthorizedUser {...history}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>

                <Route component={NotFound}/>
            </Switch>
        </Router>

        // <Suspense fallback={<RouteLoader />}>
        //     <Router history={history}>
        //         <Switch>
        //             <Route exact path="/" component={LandingAutomation}/>
        //             <Route exact path="/affiliates" component={LandingAffiliates}/>
        //             <Route exact path="/about-us" component={AboutUs}/>
        //             <Route exact path="/scanner" component={PPCScanner}/>
        //             <Route exact path="/pricing" component={Pricing}/>
        //             <Route exact path="/amazon-ppc-blueprint" component={Ebook}/>
        //             <Route exact path="/thank-you" component={ThankYou}/>
        //             <Route exact path="/demo-call" component={DemoCall}/>
        //             <Route exact path="/contact-us" component={ContactUs}/>
        //             <Route exact path="/policy" component={PrivacyPolicy}/>
        //             <Route exact path="/terms-and-conditions" component={TermsOfUse}/>
        //             {/*-----------------------------------------------------------*/}
        //             <Route exact path="/login" component={LoginPage}/>
        //             <Route exact path="/registration" component={RegistrationPage}/>
        //             <Route exact path="/reset-password" component={ResetPassword}/>
        //             <Route path="/login/amazon/rcallback" component={LoginWithAmazon}/>
        //             {/*-----------------------------------------------------------*/}
        //
        //             <Route path={'/'} render={() =>
        //                 localStorage.getItem('token') ? (
        //                     <AuthorizedUser {...history}/>
        //                 ) : (
        //                     <Redirect to="/login"/>
        //                 )
        //             }/>
        //
        //             <Route component={NotFound}/>
        //         </Switch>
        //     </Router>
        // </Suspense>

    );
};

export default routers;
