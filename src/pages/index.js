import React, {Fragment, Suspense, useEffect, useState} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Sidebar from '../components/Sidebar/Sidebar'
import ProductList from "../components/ProductList/ProductList"
import {userActions} from "../actions/user.actions"
import moment from "moment"
import {useSelector, useDispatch} from "react-redux"
import RouteLoader from "../components/RouteLoader/RouteLoader"
import ErrorBar from "../components/ErrorBar/ErrorBar"
import WelcomePage from "./authentication/AccountBinding/WelcomePage/WelcomePage"
import CampaignList from "../components/CampaignList/CampaignList"
import {userService} from "../services/user.services"
import PWWindows from "../components/ModalWindow/PWWindows"
import {marketplaceIdValues} from "../constans/amazonMarketplaceIdValues"

const Payment = React.lazy(() => import('./ZeroToHero/Payment/Payment'))
const ChooseCampaign = React.lazy(() => import('./ZeroToHero/ChooseCampaign/ChooseCampaign'))
const Marketing = React.lazy(() => import('./ZeroToHero/Marketing/Marketing'))
const CreatingCampaign = React.lazy(() => import('./ZeroToHero/CreatingCampaign/CreatingCampaign'))
const Settings = React.lazy(() => import('./ZeroToHero/Settings/Settings'))
const OptimizationFormAdmin = React.lazy(() => import('./PPCAutomate/OptimizationForAdmin/OptimizationForAdmin'))
const Report = React.lazy(() => import('./PPCAutomate/Report/Report'))

const Analytics = React.lazy(() => import('./Analytics'))

const Account = React.lazy(() => import('./Account/Navigation/Navigation'))

const Home = React.lazy(() => import('./Home/Home'))
const Dayparting = React.lazy(() => import('./PPCAutomate/Dayparting/Dayparting'))
const AdminPanel = React.lazy(() => import('./AdminPanel/AdminPanel'))
const FullJourney = React.lazy(() => import('./authentication/AccountBinding/FullJourney/FullJourney'))
const ConnectMWS = React.lazy(() => import('./authentication/AccountBinding/ConnectMWSJourney/ConnectMWSJourney'))
const ConnectPPC = React.lazy(() => import('./authentication/AccountBinding/ConnectPPCJourney/ConnectPPCJourney'))
const Tableau = React.lazy(() => import('./Tableau/Tableau'))
const ProductsInfo = React.lazy(() => import('./PPCAutomate/ProductsInfo/ProductsInfo'))


let timerId = null


function throttle(func, delay) {
    let timeout = null

    return function (...args) {
        if (!timeout) {
            timeout = setTimeout(() => {
                func.call(this, ...args)
                clearTimeout(timeout)
            }, delay)
        }
    }
}

const developer = process.env.REACT_APP_ENV === "developer"

const AdminRoute = (props) => {
    const {userId} = useSelector(state => ({
            userId: state.user.user.id,
        })),
        isSuperAdmin = !!localStorage.getItem('adminToken')


    if ((!developer && userId === 714) || developer || isSuperAdmin) {
        return <Route {...props} />
    } else {
        return <Redirect to={'/404'}/>
    }
}

const ConnectedAmazonRoute = props => {
    const {mwsConnected, ppcConnected, marketplace} = useSelector(state => ({
        mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
        ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false,
        marketplace: marketplaceIdValues['ATVPDKIKX0DER']
        // marketplace: marketplaceIdValues[state.user.default_accounts.amazon_ppc.marketplace_id]
    }))
    if (!mwsConnected && !ppcConnected) {
        return <Redirect to="/connect-amazon-account"/>
    } else if (!mwsConnected && ppcConnected) {
        return <Redirect to="/connect-mws-account"/>
    } else if (!ppcConnected && mwsConnected) {
        return <Redirect to="/connect-ppc-account"/>
    } else {
        if (marketplace.countryCode === 'CA') {
            if (props.path === '/ppc/product-settings' || props.path === '/account') {
                return <Route {...props} />
            } else {
                return <Redirect to="/account/settings"/>
            }
        } else {
            return <Route {...props} />
        }
    }
}


