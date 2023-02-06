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
import CampaignList from "./Dayparting/CampaignList/CampaignList"
import {userService} from "../services/user.services"
import PWWindows from "../components/ModalWindow/PWWindows"
import {marketplaceIdValues} from "../constans/amazonMarketplaceIdValues"
import {history} from "../utils/history"
import {amazonRegionsSort} from "../reducers/user.reducer"
import ProductFruits from 'react-product-fruits'
import {userTypeEnums} from "../constans/userTypeEnums"

const Payment = React.lazy(() => import('./ZeroToHero/Payment/Payment'))
const ChooseCampaign = React.lazy(() => import('./ZeroToHero/ChooseCampaign/ChooseCampaign'))
const Marketing = React.lazy(() => import('./ZeroToHero/Marketing/Marketing'))
const CreatingCampaign = React.lazy(() => import('./ZeroToHero/CreatingCampaign/CreatingCampaign'))
const Settings = React.lazy(() => import('./ZeroToHero/Settings/Settings'))
const ThankPage = React.lazy(() => import('./ZeroToHero/ThankPage/ThankPage'))
const OptimizationFormAdmin = React.lazy(() => import('./PPCAutomate/OptimizationForAdmin/OptimizationForAdmin'))
const Report = React.lazy(() => import('./PPCAutomate/Report/Report'))

const Analytics = React.lazy(() => import('./Analytics'))

const Account = React.lazy(() => import('./Account/Navigation/Navigation'))

const Home = React.lazy(() => import('./Home/Home'))
const Dayparting = React.lazy(() => import('./PPCAutomate/Dayparting/Dayparting'))
const Dayparting2 = React.lazy(() => import('./Dayparting/Dayparting'))
const AdminPanel = React.lazy(() => import('./AdminPanel/AdminPanel'))
const ZTH = React.lazy(() => import('./AdminPanel/ZTH/ZTH'))
const FullJourney = React.lazy(() => import('./authentication/AccountBinding/FullJourney/FullJourney'))
const ConnectSpApiJourney = React.lazy(() => import('./authentication/AccountBinding/ConnectSpApiJourney/ConnectSpApiJourney'))
const ConnectAdsApiJourney = React.lazy(() => import('./authentication/AccountBinding/ConnectAdsApiJourney/ConnectAdsApiJourney'))
const Tableau = React.lazy(() => import('./Tableau/Tableau'))
const ProductsInfo = React.lazy(() => import('./PPCAutomate/ProductsInfo/ProductsInfo'))
const PPCAudit = React.lazy(() => import('./PPCAudit/PPCAudit'))

const localStorageVersion = '4.05'

const checkLocalStorageVersion = () => {
    if (!localStorage.getItem('localStorageVersion') || localStorage.getItem('localStorageVersion') !== localStorageVersion) {

        const token = localStorage.getItem('token')
        localStorage.clear()
        localStorage.setItem('token', token)
        localStorage.setItem('localStorageVersion', localStorageVersion)

        window.location.reload()
    }
}

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


export const activeTimezone = JSON.parse(localStorage.getItem('activeMarketplace'))?.timezone || 'America/Los_Angeles'

const AdminRoute = (props) => {

    const {userType} = useSelector(state => ({
            userType: state.user.userDetails.user_type,
        })),
        isSuperAdmin = !!localStorage.getItem('adminToken')

    const isAdmin = userType === userTypeEnums.ADMIN

    if (isAdmin || isSuperAdmin) {
        return <Route {...props} />
    } else {
        return <Redirect to={'/404'}/>
    }
}

const AdvancedRoute = (props) => {
    const {userType} = useSelector(state => ({
        userType: state.user.userDetails.user_type,
    }))

    const isAdvancedUser = userType === userTypeEnums.ADVANCED_CLIENT

    if (isAdvancedUser) {
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
    } else if (activeAmazonRegion && !activeAmazonRegion?.is_amazon_sp_api_attached) {
        return <Redirect to={`/connect-sp-api/${activeAmazonRegion.id}`}/>
    } else if (activeAmazonRegion && !activeAmazonRegion?.is_amazon_ads_api_attached) {
        return <Redirect to={`/connect-ads-api/${activeAmazonRegion.id}`}/>
    } else {
        return <Route {...props} />
    }
}


