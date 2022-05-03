import React, {memo, useEffect, useState} from "react"
import './Header.less'
import {SVG} from "../../../../utils/icons"
import {allMenuItems} from "../Navigation/Navigation"
import {useDispatch, useSelector} from "react-redux"
import {history} from "../../../../utils/history"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {analyticsServices} from "../../../../services/analytics.services"
import queryString from "query-string"
import {Link} from "react-router-dom"
import AttributionWindow from "./AttributionWindow"

let newState = undefined

const Header = ({location}) => {
    const locationDescription = allMenuItems.find(item => item.url === location.pathname)
    const dispatch = useDispatch()
    const mainState = useSelector(state => state.analytics.mainState)

    const visibleNavigation = useSelector(state => state.analytics.visibleNavigation)

    const [stateName, setStateName] = useState(mainState.name)

    const setMainState = (state, location, event) => {
        if (event.ctrlKey || event.metaKey) return

        newState = {
            state,
            location
        }
    }

    const getStateInformation = async () => {
        try {
            const idArr = Object.keys(mainState).filter(item => item !== 'name')
            const res = await Promise.all(idArr.map((key) => analyticsServices.fetchStateInformation(key, mainState[key])))

            let stateNameValue = {}

            idArr.forEach((key, index) => {
                stateNameValue[`${key.split('Id')[0]}Name`] = res[index].response.name
            })

            dispatch(analyticsActions.setStateDetails(res.reduce((total, item) => ({...total.response, ...item.response}), {})))

            setStateName(stateNameValue)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (mainState.name) {
            setStateName(mainState.name)
        }

        if (mainState.campaignId || mainState.productId || mainState.portfolioId) {
            getStateInformation()
        }
    }, [mainState])

    useEffect(() => {
        if (newState) {
            dispatch(analyticsActions.setMainState(newState.state))
            dispatch(analyticsActions.setLocation(newState.location))

            newState = undefined
        }
    }, [history.location])

    const StepsRender = () => {
        if (mainState.adGroupId && mainState.campaignId) {
            return (<>
                <Link
                    to={'/analytics/campaigns'}
                    onClick={(e) => setMainState(undefined, 'campaigns', e)}>
                    Campaigns

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </Link>

                <Link
                    to={`/analytics/ad-groups?campaignId=${mainState.campaignId}`}
                    onClick={(e) => setMainState({
                        campaignId: mainState.campaignId,
                        name: {campaignName: stateName.campaignName}
                    }, 'ad-groups', e)}>
                    {stateName.campaignName}

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </Link>

                <li>
                    {stateName.adGroupName}

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </li>
            </>)
        } else if (mainState.campaignId) {
            return (
                <>
                    <Link
                        to={'/analytics/campaigns'}
                        onClick={(e) => setMainState(undefined, undefined, e)}>
                        Campaigns

                        <i>
                            <SVG id={'right-steps-arrow'}/>
                        </i>
                    </Link>

                    <li>
                        {stateName.campaignName}

                        <i>
                            <SVG id={'right-steps-arrow'}/>
                        </i>
                    </li>
                </>
            )
        } else if (mainState.productId) {
            const queryParams = queryString.parse(history.location.search)

            return (<>
                <Link
                    to={queryParams.isParent === 'true' ? '/analytics/products/parents' : '/analytics/products/regular'}
                    onClick={(e) => setMainState(undefined, undefined, e)}>
                    Products

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </Link>

                <li title={stateName.productName && stateName.productName.length > 30 && stateName.productName}>
                    {stateName.productName && stateName.productName.length > 30 ? `${stateName.productName.slice(0, 30)}...` : stateName.productName}

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </li>
            </>)
        } else if (mainState.portfolioId) {
            return (<>
                <Link
                    to={'/analytics/portfolios'}
                    onClick={(e) => setMainState(undefined, undefined, e)}>
                    Portfolios

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </Link>

                <li>
                    {stateName.portfolioName}

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </li>
            </>)
        } else {
            return (
                <li>
                    Account

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </li>
            )
        }
    }

    return (
        <section className={`analytics-header  ${visibleNavigation ? 'visible' : 'hidden'}`}>
            <Link to={'/analytics/products/regular'} className="title"
                  onClick={() => {
                      newState = {
                          state: undefined,
                          location: 'products'
                      }
                  }}>
                <SVG id={'analytics-icon'}/>
                <h1>Analytics</h1>
            </Link>


            <div className="nav">
                <ul className="steps">
                    <StepsRender/>
                </ul>

                <h4 className="current-location">
                    {locationDescription && (locationDescription.headerTitle || locationDescription.title)}
                </h4>
            </div>

            {(location.pathname !== '/analytics/negative-targetings' && location.pathname !== '/analytics/campaign-settings' && location.pathname !== '/analytics/portfolio-settings') &&
            <AttributionWindow/>}
        </section>
    )
}

export default memo(Header)
