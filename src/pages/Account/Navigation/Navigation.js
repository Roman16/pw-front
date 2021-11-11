import React from "react"
import {NavLink, Route} from "react-router-dom"
import './Navigation.less'

import Information from '../Information/Information'
import ApiConnection from '../ApiConnection/ApiConnection'
import Subscription from '../Subscription/Subscription'
import {icons} from "./icons"
import Profile from "../Profile/Profile"
import AccessSettings from "../AccessSettings/AccessSettings"
import BillingHistory from "../BillingHistory/BillingHistory"

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
        link: 'subscription',
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
    return (
        <div className={'account-page'}>
            <div className="account-navigation">
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
                <Route exact path="/account/profile" component={Profile}/>
                <Route exact path="/account/access-settings" component={AccessSettings}/>
                <Route exact path="/account/billing-history" component={BillingHistory}/>

            </div>

            <Route exact path="/account/settings" component={Information}/>
            <Route exact path="/account/api-connections" component={ApiConnection}/>
            <Route exact path="/account/subscription" component={Subscription}/>
        </div>
    )
}

export default React.memo(Navigation)
