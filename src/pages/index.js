import React, {Fragment, Suspense} from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';

import Sidebar from '../components/Sidebar/Sidebar';
import ProductList from "../components/ProductList/ProductList";
import ReportsChangesCountWindow from "../components/ModalWindow/InformationWindows/ReportsChangesCountWindow";
import {userActions} from "../actions/user.actions";
import moment from "moment";
import {useSelector, useDispatch} from "react-redux";
import LoadingAmazonAccount from "../components/ModalWindow/InformationWindows/LoadingAmazonAccountWindow";
import RouteLoader from "../components/RouteLoader/RouteLoader";

// import Optimization from "./PPCAutomate/Optimization/Optimization";
// import Report from "./PPCAutomate/Report/Report";
// import ProductSettings from "./PPCAutomate/ProductSettings/ProductSettings";
// import MWS from "./authentication/AccountBinding/MWS/MWS";
// import PPC from "./authentication/AccountBinding/PPC/PPC";
// import Dashboard from "./PPCAutomate/Dashboard/Dashboard";
// import Information from "./Account/Information/Information";
// import Billing from "./Account/Billing/Billing";
// import Subscription from "./Account/Subscription/Subscription";
// import Home from "./Home/Home";
// import Scanner from "./PPCAutomate/Scanner/Scanner";
// import Dayparting from "./PPCAutomate/Dayparting/Dayparting";


const Optimization = React.lazy(() => import('./PPCAutomate/Optimization/Optimization'));
const Report = React.lazy(() => import('./PPCAutomate/Report/Report'));
const ProductSettings = React.lazy(() => import('./PPCAutomate/ProductSettings/ProductSettings'));
const MWS = React.lazy(() => import('./authentication/AccountBinding/MWS/MWS'));
const PPC = React.lazy(() => import('./authentication/AccountBinding/PPC/PPC'));
const Dashboard = React.lazy(() => import('./PPCAutomate/Dashboard/Dashboard'));
const Information = React.lazy(() => import('./Account/Information/Information'));
const Billing = React.lazy(() => import('./Account/Billing/Billing'));
const Subscription = React.lazy(() => import('./Account/Subscription/Subscription'));
const Home = React.lazy(() => import('./Home/Home'));
const Scanner = React.lazy(() => import('./PPCAutomate/Scanner/Scanner'));
const Dayparting = React.lazy(() => import('./PPCAutomate/Dayparting/Dayparting'));

let timerId = null;

function throttle(func, delay) {
    let timeout = null;

    return function (...args) {
        if (!timeout) {
            timeout = setTimeout(() => {
                func.call(this, ...args);
                clearTimeout(timeout)
            }, delay)
        }
    }
}

const developer = process.env.REACT_APP_ENV === "developer";


const ConnectedAmazonRoute = props => {
    const {mwsConnected, ppcConnected} = useSelector(state => ({
        mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
        ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false,
    }));

    if (!mwsConnected) {
        return <Redirect to="/mws"/>;
    } else if (!ppcConnected) {
        return <Redirect to="/ppc"/>;
    } else {
        return <Route {...props} />;
    }
};


