import React from "react"
import MainChart from "../components/MainChart/MainChart"
import PortfoliosList from './PortfoliosList/PortfoliosList'
import Metrics from "./Metrics/Metrics"

const Portfolios = () => {

    return (
        <div className={'portfolios-workplace'}>
            <Metrics/>

            <MainChart/>

            <PortfoliosList/>
        </div>
    )
}

export default Portfolios
