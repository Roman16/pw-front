import React from "react"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import MainChart from "../components/MainChart/MainChart"
import TargetingsList from "./TargetingsList/TargetingsList"

const Targetings = () => {

    return (
        <div className={'targetings-workplace'}>
            <MainMetrics/>

            <MainChart/>

            <TargetingsList/>
        </div>
    )
}

export default Targetings