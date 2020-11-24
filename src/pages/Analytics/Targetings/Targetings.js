import React from "react"
import MainChart from "../components/MainChart/MainChart"
import TargetingsList from "./TargetingsList/TargetingsList"
import Metrics from "./Metrics/Metrics"

const Targetings = () => {

    return (
        <div className={'targetings-workplace'}>
            <Metrics/>

            <MainChart/>

            <TargetingsList/>
        </div>
    )
}

export default Targetings
