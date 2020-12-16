import React from "react"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import MainChart from "../components/MainChart/MainChart"
import PlacementsList from "./PlacementsList/PlacementsList"
import PlacementsStatistics from "./PlacementsStatistics/PlacementsStatistics"

const Placements = () => {
    const location = 'placements'

    return (
        <div className={'placements-workplace'}>
            <MainMetrics location={location}/>

            <MainChart/>

            <PlacementsStatistics/>

            <PlacementsList/>
        </div>
    )
}

export default Placements
