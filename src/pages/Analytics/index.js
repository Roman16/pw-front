import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header";

const Analytics = (props) => {

    return (
        <div className="analytics-page">
            <Header/>

            <Navigation/>

            <section className="workplace">
                {props.children}
            </section>
        </div>
    )
};

export default Analytics;