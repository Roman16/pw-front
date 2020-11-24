import React from "react"
import MainMetrics from "../../components/MainMetrics/MainMetrics"
import {metricsKeysWithoutOrganic} from '../../components/MainMetrics/metricsList'

const Metrics = () => {
    const availableMetrics = [...metricsKeysWithoutOrganic]

    return (
        <MainMetrics
            allMetrics={availableMetrics}
        />
    )
}

export default Metrics
