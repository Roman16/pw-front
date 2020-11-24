import React from "react"
import CampaignsList from "./CampaignsList/CampaignsList"
import MainChart from "../components/MainChart/MainChart"
import Metrics from "./Metrics/Metrics"

const Campaigns = () => {

    return (
        <div className={'campaigns-workplace'}>
            <Metrics/>

            <MainChart/>

            <CampaignsList/>
        </div>
    )
}

export default Campaigns
