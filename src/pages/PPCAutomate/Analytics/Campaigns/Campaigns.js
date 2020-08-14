import React from "react";
import Metrics from "../../Dashboard/Metrics/Metrics";
import LineChart from "../../Dashboard/MainChart/MainChart";
import CampaignsList from "./CampaignsList/CampaignsList";

const Campaigns = () => {

    return (
        <div className={'campaigns-section'}>
            <Metrics/>

            <LineChart/>

            <CampaignsList/>
        </div>
    )
};

export default Campaigns;