const AuthorizedUser = (props) => {
    checkLocalStorageVersion()

    const dispatch = useDispatch()
    const pathname = props.location.pathname
    const [loadingUserInformation, setLoadingUserInformation] = useState(true)

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

    const loadUserData = async () => {
        setLoadingUserInformation(true)

        try {
            const {result} = await userService.getAmazonRegionAccounts()

            result.forEach(item => ({
                ...item,
                amazon_region_account_marketplaces: amazonRegionsSort(item.amazon_region_account_marketplaces)
            }))

            if (result.length > 0 && activeAmazonMarketplace) {
                const importStatus = await userService.checkImportStatus(activeAmazonMarketplace.id)
                dispatch(userActions.setInformation({importStatus: importStatus.result}))
            } else if (result.length > 0 && !activeAmazonMarketplace) {
                const importStatus = await userService.checkImportStatus(result[0].amazon_region_account_marketplaces[0].id)

                dispatch(userActions.setInformation({importStatus: importStatus.result}))

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

            dispatch(userActions.setAmazonRegionAccounts(result))

            setLoadingUserInformation(false)
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push(`/login?redirect=${history.location.pathname + history.location.search}`)
            return
        }

        dispatch(userActions.getUserInfo())

        loadUserData()
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

    let isAgencyUser = user.userDetails.is_agency_client,
        isAdmin = user.userDetails.user_type === userTypeEnums.ADMIN

    if (loadingUserInformation || fetchingAmazonRegionAccounts || !user.userDetails.id) {
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
                                    {(isAgencyUser) &&
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

                                    {/*<ConnectedAmazonRoute*/}
                                    {/*    exact*/}
                                    {/*    path="/ppc/dayparting"*/}
                                    {/*    component={Dayparting}*/}
                                    {/*/>*/}

                                    <ConnectedAmazonRoute
                                        exact
                                        path="/dayparting"
                                        component={Dayparting2}
                                    />

                                    {/*-------------------------------------------*/}
                                    <AdminRoute path="/admin-panel" render={() => <AdminPanel admin={true}/>}/>
                                    {/*-------------------------------------------*/}

                                    {/*-------------------------------------------*/}
                                    <AdvancedRoute path="/advanced" render={() => <AdminPanel admin={false}/>}/>
                                    {/*-------------------------------------------*/}

                                    <Route exact path="/connect-amazon-account" component={FullJourney}/>
                                    <Route exact path="/connect-sp-api/:regionId?" component={ConnectSpApiJourney}/>
                                    <Route exact path="/connect-ads-api/:regionId?" component={ConnectAdsApiJourney}/>
                                    <Route exact path="/welcome" component={WelcomePage}/>


                                    {/* ACCOUNT */}
                                    <Route path="/account" component={Account}/>

                                    {/*ZERO TO HERO*/}
                                    {(!isAgencyUser || isAdmin) && <ConnectedAmazonRoute
                                        exact
                                        path="/zero-to-hero/campaign"
                                        component={ChooseCampaign}
                                    />}

                                    {(!isAgencyUser || isAdmin) && <ConnectedAmazonRoute
                                        exact
                                        path="/zero-to-hero/ppc-structure"
                                        component={Marketing}
                                    />}

                                    {(!isAgencyUser || isAdmin) && <ConnectedAmazonRoute
                                        exact
                                        path="/zero-to-hero/creating"
                                        component={CreatingCampaign}
                                    />}

                                    {(!isAgencyUser || isAdmin) && <ConnectedAmazonRoute
                                        exact
                                        path="/zero-to-hero/payment/:batchId?"
                                        component={Payment}
                                    />}

                                    <ConnectedAmazonRoute exact path="/zero-to-hero/success" component={ThankPage}/>

                                    {(!isAgencyUser || isAdmin) && <ConnectedAmazonRoute
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

                {user.userDetails?.id && <ProductFruits
                    projectCode={process.env.REACT_APP_PRODUCT_FRUITS_CODE}
                    language="EN"
                    username={user.userDetails.id}
                    email={user.userDetails.email}
                    firstname={user.userDetails.name}
                    lastname={user.userDetails.last_name}
                />}
            </Fragment>
        )
    }
}

export default AuthorizedUser
