import React from "react"
import MainChart from "../components/MainChart/MainChart"
import PortfoliosList from './PortfoliosList/PortfoliosList'
import MainMetrics from "../components/MainMetrics/MainMetrics"
import {metricsKeysWithoutOrganic} from "../components/MainMetrics/metricsList"

const Portfolios = () => {
    const availableMetrics = [...metricsKeysWithoutOrganic]

    return (
        <div className={'portfolios-workplace'}>
            <MainMetrics
                allMetrics={availableMetrics}
            />

            <MainChart allMetrics={availableMetrics}/>

            <PortfoliosList/>
        </div>
    )
}

export default Portfolios
