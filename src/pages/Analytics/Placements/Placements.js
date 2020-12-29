import React from "react"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import MainChart from "../components/MainChart/MainChart"
import PlacementsList from "./PlacementsList/PlacementsList"
import PlacementsStatistics from "./PlacementsStatistics/PlacementsStatistics"
import {metricsKeysWithoutOrganic} from "../components/MainMetrics/metricsList"

const Placements = () => {
    const availableMetrics = [...metricsKeysWithoutOrganic]
    const location = 'placements'

    return (
        <div className={'placements-workplace'}>
            <MainMetrics
                allMetrics={availableMetrics}
                location={location}
            />

            <MainChart
                allMetrics={availableMetrics}
                location={location}
            />

            <PlacementsStatistics/>

            <PlacementsList location={location}/>
        </div>
    )
}

export default Placements
