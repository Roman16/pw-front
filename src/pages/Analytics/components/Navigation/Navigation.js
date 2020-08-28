import React, {memo, useEffect, useState} from "react";
import './Navigation.less';
import {NavLink} from "react-router-dom";
import {SVG} from "../../../../utils/icons";
import {useSelector} from "react-redux";

export const analyticsNavigation = {
    account: [
        {
            title: 'Products',
            url: '/analytics/products'
        },
        {
            title: 'Portfolios',
            url: '/analytics/portfolios'
        },
        {
            title: 'Campaigns',
            url: '/analytics/campaigns'
        },
        {
            title: 'Placements',
            url: '/analytics/placements'
        },
        {
            title: 'Ad Groups',
            url: '/analytics/ad-groups'
        },
        {
            title: 'Targeting',
            url: '/analytics/targeting'
        },
        {
            title: 'Negative Targeting',
            url: '/analytics/negative-targeting'
        },
        {
            title: 'Product Ads',
            url: '/analytics/product-ads'
        }
    ],

    campaign: [
        {
            title: 'Ad Groups',
            url: '/analytics/ad-groups'
        },
        {
            title: 'Placements',
            url: '/analytics/placements'
        },
        {
            title: 'Product Ads',
            url: '/analytics/product-ads'
        },
        {
            title: 'Targeting',
            url: '/analytics/targeting'
        },
        {
            title: 'Negative Targeting',
            url: '/analytics/negative-targeting'
        },
        {
            title: 'Settings',
            url: '/analytics/settings'
        }
    ]
};


const Navigation = () => {
    const {mainState} = useSelector(state => ({
        mainState: state.analytics.mainState
    }));

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

};

export default memo(Navigation);