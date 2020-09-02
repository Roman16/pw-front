import React from "react"
import AdGroupsList from "./AdGroupsList/AdGroupsList"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import MainChart from "../components/MainChart/MainChart"

const AdGroups = () => {

    return (
        <div className={'ad-groups-workplace'}>
            <MainMetrics/>

            <MainChart/>

            <AdGroupsList/>
        </div>
    )
}

export default AdGroups