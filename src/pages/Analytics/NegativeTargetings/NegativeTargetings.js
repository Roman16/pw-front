import React from "react"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import MainChart from "../components/MainChart/MainChart"
import NegativeTargetingsList from "./NegativeTargetingsList/NegativeTargetingsList"

const NegativeTargetings = () => {

    return (
        <div className={'negative-targetings-workplace'}>
            <MainMetrics/>

            <MainChart/>

            <NegativeTargetingsList/>
        </div>
    )
}

export default NegativeTargetings