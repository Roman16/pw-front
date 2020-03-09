import React, {Suspense} from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {history} from '../utils/history';
import {useSelector} from 'react-redux';


import AuthorizedUser from "../pages";
import Optimization from "../pages/PPCAutomate/Optimization/Optimization";
import Report from "../pages/PPCAutomate/Report/Report";
import ProductSettings from "../pages/PPCAutomate/ProductSettings/ProductSettings";
import MWS from "../pages/authentication/AccountBinding/MWS/MWS";
import PPC from "../pages/authentication/AccountBinding/PPC/PPC";
import Dashboard from "../pages/PPCAutomate/Dashboard/Dashboard";
import Information from "../pages/Account/Information/Information";
import Billing from "../pages/Account/Billing/Billing";
import Subscription from "../pages/Account/Subscription/Subscription";
import LoginWithAmazon from "../pages/authentication/LoginWitdhAmazon/LoginWithAmazon";
import Home from "../pages/Home/Home";
import Scanner from "../pages/PPCAutomate/Scanner/Scanner";
import Dayparting from "../pages/PPCAutomate/Dayparting/Dayparting";


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
const NotFound = React.lazy(() => import('../pages/LandingPages/NotFound/NotFound'));


const LoginPage = React.lazy(() => import('../pages/authentication/LoginPage/LoginPage'));
const RegistrationPage = React.lazy(() => import('../pages/authentication/RegistrationPage/RegistrationPage'));
const ResetPassword = React.lazy(() => import('../pages/authentication/ResetPassword/ResetPassword'));

// import LandingAutomation from "../pages/LandingPages/Automation/LandingAutomation";
// import LandingAffiliates from "../pages/LandingPages/Affiliates/LandingAffiliates";
// import Ebook from "../pages/LandingPages/Ebook/Ebook";
// import ThankYou from "../pages/LandingPages/Ebook/ThankYou";
// import AboutUs from "../pages/LandingPages/AboutUs/AboutUs";
// import Pricing from "../pages/LandingPages/Pricing/Pricing";
// import PPCScanner from "../pages/LandingPages/PPCScanner/PPCScanner";
// import DemoCall from "../pages/LandingPages/DemoCall/DemoCall";
// import ContactUs from "../pages/LandingPages/ContactUs/ContactUs";
// import PrivacyPolicy from "../pages/LandingPages/PrivacyPolicy/PrivacyPolicy";
// import TermsOfUse from "../pages/LandingPages/TermsOfUse/TermsOfUse";
// import NotFound from "../pages/LandingPages/NotFound/NotFound";

// import LoginPage from "../pages/authentication/LoginPage/LoginPage";
// import RegistrationPage from "../pages/authentication/RegistrationPage/RegistrationPage";
// import ResetPassword from "../pages/authentication/ResetPassword/ResetPassword";


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem('token') ? (
                <AuthorizedUser>
                    <Component {...props} />
                </AuthorizedUser>
            ) : (
                <Redirect to="/login"/>
            )
        }
    />
);

const ConnectedAmazonRoute = props => {
    const {mwsConnected, ppcConnected} = useSelector(state => ({
        mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
        ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false
    }));

    if (!mwsConnected) {
        return <Redirect to="/mws"/>;
    } else if (!ppcConnected) {
        return <Redirect to="/ppc"/>;
    } else {
        return <PrivateRoute {...props} />;
    }
};

const developer = process.env.REACT_APP_ENV === "developer";

const routers = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/login/amazon/rcallback" component={LoginWithAmazon}/>

                <ConnectedAmazonRoute
                    exact
                    path="/ppc/dashboard"
                    component={Dashboard}
                />

                <ConnectedAmazonRoute
                    exact
                    path="/ppc/optimization"
                    component={Optimization}
                />

                <ConnectedAmazonRoute
                    path="/ppc/report"
                    component={Report}
                />

                <ConnectedAmazonRoute
                    exact
                    path="/ppc/product-settings"
                    component={ProductSettings}
                />

                <ConnectedAmazonRoute
                    exact
                    path="/ppc/scanner"
                    component={Scanner}
                />

                {developer && <ConnectedAmazonRoute
                    exact
                    path="/ppc/dayparting"
                    component={Dayparting}
                />}

                <PrivateRoute exact path="/mws" component={MWS}/>
                <PrivateRoute exact path="/ppc" component={PPC}/>

                {developer && <PrivateRoute exact path="/home" component={Home}/>}

                {/* ACCOUNT */}
                <PrivateRoute exact path="/account-settings" component={Information}/>
                <PrivateRoute exact path="/account-billing" component={Billing}/>
                <PrivateRoute exact path="/account-subscription" component={Subscription}/>
                {/*---------------*/}

                <Suspense fallback={<div/>}>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/registration" component={RegistrationPage}/>
                    <Route exact path="/reset-password" component={ResetPassword}/>

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
                </Suspense>

                <Route component={NotFound}/>
            </Switch>
        </Router>
    );
};

export default routers;
