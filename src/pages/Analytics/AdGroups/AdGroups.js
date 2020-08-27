import React from "react";
import Metrics from "../../PPCAutomate/Dashboard/Metrics/Metrics";
import LineChart from "../../PPCAutomate/Dashboard/MainChart/MainChart";
import AdGroupsList from "./AdGroupsList/AdGroupsList";

const AdGroups = () => {

    return (
        <div className={'ad-groups-section'}>
            <Metrics/>

            <LineChart/>

            <AdGroupsList/>
        </div>
    )
};

export default AdGroups;