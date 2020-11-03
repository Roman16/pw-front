import React, {memo, useEffect, useState} from "react"
import './Navigation.less'
import {NavLink} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"
import _ from "lodash"

const menuVariables = {
    'products': {
        title: 'Products',
        url: '/analytics/products',
        key: 'products'
    },
    'portfolios': {
        title: 'Portfolios',
        url: '/analytics/portfolios',
        key: 'portfolios'
    },
    'campaigns': {
        title: 'Campaigns',
        url: '/analytics/campaigns',
        key: 'campaigns'
    },
    'placements': {
        title: 'Placements',
        url: '/analytics/placements',
        key: 'placements'
    },
    'adGroups': {
        title: 'Ad Groups',
        url: '/analytics/ad-groups',
        key: 'ad-groups'
    },
    'targetings': {
        title: 'Targetings',
        url: '/analytics/targetings',
        key: 'targetings'
    },
    'negativeTargeting': {
        title: 'Negative Targetings',
        url: '/analytics/negative-targetings',
        key: 'negative-targetings'
    },
    'productAds': {
        title: 'Product Ads',
        url: '/analytics/product-ads',
        key: 'productAds'
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
            url: '/analytics/campaign-settings',
            key: 'campaignSettings'
        }
    ],
    product: [
        {
            title: 'Overview',
            url: '/analytics/overview',
            key: 'overview'
        },
        menuVariables.campaigns,
        menuVariables.adGroups,
        menuVariables.targetings,
        menuVariables.negativeTargeting,
        menuVariables.productAds
    ],
    adGroups: [
        menuVariables.productAds,
        menuVariables.targetings,
        menuVariables.negativeTargeting,
    ],
    portfolio: [
        menuVariables.campaigns,
        menuVariables.placements,
        menuVariables.adGroups,
        menuVariables.targetings,
        menuVariables.negativeTargeting,
        menuVariables.productAds,
        {
            title: 'Settings',
            url: '/analytics/portfolio-settings',
            key: 'portfolioSettings'
        }
    ]
}

const Navigation = ({location}) => {
    const {mainState} = useSelector(state => ({
        mainState: state.analytics.mainState
    }))

    const dispatch = useDispatch()

    const [currentMenu, setCurrentMenu] = useState(analyticsNavigation.account)

    const setLocation = (key) => {
        dispatch(analyticsActions.setLocation(key))
    }

    useEffect(() => {
        if (mainState.adGroupId && mainState.campaignId) {
            setCurrentMenu(analyticsNavigation.adGroups)
        } else if (mainState.campaignId) {
            setCurrentMenu(analyticsNavigation.campaign)
        } else if (mainState.productId) {
            setCurrentMenu(analyticsNavigation.product)
        } else if (mainState.portfolioId) {
            setCurrentMenu(analyticsNavigation.portfolio)
        } else {
            setCurrentMenu(analyticsNavigation.account)
        }
    }, [mainState])

    useEffect(() => {
        dispatch(analyticsActions.setLocation(Object.values(analyticsNavigation).reduce((all, item) => ([...all, ...item])).find(item => item.url === location.pathname).key))
    }, [location])

    return (
        <section className={'navigation'}>
            <ul>
                {currentMenu.map((item, index) => <li>
                    <NavLink activeClassName={'active'} to={item.url + location.search} onClick={() => setLocation(item.key)}>
                        {item.title}
                    </NavLink>
                </li>)}
            </ul>
        </section>
    )
}

export default memo(Navigation)