const AuthorizedUser = (props) => {
    const dispatch = useDispatch()
    const pathname = props.location.pathname
    const [loadingUserInformation, setLoadingUserInformation] = useState(true)
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)

    const {user, lastStatusAction} = useSelector(state => ({
        user: state.user,
        lastStatusAction: state.user.lastUserStatusAction,
    }))


    function getUserStatus() {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            dispatch(userActions.getPersonalUserInfo())
        }, 1000)
    }

    document.addEventListener("visibilitychange", () => {
        if (moment(new Date()).diff(lastStatusAction, "hours") > 6) {
            getUserStatus()
        }
    })

    document.addEventListener('mousemove', throttle(() => {
            if (moment(new Date()).diff(lastStatusAction, "hours") > 6) {
                getUserStatus()
            }
        }, 1000 * 60)
    )

    useEffect(() => {
        setLoadingUserInformation(true)

        userService.getUserInfo()
            .then(res => {
                dispatch(userActions.setInformation(res))
                setLoadingUserInformation(false)
            })
    }, [])

    useEffect(() => {
        if (user.user.id === 714) {
            setIsSuperAdmin(true)
        } else {
            setIsSuperAdmin(false)
        }
    }, [user])

    let isAgencyUser = user.user.is_agency_client


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

                        {(pathname === '/ppc/automation' ||
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
                                    {/*ANALYTICS*/}
                                    {(isSuperAdmin || isAgencyUser) &&
                                    <ConnectedAmazonRoute path="/analytics" component={Analytics}/>}
                                    {/*-------------------------------------------*/}
                                    {/*tableau*/}
                                    {(isSuperAdmin || isAgencyUser) &&
                                    <ConnectedAmazonRoute path="/tableau" component={Tableau}/>}
                                    {/*-------------------------------------------*/}
                                    {(isSuperAdmin || isAgencyUser) && <ConnectedAmazonRoute
                                        exact
                                        path="/ppc/automation"
                                        render={() => {
                                            return (<OptimizationFormAdmin/>)
                                        }}
                                    />}
                                    {(isSuperAdmin || isAgencyUser) && <ConnectedAmazonRoute
                                        exact
                                        path="/ppc/optimization-loading"
                                        render={() => {
                                            return (<Redirect to={'/ppc/optimization'}/>)
                                        }}
                                    />}
                                    {(isSuperAdmin || isAgencyUser) && <ConnectedAmazonRoute
                                        path="/ppc/report"
                                        component={Report}
                                    />}
                                    {(isSuperAdmin || isAgencyUser) && <ConnectedAmazonRoute
                                        exact
                                        path="/ppc/product-settings"
                                        component={ProductsInfo}
                                    />}
                                    {(isSuperAdmin || isAgencyUser) && <ConnectedAmazonRoute
                                        exact
                                        path="/ppc/dayparting"
                                        component={Dayparting}
                                    />}

                                    {/*-------------------------------------------*/}
                                    <AdminRoute path="/admin-panel" component={AdminPanel}/>
                                    {/*-------------------------------------------*/}

                                    <Route exact path="/connect-amazon-account" component={FullJourney}/>
                                    <Route exact path="/connect-mws-account" component={ConnectMWS}/>
                                    <Route exact path="/connect-ppc-account" component={ConnectPPC}/>
                                    <Route exact path="/welcome" component={WelcomePage}/>


                                    {/* ACCOUNT */}
                                    <Route path="/account" component={Account}/>

                                    {/*ZERO TO HERO*/}
                                    {(!isAgencyUser || isSuperAdmin) && <ConnectedAmazonRoute
                                        exact
                                        path="/zero-to-hero/campaign"
                                        component={ChooseCampaign}
                                    />}

                                    {(!isAgencyUser || isSuperAdmin) && <ConnectedAmazonRoute
                                        exact
                                        path="/zero-to-hero/ppc-structure"
                                        component={Marketing}
                                    />}

                                    {(!isAgencyUser || isSuperAdmin) && <ConnectedAmazonRoute
                                        exact
                                        path="/zero-to-hero/creating"
                                        component={CreatingCampaign}
                                    />}

                                    {(!isAgencyUser || isSuperAdmin) && <ConnectedAmazonRoute
                                        exact
                                        path="/zero-to-hero/payment/:batchId?"
                                        component={Payment}
                                    />}

                                    {/*<ConnectedAmazonRoute exact path="/zero-to-hero/success" component={ThankPage}/>*/}

                                    {(!isAgencyUser || isSuperAdmin) && <ConnectedAmazonRoute
                                        exact
                                        path="/zero-to-hero/settings/:status?"
                                        component={Settings}
                                    />}
                                    {/*-------------------------------------------*/}
                                    <Route exact path="/home" component={Home}/>
                                    {/*-------------------------------------------*/}


                                    <Route path={'*'} render={() => (
                                        <Redirect to={'/404'}/>
                                    )}/>


                                    {/*<ConnectedAmazonRoute exact path="/notifications/listing-tracking"*/}
                                    {/*                      component={ListingTracking}/>*/}
                                    {/*<ConnectedAmazonRoute*/}
                                    {/*    exact*/}
                                    {/*    path="/ppc/dashboard"*/}
                                    {/*    // component={Dashboard}*/}
                                    {/*    render={() => <Redirect to={'/analytics/products'}/>}*/}
                                    {/*/>*/}

                                </Switch>
                            </Suspense>
                        </div>
                    </div>
                </div>
                <PWWindows pathname={pathname}/>
            </Fragment>
        )
    }
}

export default AuthorizedUser
