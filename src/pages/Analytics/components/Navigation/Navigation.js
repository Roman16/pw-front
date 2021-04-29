import React, {memo, useEffect, useState} from "react"
import './Navigation.less'
import {NavLink} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"
import _ from 'lodash'
import {SVG} from "../../../../utils/icons"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import {Popover} from "antd"

const menuVariables = {
    'products': {
        title: 'Products',
        url: '/analytics/products',
        key: 'products',
        subMenu: [
            {
                title: 'Regular View',
                headerTitle: 'Products Regular View',
                url: '/analytics/products/regular',
                key: 'products',
                description: {
                    title: 'Regular View',
                    text: 'Regular View is showing statistics on SKU level.'
                }
            },
            {
                title: 'Parents View',
                headerTitle: 'Products Parents View',
                url: '/analytics/products/parents',
                key: 'products-parents',
                description: {
                    title: 'Parents View',
                    text: 'Parents View is designed to showcase aggregated statistics for Parent products.\n'
                }
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
    'searchTerms': {
        title: 'Search Terms',
        url: '/analytics/search-terms',
        key: 'searchTerms'
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
        menuVariables.placements,
        menuVariables.adGroups,
        menuVariables.targetings,
        menuVariables.searchTerms,
        menuVariables.negativeTargeting,
        menuVariables.productAds
    ],

    campaign: [
        menuVariables.adGroups,
        menuVariables.placements,
        menuVariables.productAds,
        menuVariables.targetings,
        menuVariables.searchTerms,
        menuVariables.negativeTargeting,
        menuVariables.campaignSettings,
    ],
    product: [
        menuVariables.productOverview,
        menuVariables.campaigns,
        menuVariables.adGroups,
        menuVariables.targetings,
        menuVariables.searchTerms,
        menuVariables.negativeTargeting,
        menuVariables.productAds
    ],
    adGroups: [
        menuVariables.productAds,
        menuVariables.targetings,
        menuVariables.searchTerms,
        menuVariables.negativeTargeting,
    ],
    portfolio: [
        menuVariables.campaigns,
        menuVariables.placements,
        menuVariables.adGroups,
        menuVariables.targetings,
        menuVariables.searchTerms,
        menuVariables.negativeTargeting,
        menuVariables.productAds,
        menuVariables.portfolioSettings,
    ]
}

const Navigation = ({location}) => {
    const [openedSubMenu, setOpenedSubMenu] = useState('products')

    const mainState = useSelector(state => state.analytics.mainState)
    const visibleNavigation = useSelector(state => state.analytics.visibleNavigation)
    const stateDetails = useSelector(state => state.analytics.stateDetails)

    const dispatch = useDispatch()

    const [currentMenu, setCurrentMenu] = useState(analyticsNavigation.account)

    const setLocation = (key) => {
        dispatch(analyticsActions.setLocation(key))
    }

    const switchSubMenuHandler = (e, menu) => {
        e.preventDefault()
        e.stopPropagation()

        if (menu === openedSubMenu) setOpenedSubMenu(null)
        else setOpenedSubMenu(menu)
    }

    useEffect(() => {
        if (mainState.adGroupId && mainState.campaignId) {
            setCurrentMenu(analyticsNavigation.adGroups)
        } else if (mainState.campaignId) {
            if (stateDetails.advertisingType && stateDetails.advertisingType === 'SponsoredDisplay') {
                setCurrentMenu([...analyticsNavigation.campaign.filter(item => item.key !== 'placements')])
            } else {
                setCurrentMenu(analyticsNavigation.campaign)
            }
        } else if (mainState.productId) {
            setCurrentMenu(analyticsNavigation.product)
        } else if (mainState.portfolioId) {
            setCurrentMenu(analyticsNavigation.portfolio)
        } else {
            setCurrentMenu(analyticsNavigation.account)
        }
    }, [mainState, stateDetails])

    useEffect(() => {
        if (allMenuItems.find(item => item.url === location.pathname)) {
            dispatch(analyticsActions.setLocation(allMenuItems.find(item => item.url === location.pathname).key))
        }
    }, [location])

    return (
        <section className={`navigation ${visibleNavigation ? 'visible' : 'hidden'}`}>
            <ul>
                {currentMenu.map((item, index) => <li>
                    <NavLink
                        activeClassName={'active'}
                        to={item.url + location.search}
                        onClick={(e) => {
                            setLocation(item.key)
                            if (item.subMenu) setOpenedSubMenu(item.key)
                        }}
                    >
                        {item.title}

                        {item.subMenu &&
                        <i
                            className={`btn icon-btn switch-sub-menu ${item.key === openedSubMenu ? 'opened' : ''}`}
                            onClick={(e) => switchSubMenuHandler(e, item.key)}
                        >
                            <SVG id={'select-icon'}/>
                        </i>}
                    </NavLink>

                    {item.subMenu && <ul className={`sub-menu ${item.key === openedSubMenu ? 'opened' : ''}`}>
                        {item.subMenu.map(subItem => (
                            <li>
                                <NavLink
                                    activeClassName={'active'}
                                    to={subItem.url + location.search}
                                    onClick={() => setLocation(subItem.key)}
                                >
                                    {subItem.title}

                                    {/*{subItem.description && <InformationTooltip*/}
                                    {/*    getPopupContainer={(node) => node.parentNode}*/}
                                    {/*    position="right"*/}
                                    {/*    title={subItem.description.title}*/}
                                    {/*    description={subItem.description.text}*/}
                                    {/*/>}*/}
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
