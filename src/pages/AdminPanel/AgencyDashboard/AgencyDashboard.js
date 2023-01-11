import React from "react"
import './AgencyDashboard.less'
import {NavLink, Route} from "react-router-dom"
import {Metrics} from './Metrics/Metrics'
import {Settings} from './Settings/Settings'
import {history} from "../../../utils/history"

export const AgencyDashboard = () => {
    if (history.location.pathname === '/admin-panel/agency-dashboard' || history.location.pathname === '/admin-panel/agency-dashboard/') {
        history.push('/admin-panel/agency-dashboard/metrics')
    }

    return (<section className={'agency-dashboard'}>
        <div className="tabs">
            <NavLink to={`/admin-panel/agency-dashboard/metrics`}>
                Metrics
            </NavLink>

            <NavLink to={`/admin-panel/agency-dashboard/settings`}>
                Settings
            </NavLink>
        </div>

        <Route path={`/admin-panel/agency-dashboard/metrics`} component={Metrics}/>
        <Route path={`/admin-panel/agency-dashboard/settings`} component={Settings}/>

    </section>)
}