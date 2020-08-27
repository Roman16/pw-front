import React, {memo} from "react";
import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header";
import {Redirect, Route} from "react-router-dom";
import Campaigns from "./Campaigns/Campaigns";
import AdGroups from "./AdGroups/AdGroups";


const Analytics = (props) => {

    return (
        <div className="analytics-page">
            <Header
                location={props.location}
            />

            <Navigation/>

            <section className="workplace">
                {props.location.pathname === '/analytics' && <Redirect to={'/analytics/campaigns'}/>}

                <Route exact path="/analytics/campaigns" component={Campaigns}/>
                <Route exact path="/analytics/ad-groups" component={AdGroups}/>
            </section>
        </div>
    )
};

export default memo(Analytics);