import React, {Fragment, Suspense, useEffect, useState} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Sidebar from '../components/Sidebar/Sidebar';
import ProductList from "../components/ProductList/ProductList";
import {userActions} from "../actions/user.actions";
import moment from "moment";
import {useSelector, useDispatch} from "react-redux";
import RouteLoader from "../components/RouteLoader/RouteLoader";
import ErrorBar from "../components/ErrorBar/ErrorBar";
import WelcomePage from "./authentication/AccountBinding/WelcomePage/WelcomePage";
import CampaignList from "../components/CampaignList/CampaignList";
import {userService} from "../services/user.services";
import PWWindows from "../components/ModalWindow/PWWindows";


const ThankPage = React.lazy(() => import('./ZeroToHero/ThankPage/ThankPage'));
const Payment = React.lazy(() => import('./ZeroToHero/Payment/Payment'));
const ChooseCampaign = React.lazy(() => import('./ZeroToHero/ChooseCampaign/ChooseCampaign'));
const Marketing = React.lazy(() => import('./ZeroToHero/Marketing/Marketing'));
const CreatingCampaign = React.lazy(() => import('./ZeroToHero/CreatingCampaign/CreatingCampaign'));
const Settings = React.lazy(() => import('./ZeroToHero/Settings/Settings'));
const Optimization = React.lazy(() => import('./PPCAutomate/Optimization/Optimization'));
const Report = React.lazy(() => import('./PPCAutomate/Report/Report'));
const ProductSettings = React.lazy(() => import('./PPCAutomate/ProductSettings/ProductSettings'));
const Dashboard = React.lazy(() => import('./PPCAutomate/Dashboard/Dashboard'));

const Account = React.lazy(() => import('./Account/Navigation/Navigation'));

const Information = React.lazy(() => import('./Account/Information/Information'));
const ApiConnection = React.lazy(() => import('./Account/ApiConnection/ApiConnection'));
const Subscription = React.lazy(() => import('./Account/Subscription/Subscription'));
const Home = React.lazy(() => import('./Home/Home'));
const Scanner = React.lazy(() => import('./PPCAutomate/Scanner/Scanner'));
const Dayparting = React.lazy(() => import('./PPCAutomate/Dayparting/Dayparting'));
const AdminPanel = React.lazy(() => import('./AdminPanel/AdminPanel'));
const FullJourney = React.lazy(() => import('./authentication/AccountBinding/FullJourney/FullJourney'));
const ConnectMWS = React.lazy(() => import('./authentication/AccountBinding/ConnectMWSJourney/ConnectMWSJourney'));
const ConnectPPC = React.lazy(() => import('./authentication/AccountBinding/ConnectPPCJourney/ConnectPPCJourney'));


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


const AdminRoute = (props) => {
    const {userId} = useSelector(state => ({
        userId: state.user.user.id,
    }));

    if ((!developer && userId === 714) || (developer)) {
        return <Route {...props} />
    } else {
        return <Redirect to={'/404'}/>
    }
};

const ConnectedAmazonRoute = props => {
    const {mwsConnected, ppcConnected} = useSelector(state => ({
        mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
        ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false,
    }));
    if (!mwsConnected && !ppcConnected) {
        return <Redirect to="/connect-amazon-account"/>;
    } else if (!mwsConnected && ppcConnected) {
        return <Redirect to="/connect-mws-account"/>;
    } else if (!ppcConnected && mwsConnected) {
        return <Redirect to="/connect-ppc-account"/>;
    } else {
        return <Route {...props} />;
    }
};


const AuthorizedUser = (props) => {
    const dispatch = useDispatch();
    const pathname = props.location.pathname;
    const [loadingUserInformation, setLoadingUserInformation] = useState(true);
    const {lastStatusAction, bootstrapInProgress} = useSelector(state => ({
        lastStatusAction: state.user.lastUserStatusAction,
        bootstrapInProgress: state.user.notifications && state.user.notifications.account_bootstrap ? state.user.notifications.account_bootstrap.bootstrap_in_progress : true
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

    useEffect(() => {
        setLoadingUserInformation(true);

        userService.getUserInfo()
            .then(res => {
                dispatch(userActions.setInformation(res));
                setLoadingUserInformation(false);
            })
    }, [])

    if (loadingUserInformation) {
        return (
            <RouteLoader/>
        )
    } else {
        return (
            <Fragment>
                <div className="main-pages">

                    <Sidebar props={props}/>


                    <div className="main-container">
                        <ErrorBar/>

                        {(pathname === '/ppc/optimization' ||
                            pathname === '/ppc/report' ||
                            pathname === '/ppc/scanner' ||
                            pathname === '/ppc/optimization-loading'
                        ) &&
                        <ProductList
                            pathname={props.location.pathname}
                        />}

                        {pathname === '/ppc/dayparting' && <CampaignList/>}

                        <div className="page">
                            <Suspense fallback={<RouteLoader/>}>
                                <Switch>
                                    <ConnectedAmazonRoute
                                        exact
                                        path="/ppc/optimization"
                                        render={() => {
                                            if (bootstrapInProgress) {
                                                return (<Redirect to={'/ppc/optimization-loading'}/>)
                                            } else {
                                                return (<Optimization/>)
                                            }
                                        }}
                                    />

                                    <ConnectedAmazonRoute
                                        exact
                                        path="/ppc/optimization-loading"
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

                                    {/*<ConnectedAmazonRoute*/}
                                    {/*    exact*/}
                                    {/*    path="/ppc/scanner"*/}
                                    {/*    component={Scanner}*/}
                                    {/*/>*/}

                                    <Route exact path="/connect-amazon-account" component={FullJourney}/>
                                    <Route exact path="/connect-mws-account" component={ConnectMWS}/>
                                    <Route exact path="/connect-ppc-account" component={ConnectPPC}/>
                                    <Route exact path="/welcome" component={WelcomePage}/>

                                    {developer && <Route exact path="/home" component={Home}/>}

                                    {/* ACCOUNT */}
                                    <Route path="/account" component={Account}/>


                                    <ConnectedAmazonRoute exact path="/ppc/dayparting" component={Dayparting}/>

                                    {/*-------------------------------------------*/}
                                    <AdminRoute exact path="/admin-panel" component={AdminPanel}/>
                                    {/*-------------------------------------------*/}

                                    {/*ZERO TO HERO*/}
                                    <ConnectedAmazonRoute exact path="/zero-to-hero/campaign"
                                                          component={ChooseCampaign}/>

                                    <ConnectedAmazonRoute exact path="/zero-to-hero/ppc-structure"
                                                          component={Marketing}/>

                                    <ConnectedAmazonRoute exact path="/zero-to-hero/creating"
                                                          component={CreatingCampaign}/>

                                    <ConnectedAmazonRoute exact path="/zero-to-hero/payment/:batchId?"
                                                          component={Payment}/>

                                    <ConnectedAmazonRoute exact path="/zero-to-hero/success" component={ThankPage}/>

                                    <ConnectedAmazonRoute exact path="/zero-to-hero/settings" component={Settings}/>

                                    <Route path={'*'} render={() => (
                                        <Redirect to={'/404'}/>
                                    )}/>
                                </Switch>
                            </Suspense>
                        </div>
                    </div>
                </div>

                <PWWindows pathname={pathname}/>
            </Fragment>
        );
    }
};

export default AuthorizedUser;
