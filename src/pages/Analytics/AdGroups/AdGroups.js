import React from "react";
import LineChart from "../../PPCAutomate/Dashboard/MainChart/MainChart";
import AdGroupsList from "./AdGroupsList/AdGroupsList";
import MainMetrics from "../components/MainMetrics/MainMetrics";

const AdGroups = () => {

    return (
        <div className={'ad-groups-section'}>
            <MainMetrics/>

            <LineChart/>

            <AdGroupsList/>
        </div>
    )
};

export default AdGroups;