import React, {memo, useEffect} from "react"
import Navigation from "./components/Navigation/Navigation"
import Header from "./components/Header/Header"
import {Route} from "react-router-dom"

import './Analytics.less'
import {history} from "../../utils/history"
import queryString from "query-string"
import {useDispatch} from "react-redux"
import {analyticsActions} from "../../actions/analytics.actions"

import Campaigns from "./Campaigns/Campaigns"
import AdGroups from "./AdGroups/AdGroups"
import Products from "./Products/Products"

const Analytics = (props) => {
    const dispatch = useDispatch()

    if (props.location.pathname === '/analytics') {
        history.push('/analytics/campaigns')
    }

    useEffect(() => {
        const queryParams = queryString.parse(props.location.search)

        if (Object.keys(queryParams).length !== 0) {
            dispatch(analyticsActions.setMainState(queryParams))
        }
    }, [props.location.search])

    useEffect(() => {
        document.querySelector('.workplace').scrollTop = 0
    }, [props.location])

    return (
        <div className="analytics-page">
            <Header
                location={props.location}
            />

            <Navigation/>

            <section className="workplace">
                <Route exact path="/analytics/campaigns" component={Campaigns}/>
                <Route exact path="/analytics/ad-groups" component={AdGroups}/>
                <Route exact path="/analytics/products" component={Products}/>
            </section>
        </div>
    )
}

export default memo(Analytics)