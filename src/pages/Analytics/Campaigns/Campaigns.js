import React from "react"
import CampaignsList from "./CampaignsList/CampaignsList"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import MainChart from "../components/MainChart/MainChart"

const Campaigns = () => {

    return (
        <div className={'campaigns-section'}>
            <MainMetrics/>

            <MainChart/>

            <CampaignsList/>
        </div>
    )
}

export default Campaigns