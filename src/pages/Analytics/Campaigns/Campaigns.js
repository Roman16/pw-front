import React from "react"
import CampaignsList from "./CampaignsList/CampaignsList"
import MainChart from "../components/MainChart/MainChart"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import {metricsKeysWithoutOrganic} from "../components/MainMetrics/metricsList"
import CreateCampaignWindow from "./CreateCampaignWindow/CreateCampaignWindow"

const Campaigns = () => {
    const availableMetrics = [...metricsKeysWithoutOrganic]
    const location = 'campaigns'

    return (
        <div className={'campaigns-workplace'}>
            <MainMetrics
                allMetrics={availableMetrics}
                location={location}
            />

            <MainChart
                location={location}
                allMetrics={availableMetrics}
            />

            <CampaignsList
                location={location}
            />

            <CreateCampaignWindow/>
        </div>
    )
}

export default Campaigns
