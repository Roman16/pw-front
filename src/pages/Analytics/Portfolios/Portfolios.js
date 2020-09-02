import React from "react"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import MainChart from "../components/MainChart/MainChart"
import PortfoliosList from './PortfoliosList/PortfoliosList'

const Portfolios = () => {

    return (
        <div className={'portfolios-workplace'}>
            <MainMetrics/>

            <MainChart/>

            <PortfoliosList/>
        </div>
    )
}

export default Portfolios