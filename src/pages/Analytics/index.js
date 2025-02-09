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
import SearchTerms from "./SearchTerms/SearchTerms"

import ProductsV1 from "./v1/Products/Products"
import CampaignsV1 from "./v1/Campaigns/Campaigns"
import AdGroupsV1 from "./v1/AdGroups/AdGroups"
import ProductAdsV1 from "./v1/ProductAds/ProductAds"
import PortfoliosV1 from "./v1/Portfolios/Portfolios"
import TargetingsV1 from "./v1/Targetings/Targetings"
import NegativeTargetingsV1 from "./v1/NegativeTargetings/NegativeTargetings"


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
                <Route exact path="/analytics" render={() => <Redirect to="/analytics/products"/>}/>

                <Route exact path="/analytics/campaigns" component={Campaigns}/>
                <Route exact path="/analytics/campaign-settings" component={CampaignSettings}/>

                <Route exact path="/analytics/products" render={() => <Redirect to={'/analytics/products/regular'}/>}/>
                <Route exact path="/analytics/products/regular"
                       render={() => <Products location={'products'}/>}/>
                <Route exact path="/analytics/products/parents"
                       render={() => <Products location={'products-parents'}/>}/>

                <Route exact path="/analytics/ad-groups" component={AdGroups}/>
                <Route exact path="/analytics/overview" component={ProductOverview}/>
                <Route exact path="/analytics/product-ads" component={ProductAds}/>
                <Route exact path="/analytics/portfolios" component={Portfolios}/>
                <Route exact path="/analytics/portfolio-settings" component={PortfolioSettings}/>
                <Route exact path="/analytics/targetings" component={Targetings}/>
                <Route exact path="/analytics/negative-targetings" component={NegativeTargetings}/>
                <Route exact path="/analytics/placements" component={Placements}/>
                <Route exact path="/analytics/search-terms" component={SearchTerms}/>

                {/*V1*/}
                <Route exact path="/analytics/v1/products/regular"
                       render={() => <ProductsV1 location={'products-regular'}/>}/>
                <Route exact path="/analytics/v1/products/parents"
                       render={() => <ProductsV1 location={'products-parents'}/>}/>
                <Route exact path="/analytics/v1/campaigns" component={CampaignsV1}/>
                <Route exact path="/analytics/v1/ad-groups" component={AdGroupsV1}/>
                <Route exact path="/analytics/v1/product-ads" component={ProductAdsV1}/>
                <Route exact path="/analytics/v1/portfolios" component={PortfoliosV1}/>
                <Route exact path="/analytics/v1/targetings" component={TargetingsV1}/>
                <Route exact path="/analytics/v1/negative-targetings" component={NegativeTargetingsV1}/>
            </section>
        </div>
    )
}

export default memo(Analytics)
