import React from "react";
import './Navigation.less';
import {NavLink} from "react-router-dom";

const Navigation = () => {

    const menu = [
        {
            title: 'Overview',
            url: '/analytics/overview'
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
    ];

    return (
        <section className={'navigation'}>
            <ul>
                {menu.map(item => <li><NavLink to={item.url}>{item.title}</NavLink></li>)}
            </ul>
        </section>
    )
};

export default Navigation;