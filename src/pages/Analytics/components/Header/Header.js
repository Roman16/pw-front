import React, {memo} from "react"
import './Header.less'
import {SVG} from "../../../../utils/icons"
import {analyticsNavigation} from "../Navigation/Navigation"
import {useDispatch, useSelector} from "react-redux"
import {history} from "../../../../utils/history"
import {analyticsActions} from "../../../../actions/analytics.actions"

const Header = ({location}) => {
    const locationDescription = Object.values(analyticsNavigation).reduce((all, item) => ([...all, ...item])).find(item => item.url === location.pathname)
    const dispatch = useDispatch()
    const {mainState} = useSelector(state => ({
        mainState: state.analytics.mainState
    }))

    const setMainState = (state, url) => {
        dispatch(analyticsActions.setMainState(state))
        history.push(url)
    }

    const StepsRender = () => {
        if (mainState.adGroupId && mainState.campaignId) {
            return (<>
                <li onClick={() => setMainState(undefined, '/analytics/campaigns')}>
                    Campaigns

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </li>

                <li onClick={() => setMainState({campaignId: mainState.campaignId}, `/analytics/ad-groups?campaignId=${mainState.campaignId}`)}>
                    {mainState.campaignId}

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </li>

                <li>
                    {mainState.adGroupId}

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
                        {mainState.campaignId}

                        <i>
                            <SVG id={'right-steps-arrow'}/>
                        </i>
                    </li>
                </>
            )
        } else if (mainState.productId) {
            return (<>
                <li onClick={() => setMainState(undefined, '/analytics/products')}>
                    Products

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </li>

                <li>
                    {mainState.productId}

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
                    {mainState.portfolioId}

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
        <section className="analytics-header">
            <div className="title">
                <SVG id={'analytics-icon'}/>
                <h1>Analytics</h1>
            </div>


            <div className="nav">
                <ul className="steps">
                    <StepsRender/>
                </ul>

                <h4 className="current-location">
                    {locationDescription && locationDescription.title}
                </h4>
            </div>
        </section>
    )
}

export default memo(Header)