import React, {useEffect} from "react";
import {useDispatch} from 'react-redux';
import {NavLink} from "react-router-dom";
import {userActions} from "../../../actions/user.actions";
import "./Navigation.less";

const Navigation = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAuthorizedUserInfo());
    }, []);
    return (
        <>
            <ul className="cabinet-nav">
                <li className="current-page">
                    <NavLink
                        className="current-page-link"
                        activeClassName="current-page-link-active"
                        exact
                        to="/account/settings"
                    >
                        Account information
                    </NavLink>
                </li>
                <li className="current-page">
                    <NavLink
                        className="current-page-link"
                        activeClassName="current-page-link-active"
                        exact
                        to="/account/billing"
                    >
                        Billing information
                    </NavLink>
                </li>
                <li className="current-page">
                    <NavLink
                        className="current-page-link"
                        activeClassName="current-page-link-active"
                        exact
                        to="/account/subscription"
                    >
                        Subscriptions
                    </NavLink>
                </li>
            </ul>
        </>
    );
};

export default Navigation;
