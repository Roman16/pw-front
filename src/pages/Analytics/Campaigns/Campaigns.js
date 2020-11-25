import React from "react"
import CampaignsList from "./CampaignsList/CampaignsList"
import MainChart from "../components/MainChart/MainChart"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import {metricsKeysWithoutOrganic} from "../components/MainMetrics/metricsList"

const Campaigns = () => {
    const availableMetrics = [...metricsKeysWithoutOrganic]

    return (
        <div className={'campaigns-workplace'}>
            <MainMetrics
                allMetrics={availableMetrics}
            />

            <MainChart allMetrics={availableMetrics}/>

            <CampaignsList/>
        </div>
    )
}

export default Campaigns
