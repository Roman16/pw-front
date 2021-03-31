import React from "react"
import AdGroupsList from "./AdGroupsList/AdGroupsList"
import MainChart from "../../components/MainChart/MainChart"
import {metricsKeysWithoutOrganic} from "../../components/MainMetrics/metricsList"
import MainMetrics from "../../components/MainMetrics/MainMetrics"

const AdGroups = () => {
    const availableMetrics = [...metricsKeysWithoutOrganic]
    const location = 'ad-groups'

    return (
        <div className={'ad-groups-workplace'}>
            <MainMetrics
                allMetrics={availableMetrics}
                location={location}
            />

            <MainChart
                location={location}
                allMetrics={availableMetrics}
            />

            <AdGroupsList
                location={location}
            />

        </div>
    )
}

export default AdGroups
