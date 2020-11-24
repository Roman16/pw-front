import React from "react"
import AdGroupsList from "./AdGroupsList/AdGroupsList"
import MainChart from "../components/MainChart/MainChart"
import Metrics from "./Metrics/Metrics"

const AdGroups = () => {

    return (
        <div className={'ad-groups-workplace'}>
            <Metrics/>

            <MainChart/>

            <AdGroupsList/>
        </div>
    )
}

export default AdGroups
