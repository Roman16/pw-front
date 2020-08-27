import React from "react";
import LineChart from "../../PPCAutomate/Dashboard/MainChart/MainChart";
import CampaignsList from "./CampaignsList/CampaignsList";
import MainMetrics from "../components/MainMetrics/MainMetrics";

const Campaigns = () => {

    return (
        <div className={'campaigns-section'}>
            <MainMetrics/>

            <LineChart/>

            <CampaignsList/>
        </div>
    )
};

export default Campaigns;