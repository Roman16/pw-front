import React, {memo, useEffect, useState} from "react"
import './Header.less'
import {SVG} from "../../../../utils/icons"
import {analyticsNavigation} from "../Navigation/Navigation"
import {useDispatch, useSelector} from "react-redux"
import {history} from "../../../../utils/history"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {analyticsServices} from "../../../../services/analytics.services"

const Header = ({location}) => {
    const locationDescription = Object.values(analyticsNavigation).reduce((all, item) => ([...all, ...item])).find(item => item.url === location.pathname)
    const dispatch = useDispatch()
    const {mainState} = useSelector(state => ({
        mainState: state.analytics.mainState
    }))

    const [name, setName] = useState(mainState.name)

    const setMainState = (state, url, location) => {
        dispatch(analyticsActions.setMainState(state))
        dispatch(analyticsActions.setLocation(location))
        history.push(url)
    }

    const getStateInformation = async () => {
        try {
            const res = await analyticsServices.getCampaignInformation(mainState.campaignId)

            setName(res.response.name)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (mainState.name) {
            setName(mainState.name)
        }

        if (mainState.campaignId) {
            getStateInformation()
        }
    }, [mainState])

    const StepsRender = () => {
        if (mainState.adGroupId && mainState.campaignId) {
            return (<>
                <li onClick={() => setMainState(undefined, '/analytics/campaigns', 'campaigns')}>
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
                        {name}

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
