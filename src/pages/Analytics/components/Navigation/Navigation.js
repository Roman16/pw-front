import React, {memo} from "react"
import './Navigation.less'
import {NavLink} from "react-router-dom"
import {useSelector} from "react-redux"


const menuVariables = {
    'products': {
        title: 'Products',
        url: '/analytics/products'
    },
    'portfolios': {
        title: 'Portfolios',
        url: '/analytics/portfolios'
    },
    'campaigns': {
        title: 'Campaigns',
        url: '/analytics/campaigns'
    },
    'placements': {
        title: 'Placements',
        url: '/analytics/placements'
    },
    'adGroups': {
        title: 'Ad Groups',
        url: '/analytics/ad-groups'
    },
    'targetings': {
        title: 'Targetings',
        url: '/analytics/targetings'
    },
    'negativeTargeting': {
        title: 'Negative Targeting',
        url: '/analytics/negative-targeting'
    },
    'productAds': {
        title: 'Product Ads',
        url: '/analytics/product-ads'
    }
}


export const analyticsNavigation = {
    account: [
        menuVariables.products,
        menuVariables.portfolios,
        menuVariables.campaigns,
        menuVariables.placements,
        menuVariables.adGroups,
        menuVariables.targetings,
        menuVariables.negativeTargeting,
        menuVariables.productAds
    ],

    campaign: [
        menuVariables.adGroups,
        menuVariables.placements,
        menuVariables.productAds,
        menuVariables.targetings,
        menuVariables.negativeTargeting,
        {
            title: 'Settings',
            url: '/analytics/campaign-settings'
        }
    ]
}


const Navigation = () => {
    const {mainState} = useSelector(state => ({
        mainState: state.analytics.mainState
    }))

    if (mainState.campaignId) {
        return (
            <section className={'navigation'}>
                <ul>
                    {analyticsNavigation.campaign.map((item, index) => <li>
                        <NavLink activeClassName={'active'} to={`${item.url}?campaignId=${mainState.campaignId}`}>
                            {item.title}

                            {/*{index === 0 && <SVG id={'house'}/>}*/}
                        </NavLink>
                    </li>)}
                </ul>
            </section>
        )
    } else {
        return (
            <section className={'navigation'}>
                <ul>
                    {analyticsNavigation.account.map((item, index) => <li>
                        <NavLink activeClassName={'active'} to={item.url}>
                            {item.title}

                            {/*{index === 0 && <SVG id={'house'}/>}*/}
                        </NavLink>
                    </li>)}
                </ul>
            </section>
        )

    }

}

export default memo(Navigation)