import React from "react";
import Metrics from "../../PPCAutomate/Dashboard/Metrics/Metrics";
import LineChart from "../../PPCAutomate/Dashboard/MainChart/MainChart";
import CampaignsList from "./CampaignsList/CampaignsList";

const AdGroups = () => {

    return (
        <div className={'ad-groups-section'}>
            <Metrics/>

            <LineChart/>

            <CampaignsList/>
        </div>
    )
};

export default AdGroups;