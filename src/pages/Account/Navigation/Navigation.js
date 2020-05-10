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
                <div className="border"/>
            </li>

            <li className={`current-page ${page === 'subscriptions' ? 'current-page-link' : ''}`}>
                <NavLink
                    className="page-link"
                    exact
                    to="/account-subscription"
                >
                    Subscriptions
                </NavLink>
                <div className="border"/>
            </li>

            <li className={`current-page ${page === 'api_connections' ? 'current-page-link' : ''}`}>
                <NavLink
                    className="page-link"
                    exact
                    to="/api-connections"
                >
                    API Connections
                </NavLink>

                <div className="border"/>
            </li>
        </ul>
    );
};

export default Navigation;