const AuthorizedUser = (props) => {
    const dispatch = useDispatch();
    const pathname = props.location.pathname;
    const {lastStatusAction, bootstrapInProgress} = useSelector(state => ({
        lastStatusAction: state.user.lastUserStatusAction,
        bootstrapInProgress: state.user.notifications.account_bootstrap ? state.user.notifications.account_bootstrap.bootstrap_in_progress : true
    }));

    function getUserStatus() {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            dispatch(userActions.getPersonalUserInfo());
        }, 1000);
    }

    document.addEventListener("visibilitychange", () => {
        if (moment(new Date()).diff(lastStatusAction, "hours") > 6) {
            getUserStatus()
        }
    });

    document.addEventListener('mousemove', throttle(() => {
            if (moment(new Date()).diff(lastStatusAction, "hours") > 6) {
                getUserStatus()
            }
        }, 1000 * 60)
    );

    return (
        <Fragment>
            <div className="main-pages">
                <Sidebar/>


                {(pathname === '/ppc/optimization' ||
                    pathname === '/ppc/report' ||
                    pathname === '/ppc/scanner' ||
                    pathname === '/ppc/optimization/loading' ||
                    pathname === '/ppc/dayparting'
                ) &&
                <ProductList
                    pathname={props.location.pathname}
                />
                }

                {/*<div className="main-container">*/}
                {/*    <Switch>*/}
                {/*        <ConnectedAmazonRoute*/}
                {/*            exact*/}
                {/*            path="/ppc/optimization"*/}
                {/*            render={() => {*/}
                {/*                if (bootstrapInProgress) {*/}
                {/*                    return (<Redirect to={'/ppc/optimization/loading'}/>)*/}
                {/*                } else {*/}
                {/*                    return (<Optimization/>)*/}
                {/*                }*/}
                {/*            }}*/}
                {/*        />*/}

                {/*        <ConnectedAmazonRoute*/}
                {/*            exact*/}
                {/*            path="/ppc/optimization/loading"*/}
                {/*            render={() => {*/}
                {/*                if (bootstrapInProgress) {*/}
                {/*                    return (<Optimization/>)*/}
                {/*                } else {*/}
                {/*                    return (<Redirect to={'/ppc/optimization'}/>)*/}
                {/*                }*/}
                {/*            }}*/}
                {/*        />*/}

                {/*        <ConnectedAmazonRoute*/}
                {/*            exact*/}
                {/*            path="/ppc/dashboard"*/}
                {/*            component={Dashboard}*/}
                {/*        />*/}

                {/*        <ConnectedAmazonRoute*/}
                {/*            path="/ppc/report"*/}
                {/*            component={Report}*/}
                {/*        />*/}

                {/*        <ConnectedAmazonRoute*/}
                {/*            exact*/}
                {/*            path="/ppc/product-settings"*/}
                {/*            component={ProductSettings}*/}
                {/*        />*/}

                {/*        <ConnectedAmazonRoute*/}
                {/*            exact*/}
                {/*            path="/ppc/scanner"*/}
                {/*            component={Scanner}*/}
                {/*        />*/}

                {/*        <Route exact path="/mws" component={MWS}/>*/}
                {/*        <Route exact path="/ppc" component={PPC}/>*/}

                {/*        {developer && <Route exact path="/home" component={Home}/>}*/}

                {/*        /!* ACCOUNT *!/*/}
                {/*        <Route exact path="/account-settings" component={Information}/>*/}
                {/*        <Route exact path="/account-billing" component={Billing}/>*/}
                {/*        <Route exact path="/account-subscription" component={Subscription}/>*/}

                {/*        <ConnectedAmazonRoute exact path="/ppc/dayparting" component={Dayparting}/>*/}
                {/*    </Switch>*/}
                {/*</div>*/}

                <div className="main-container">
                    <Suspense fallback={<RouteLoader/>}>
                        <Switch>
                            <ConnectedAmazonRoute
                                exact
                                path="/ppc/optimization"
                                render={() => {
                                    if (bootstrapInProgress) {
                                        return (<Redirect to={'/ppc/optimization/loading'}/>)
                                    } else {
                                        return (<Optimization/>)
                                    }
                                }}
                            />

                            <ConnectedAmazonRoute
                                exact
                                path="/ppc/optimization/loading"
                                render={() => {
                                    if (bootstrapInProgress) {
                                        return (<Optimization/>)
                                    } else {
                                        return (<Redirect to={'/ppc/optimization'}/>)
                                    }
                                }}
                            />

                            <ConnectedAmazonRoute
                                exact
                                path="/ppc/dashboard"
                                component={Dashboard}
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

                            <Route exact path="/mws" component={MWS}/>
                            <Route exact path="/ppc" component={PPC}/>

                            {developer && <Route exact path="/home" component={Home}/>}

                            {/* ACCOUNT */}
                            <Route exact path="/account-settings" component={Information}/>
                            <Route exact path="/account-billing" component={Billing}/>
                            <Route exact path="/account-subscription" component={Subscription}/>

                            <ConnectedAmazonRoute exact path="/ppc/dayparting" component={Dayparting}/>
                        </Switch>
                    </Suspense>
                </div>
            </div>

            <ReportsChangesCountWindow/>

            {/*<LoadingAmazonAccount/>*/}
        </Fragment>
    );
};

export default AuthorizedUser;
