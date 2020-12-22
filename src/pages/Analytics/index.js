import React, {memo, useEffect} from "react"
import Navigation from "./components/Navigation/Navigation"
import Header from "./components/Header/Header"
import {Redirect, Route} from "react-router-dom"

import './Analytics.less'
import {history} from "../../utils/history"
import queryString from "query-string"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../actions/analytics.actions"

import Campaigns from "./Campaigns/Campaigns"
import AdGroups from "./AdGroups/AdGroups"
import Products from "./Products/Products"
import Portfolios from "./Portfolios/Portfolios"
import CampaignSettings from "./CampaignSettings/CampaignSettings"
import ProductAds from "./ProductAds/ProductAds"
import Targetings from "./Targetings/Targetings"
import NegativeTargetings from "./NegativeTargetings/NegativeTargetings"
import Placements from "./Placements/Placements"
import PortfolioSettings from "./PortfolioSettings/PortfolioSettings"
import ProductOverview from "./ProductOverview/ProductOverview"
import {debounce} from "throttle-debounce"

const Analytics = (props) => {
    const dispatch = useDispatch()

    const location = useSelector(state => state.analytics.location)

    const setState = debounce(100, false, state => {
        dispatch(analyticsActions.setMainState(state))
    })

    useEffect(() => {
        const queryParams = queryString.parse(props.location.search)
        if (queryParams.isParent) delete queryParams.isParent

        if (Object.keys(queryParams).length !== 0) {
            setState(queryParams)
        }

        window.addEventListener('popstate', function (event) {
            const queryParams = queryString.parse(event.target.location.search)
            if (queryParams.isParent) delete queryParams.isParent

            if (Object.keys(queryParams).length !== 0) {
                setState(queryParams)
            } else {
                setState({})
            }
        }, false)

        return (() => {
            dispatch(analyticsActions.setMainState(undefined))
            dispatch(analyticsActions.setLocation('products'))
        })
    }, [])

    const clearLocal = () => {
        localStorage.removeItem('analyticsMetricsState')
        localStorage.removeItem('analyticsChartState')
        localStorage.removeItem('analyticsFiltersList')
    }

    if (localStorage.getItem('analyticsMetricsState')) {
        if (JSON.parse(localStorage.getItem('analyticsMetricsState'))['regular-products'] == undefined) {
            clearLocal()
        }
    }

    if (localStorage.getItem('analyticsChartState')) {
        if (JSON.parse(localStorage.getItem('analyticsChartState'))['regular-products'] == undefined) {
            clearLocal()
        }
    }

    if (localStorage.getItem('analyticsFiltersList')) {
        if (JSON.parse(localStorage.getItem('analyticsFiltersList'))['regular-products'] == undefined) {
            clearLocal()
        }
    }

    return (
        <div className="analytics-page">
            <Header
                location={props.location}
            />

            <Navigation
                location={props.location}
            />

            <section className="workplace">
                <Route exact path="/analytics" render={() => <Redirect to="/analytics/campaigns"/>}/>

                <Route exact path="/analytics/campaigns" component={Campaigns}/>
                <Route exact path="/analytics/campaign-settings" component={CampaignSettings}/>

                <Route exact path="/analytics/products" render={() => <Redirect to={'/analytics/products/regular'}/>}/>
                <Route exact path="/analytics/products/regular" render={() => <Products location={'products-regular'}/>}/>
                <Route exact path="/analytics/products/parents" render={() => <Products location={'products-parents'}/>}/>

                <Route exact path="/analytics/ad-groups" component={AdGroups}/>
                <Route exact path="/analytics/overview" component={ProductOverview}/>
                <Route exact path="/analytics/product-ads" component={ProductAds}/>
                <Route exact path="/analytics/portfolios" component={Portfolios}/>
                <Route exact path="/analytics/portfolio-settings" component={PortfolioSettings}/>
                <Route exact path="/analytics/targetings" component={Targetings}/>
                <Route exact path="/analytics/negative-targetings" component={NegativeTargetings}/>
                {/*<Route exact path="/analytics/placements" component={Placements}/>*/}
            </section>
        </div>
    )
}

export default memo(Analytics)
