import React from "react"
import MainChart from "../components/MainChart/MainChart"
import TargetingsList from "./TargetingsList/TargetingsList"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import _ from "lodash"
import {metricsKeysWithoutOrganic} from "../components/MainMetrics/metricsList"

const Targetings = () => {
    const availableMetrics = _.filter([...metricsKeysWithoutOrganic], v => v !== 'ad_profit')

    return (
        <div className={'targetings-workplace'}>
            <MainMetrics
                allMetrics={availableMetrics}
            />

            <MainChart allMetrics={availableMetrics}/>

            <TargetingsList/>
        </div>
    )
}

export default Targetings
