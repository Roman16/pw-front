import React from "react";
import {NavLink} from "react-router-dom";
import "./Navigation.less";

const Navigation = ({page}) => {
    return (
        <ul className="cabinet-nav">
            <li className={`current-page ${page === 'information' ? 'current-page-link' : ''}`}>
                <NavLink
                    className="page-link"
                    exact
                    to="/account-settings"
                >
                    Account information
                </NavLink>
            </li>

            <li className={`current-page ${page === 'subscriptions' ? 'current-page-link' : ''}`}>
                <NavLink
                    className="page-link"
                    exact
                    to="/account-subscription"
                >
                    Subscriptions
                </NavLink>
            </li>

            <li className={`current-page ${page === 'api_connections' ? 'current-page-link' : ''}`}>
                <NavLink
                    className="page-link"
                    exact
                    to="/account-subscription"
                >
                    API Connection
                </NavLink>
            </li>
        </ul>
    );
};

export default Navigation;
