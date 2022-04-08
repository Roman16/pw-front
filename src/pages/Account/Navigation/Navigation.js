import React, {useEffect, useState} from "react"
import {Link, NavLink, Redirect, Route} from "react-router-dom"
import './Navigation.less'

import {icons} from "./icons"
import {history} from "../../../utils/history"
import _ from 'lodash'

const Profile = React.lazy(() => import('../Profile/Profile'))
const AccessSettings = React.lazy(() => import('../AccessSettings/AccessSettings'))
const BillingHistory = React.lazy(() => import('../BillingHistory/BillingHistory'))
const ApiConnection = React.lazy(() => import('../ApiConnection/ApiConnection'))
const BillingInformation = React.lazy(() => import('../BillingInformation/BillingInformation'))
const Subscriptions = React.lazy(() => import('../Subscriptions/Subscriptions'))


const menu = [
    {
        title: 'Profile',
        link: 'profile',
    },
    {
        title: 'Access Settings',
        link: 'access-settings',
    },
    {
        title: 'Billing Information',
        link: 'billing-information',
    },
    {
        title: 'Subscription',
        link: 'subscriptions',
    },
    {
        title: 'Billing History',
        link: 'billing-history',
    },
    {
        title: 'API Connection',
        link: 'api-connection',
    },
]


const Navigation = () => {
    const location = history.location

    useEffect(() => {
        if (window.innerWidth <= 850) document.querySelector('html').style.fontSize = '14px'

        return (() => {
            if (window.innerWidth <= 850) document.querySelector('html').style.fontSize = '10.5px'
        })
    }, [])

    return (
        <div className={'account-page'}>
            <div className="page-title">
                {location.pathname === '/account' ? 'Account' : <BackLink/>}
            </div>

            <div className={`account-navigation ${location.pathname === '/account' ? 'visible' : ''} `}>
                {menu.map(i => <NavLink
                    activeClassName={'active'}
                    exact
                    to={`/account/${i.link}`}
                >
                    <i dangerouslySetInnerHTML={{__html: icons[i.link]}}/>
                    {i.title}
                </NavLink>)}
            </div>

            <div className="account-content">
                <Route exact path="/account" render={() => {
                    if (window.innerWidth > 850) return <Redirect to={'/account/profile'}/>
                }}/>

                <Route exact path="/account/profile" component={Profile}/>
                <Route exact path="/account/access-settings" component={AccessSettings}/>
                <Route exact path="/account/billing-history" component={BillingHistory}/>
                <Route exact path="/account/api-connection" component={ApiConnection}/>
                <Route exact path="/account/subscriptions" component={Subscriptions}/>
                <Route exact path="/account/billing-information" component={BillingInformation}/>
            </div>
        </div>
    )
}


const BackLink = () => {
    const location = history.location

    const locationDescriptions = _.find(menu, {link: location.pathname.split('/')[2]})

    return (
        <Link to={'/account'}>{locationDescriptions ? locationDescriptions.title : 'Account'}</Link>
    )
}

export default React.memo(Navigation)
