import React from "react";
import {NavLink, Route} from "react-router-dom";
import './Navigation.less';

import Information from '../Information/Information';
import ApiConnection from '../ApiConnection/ApiConnection';
import Subscription from '../Subscription/Subscription';

const Navigation = (props) => {
    return (
        <>
            <div className="account-navigation">
                <div className="container">
                    <div className="cabinet-nav">
                        <NavLink
                            className="page-link"
                            exact
                            to="/account/settings"
                        >
                            Account information
                        </NavLink>

                        <NavLink
                            className="page-link"
                            exact
                            to="/account/subscription"

                        >
                            Subscriptions
                        </NavLink>

                        <NavLink
                            className="page-link"
                            exact
                            to="/account/api-connections"
                        >
                            API Connections
                        </NavLink>
                    </div>


                    <input
                        type="radio"
                        name="slideItem"
                        id={`slide-item-1`}
                        className="slide-toggle"
                        checked={props.location.pathname === '/account/settings'}
                    />

                    <input
                        type="radio"
                        name="slideItem"
                        id={`slide-item-2`}
                        className="slide-toggle"
                        checked={props.location.pathname === '/account/subscription'}
                    />


                    <input
                        type="radio"
                        name="slideItem"
                        id={`slide-item-3`}
                        className="slide-toggle"
                        checked={props.location.pathname === '/account/api-connections'}
                    />

                    <div className="slider">
                        <div className="bar"/>
                    </div>
                </div>
            </div>

            <Route exact path="/account/settings" component={Information}/>
            <Route exact path="/account/api-connections" component={ApiConnection}/>
            <Route exact path="/account/subscription" component={Subscription}/>
        </>
    );
};

export default React.memo(Navigation);
