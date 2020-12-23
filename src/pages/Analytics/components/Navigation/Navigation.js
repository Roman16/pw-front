import React, {memo, useEffect, useState} from "react"
import './Navigation.less'
import {NavLink} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"
import _ from 'lodash'
import {SVG} from "../../../../utils/icons"

const menuVariables = {
    'products': {
        title: 'Products',
        url: '/analytics/products',
        key: 'products',
        subMenu: [
            {
                title: 'Regular View',
                url: '/analytics/products/regular',
                key: 'products-regular',
            },
            {
                title: 'Parents View',
                url: '/analytics/products/parents',
                key: 'products-parents',
            }
        ]
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
    // 'placements': {
    //     title: 'Placements',
    //     url: '/analytics/placements',
    //     key: 'placements'
    // },
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
        key: 'product-ads'
    },
    'campaignSettings': {
        title: 'Settings',
        url: '/analytics/campaign-settings',
        key: 'campaignSettings'
    },
    'portfolioSettings': {
        title: 'Settings',
        url: '/analytics/portfolio-settings',
        key: 'portfolioSettings'
    },
    'productOverview': {
        title: 'Overview',
        url: '/analytics/overview',
        key: 'overview'
    },
}

export const allMenuItems = []

Object.values(menuVariables).forEach(item => {
    if (item.subMenu) {
        item.subMenu.forEach(subItem => {
            allMenuItems.push(subItem)
        })
    }

    allMenuItems.push(item)
})

export const analyticsNavigation = {
    account: [
        menuVariables.products,
        menuVariables.portfolios,
        menuVariables.campaigns,
        // menuVariables.placements,
        menuVariables.adGroups,
        menuVariables.targetings,
        menuVariables.negativeTargeting,
        menuVariables.productAds
    ],

    campaign: [
        menuVariables.adGroups,
        // menuVariables.placements,
        menuVariables.productAds,
        menuVariables.targetings,
        menuVariables.negativeTargeting,
        menuVariables.campaignSettings,
    ],
    product: [
        menuVariables.productOverview,
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
        // menuVariables.placements,
        menuVariables.adGroups,
        menuVariables.targetings,
        menuVariables.negativeTargeting,
        menuVariables.productAds,
        menuVariables.portfolioSettings,
    ]
}

const Navigation = ({location}) => {
    const mainState = useSelector(state => state.analytics.mainState)
    const visibleNavigation = useSelector(state => state.analytics.visibleNavigation)


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



        if (allMenuItems.find(item => item.url === location.pathname)) {
            dispatch(analyticsActions.setLocation(allMenuItems.find(item => item.url === location.pathname).key))
        }
    }, [location])

    return (
        <section className={`navigation ${visibleNavigation ? 'visible' : 'hidden'}`}>
            <ul>
                {currentMenu.map((item, index) => <li>
                    <NavLink activeClassName={'active'} to={item.url + location.search}
                             onClick={() => setLocation(item.key)}>
                        {item.title}

                        {item.subMenu && <i className={'btn icon-btn switch-sub-menu'}>
                            <SVG id={'select-icon'}/>
                        </i>}
                    </NavLink>

                    {item.subMenu && <ul className={'sub-menu'}>
                        {item.subMenu.map(subItem => (
                            <li>
                                <NavLink activeClassName={'active'} to={subItem.url + location.search}
                                         onClick={() => setLocation(subItem.key)}>
                                    {subItem.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>}
                </li>)}
            </ul>
        </section>
    )
}

export default memo(Navigation)
