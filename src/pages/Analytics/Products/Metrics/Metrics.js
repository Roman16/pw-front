import React from "react"
import MainMetrics from "../../components/MainMetrics/MainMetrics"
import {metricKeys} from '../../components/MainMetrics/metricsList'

const Metrics = () => {
    const availableMetrics = Object.values(metricKeys)

    return (
        <MainMetrics
            allMetrics={availableMetrics}
        />
    )
}

export default Metrics
