import React from "react"
import MainChart from "../components/MainChart/MainChart"
import PortfoliosList from './PortfoliosList/PortfoliosList'
import MainMetrics from "../components/MainMetrics/MainMetrics"
import {metricsKeysWithoutOrganic} from "../components/MainMetrics/metricsList"
import CreatePortfolioWindow from "./CreatePortfolioWindow/CreatePortfolioWindow"

const Portfolios = () => {
    const availableMetrics = [...metricsKeysWithoutOrganic]
    const location = 'portfolios'

    return (
        <div className={'portfolios-workplace'}>
            <MainMetrics
                allMetrics={availableMetrics}
                location={location}
            />

            <MainChart
                location={location}
                allMetrics={availableMetrics}
            />

            <PortfoliosList
                location={location}
            />

            <CreatePortfolioWindow/>
        </div>
    )
}

export default Portfolios
