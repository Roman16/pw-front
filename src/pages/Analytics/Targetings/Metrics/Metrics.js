import React from "react"
import MainMetrics from "../../components/MainMetrics/MainMetrics"
import {metricsKeysWithoutOrganic} from '../../components/MainMetrics/metricsList'
import _ from 'lodash'

const Metrics = () => {
    const availableMetrics = _.filter([...metricsKeysWithoutOrganic], v => v !== 'ad_profit')

    return (
        <MainMetrics
            allMetrics={availableMetrics}
        />
    )
}

export default Metrics
