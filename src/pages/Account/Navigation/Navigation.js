import React from "react";
import { NavLink } from "react-router-dom";

import "./Navigation.less";

const Navigation = () => {
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
