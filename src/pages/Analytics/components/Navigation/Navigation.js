import React, {memo} from "react";
import './Navigation.less';
import {NavLink} from "react-router-dom";
import {SVG} from "../../../../utils/icons";

export const analyticsNavigation = [
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
    },
];


const Navigation = () => {


    return (
        <section className={'navigation'}>
            <ul>
                {analyticsNavigation.map((item, index) => <li>
                    <NavLink to={item.url}>
                        {item.title}

                        {/*{index === 0 && <SVG id={'house'}/>}*/}
                    </NavLink>
                </li>)}
            </ul>
        </section>
    )
};

export default memo(Navigation);