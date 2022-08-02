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
import {history} from "../utils/history"

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
const PPCAudit = React.lazy(() => import('./PPCAudit/PPCAudit'))


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

const developer = (process.env.REACT_APP_ENV === "developer" || process.env.REACT_APP_ENV === "demo")

export const activeTimezone = JSON.parse(localStorage.getItem('activeMarketplace'))?.timezone || 'America/Los_Angeles'

const AdminRoute = (props) => {
    const {userId} = useSelector(state => ({
            userId: state.user.userDetails.id,
        })),
        isSuperAdmin = !!localStorage.getItem('adminToken')


    if ((!developer && userId === 714) || developer || isSuperAdmin) {
        return <Route {...props} />
    } else {
        return <Redirect to={'/404'}/>
    }
}

const ConnectedAmazonRoute = props => {
    const amazonRegionAccounts = useSelector(state => state.user.amazonRegionAccounts),
        activeAmazonRegion = useSelector(state => state.user.activeAmazonRegion)

    if (amazonRegionAccounts.length === 0) {
        return <Redirect to="/connect-amazon-account"/>
    } else if (activeAmazonRegion && !activeAmazonRegion?.is_mws_attached) {
        return <Redirect to={`/connect-mws-account/${activeAmazonRegion.region_type}`}/>
    } else if (activeAmazonRegion && !activeAmazonRegion?.is_amazon_ads_api_attached) {
        return <Redirect to={`/connect-ppc-account/${activeAmazonRegion.id}`}/>
    } else {
        return <Route {...props} />
    }
}


const AuthorizedUser = (props) => {
    const dispatch = useDispatch()
    const pathname = props.location.pathname
    const [loadingUserInformation, setLoadingUserInformation] = useState(false)
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)

    const {user, lastStatusAction, fetchingAmazonRegionAccounts} = useSelector(state => ({
            user: state.user,
            lastStatusAction: state.user.lastUserStatusAction,
            fetchingAmazonRegionAccounts: state.user.fetchingAmazonRegionAccounts,
        })),
        activeAmazonRegion = useSelector(state => state.user.activeAmazonRegion),
        activeAmazonMarketplace = useSelector(state => state.user.activeAmazonMarketplace),
        amazonRegionAccounts = useSelector(state => state.user.amazonRegionAccounts)


    document.addEventListener("visibilitychange", () => {
        if (moment(new Date()).diff(lastStatusAction, "hours") > 6) {
            // getUserStatus()
        }
    })

    document.addEventListener('mousemove', throttle(() => {
            if (moment(new Date()).diff(lastStatusAction, "hours") > 6) {
                // getUserStatus()
            }
        }, 1000 * 60)
    )

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push(`/login?redirect=${history.location.pathname + history.location.search}`)
            return
        }

        dispatch(userActions.getUserInfo())


        userService.getAmazonRegionAccounts()
            .then(({result}) => {
                dispatch(userActions.setAmazonRegionAccounts(result))

                if (result.length > 0 && activeAmazonMarketplace) {
                    userService.checkImportStatus(activeAmazonMarketplace.id)
                        .then(({result}) => dispatch(userActions.setInformation({importStatus: result})))

                } else if (result.length > 0 && !activeAmazonMarketplace) {
                    userService.checkImportStatus(result[0].amazon_region_account_marketplaces[0].id)
                        .then(({result}) => dispatch(userActions.setInformation({importStatus: result})))

                    dispatch(userActions.setActiveRegion({
                        region: result[0],
                        marketplace: result[0].amazon_region_account_marketplaces[0]
                    }))
                } else if (result.length === 0) {
                    dispatch(userActions.setActiveRegion({
                        region: null,
                        marketplace: null
                    }))
                }
            })
            .then(() => {
                setLoadingUserInformation(false)
            })
    }, [])

    // useEffect(() => {
    //     activeAmazonMarketplace && dispatch(userActions.getNotifications())
    // }, [activeAmazonMarketplace])

    useEffect(() => {
        activeAmazonRegion && dispatch(userActions.getAccountStatus(activeAmazonRegion.id))
    }, [activeAmazonRegion])

    useEffect(() => {
        amazonRegionAccounts.length > 0 && dispatch(userActions.actualizeActiveRegion())
    }, [amazonRegionAccounts])

    useEffect(() => {
        if (user.userDetails.id === 714) {
            setIsSuperAdmin(true)
        } else {
            setIsSuperAdmin(false)
        }
    }, [user])

    let isAgencyUser = user.userDetails.is_agency_client

    if (loadingUserInformation || fetchingAmazonRegionAccounts) {
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

                        <div className="page">
                            <Suspense fallback={<RouteLoader/>}>
                                <Switch>
                                    {/*ANALYTICS*/}
                                    <ConnectedAmazonRoute path="/analytics" component={Analytics}/>
                                    {/*-------------------------------------------*/}
                                    {/*tableau*/}
                                    {(isSuperAdmin || isAgencyUser) &&
                                    <ConnectedAmazonRoute path="/tableau" component={Tableau}/>}
                                    {/*-------------------------------------------*/}

                                    {/*ppc scanner*/}
                                    <ConnectedAmazonRoute path="/ppc-audit" component={PPCAudit}/>
                                    {/*-------------------------------------------*/}
                                    <ConnectedAmazonRoute
                                        exact
                                        path="/ppc/automation"
                                        render={() => {
                                            return (<OptimizationFormAdmin/>)
                                        }}
                                    />

                                    <ConnectedAmazonRoute
                                        exact
                                        path="/ppc/optimization-loading"
                                        render={() => {
                                            return (<Redirect to={'/ppc/optimization'}/>)
                                        }}
                                    />

                                    <ConnectedAmazonRoute
                                        path="/ppc/report"
                                        component={Report}
                                    />
                                    <ConnectedAmazonRoute
                                        exact
                                        path="/ppc/product-settings"
                                        component={ProductsInfo}
                                    />

                                    <ConnectedAmazonRoute
                                        exact
                                        path="/ppc/dayparting"
                                        component={Dayparting}
                                    />

                                    {/*-------------------------------------------*/}
                                    <AdminRoute path="/admin-panel" component={AdminPanel}/>
                                    {/*-------------------------------------------*/}

                                    <Route exact path="/connect-amazon-account" component={FullJourney}/>
                                    <Route exact path="/connect-mws-account/:regionType?" component={ConnectMWS}/>
                                    <Route exact path="/connect-ppc-account/:regionId?" component={ConnectPPC}/>
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
                                    <ConnectedAmazonRoute exact path="/home" component={Home}/>
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
