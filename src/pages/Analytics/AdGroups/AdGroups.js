import React from "react"
import AdGroupsList from "./AdGroupsList/AdGroupsList"
import MainChart from "../components/MainChart/MainChart"
import {metricsKeysWithoutOrganic} from "../components/MainMetrics/metricsList"
import MainMetrics from "../components/MainMetrics/MainMetrics"

const AdGroups = () => {
    const availableMetrics = [...metricsKeysWithoutOrganic]

    return (
        <div className={'ad-groups-workplace'}>
            <MainMetrics allMetrics={availableMetrics}/>

            <MainChart allMetrics={availableMetrics}/>

            <AdGroupsList/>
        </div>
    )
}

export default AdGroups
