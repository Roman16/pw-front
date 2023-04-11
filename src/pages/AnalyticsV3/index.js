import React, {memo, useEffect} from "react"
import Navigation from "./components/Navigation/Navigation"
import Header from "./components/Header/Header"
import {Redirect, Route} from "react-router-dom"

import './Analytics.less'
import queryString from "query-string"
import {useDispatch} from "react-redux"
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
import SearchTerms from "./SearchTerms/SearchTerms"


const Analytics = (props) => {
    const dispatch = useDispatch()

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

    return (
        <div className="analytics-page">
            <Header
                location={props.location}
            />

            <Navigation
                location={props.location}
            />

            <section className="workplace">
                <Route exact path="/analytics-v3" render={() => <Redirect to="/analytics-v3/products"/>}/>

                <Route exact path="/analytics-v3/campaigns" component={Campaigns}/>
                <Route exact path="/analytics-v3/campaign-settings" component={CampaignSettings}/>

                <Route exact path="/analytics-v3/products" render={() => <Redirect to={'/analytics-v3/products/regular'}/>}/>
                <Route exact path="/analytics-v3/products/regular"
                       render={() => <Products location={'products'}/>}/>
                <Route exact path="/analytics-v3/products/parents"
                       render={() => <Products location={'products-parents'}/>}/>

                <Route exact path="/analytics-v3/ad-groups" component={AdGroups}/>
                <Route exact path="/analytics-v3/overview" component={ProductOverview}/>
                <Route exact path="/analytics-v3/product-ads" component={ProductAds}/>
                <Route exact path="/analytics-v3/portfolios" component={Portfolios}/>
                <Route exact path="/analytics-v3/portfolio-settings" component={PortfolioSettings}/>
                <Route exact path="/analytics-v3/targetings" component={Targetings}/>
                <Route exact path="/analytics-v3/negative-targetings" component={NegativeTargetings}/>
                <Route exact path="/analytics-v3/placements" component={Placements}/>
                <Route exact path="/analytics-v3/search-terms" component={SearchTerms}/>
            </section>
        </div>
    )
}

export default memo(Analytics)
