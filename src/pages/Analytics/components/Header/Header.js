import React, {memo, useEffect, useState} from "react"
import './Header.less'
import {SVG} from "../../../../utils/icons"
import {allMenuItems} from "../Navigation/Navigation"
import {useDispatch, useSelector} from "react-redux"
import {history} from "../../../../utils/history"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {analyticsServices} from "../../../../services/analytics.services"
import queryString from "query-string"

let newState = undefined

const Header = ({location}) => {
    const locationDescription = allMenuItems.find(item => item.url === location.pathname)
    const dispatch = useDispatch()
    const mainState = useSelector(state => state.analytics.mainState)

    const visibleNavigation = useSelector(state => state.analytics.visibleNavigation)

    const [stateName, setStateName] = useState(mainState.name)

    const setMainState = (state, url, location) => {
        history.push(url)

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
                <li onClick={() => setMainState(undefined, '/analytics/campaigns', 'campaigns')}>
                    Campaigns

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </li>

                <li onClick={() => setMainState({
                    campaignId: mainState.campaignId,
                    name: {campaignName: stateName.campaignName}
                }, `/analytics/ad-groups?campaignId=${mainState.campaignId}`, 'ad-groups')}>
                    {stateName.campaignName}

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </li>

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
                    <li onClick={() => setMainState(undefined, '/analytics/campaigns')}>
                        Campaigns

                        <i>
                            <SVG id={'right-steps-arrow'}/>
                        </i>
                    </li>

                    <li>
                        {stateName.campaignName}

                        <i>
                            <SVG id={'right-steps-arrow'}/>
                        </i>
                    </li>
                </>
            )
        } else if (mainState.productId) {
            return (<>
                <li onClick={() => {
                    const queryParams = queryString.parse(history.location.search)
                    let url = ''

                    if (queryParams.isParent === 'true') {
                        url = '/analytics/products/parents'
                    } else {
                        url = '/analytics/products/regular'
                    }

                    setMainState(undefined, url)
                }}>
                    Products

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </li>

                <li title={stateName.productName && stateName.productName.length > 30 && stateName.productName}>
                    {stateName.productName && stateName.productName.length > 30 ? `${stateName.productName.slice(0, 30)}...` : stateName.productName}

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </li>
            </>)
        } else if (mainState.portfolioId) {
            return (<>
                <li onClick={() => setMainState(undefined, '/analytics/portfolios')}>
                    Portfolios

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </li>

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
            <div className="title" onClick={() => setMainState(undefined, '/analytics/products/regular')}>
                <SVG id={'analytics-icon'}/>
                <h1>Analytics</h1>
            </div>


            <div className="nav">
                <ul className="steps">
                    <StepsRender/>
                </ul>

                <h4 className="current-location">
                    {locationDescription && (locationDescription.headerTitle || locationDescription.title)}
                </h4>
            </div>
        </section>
    )
}

export default memo(Header)
