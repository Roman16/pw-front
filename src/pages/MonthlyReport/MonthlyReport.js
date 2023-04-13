import React from "react"
import './MonthlyReport.less'
import {AccountStatistic} from "./AccountStatistic/AccountStatistic"
import {AdsStatistic} from "./AdsStatistic/AdsStatistic"
import {JungleScoutStatistic} from "./JungleScoutStatistic/JungleScoutStatistic"

const MonthlyReport = () => {


    return (<div className={'monthly-report-page'}>
        <AccountStatistic/>

        <AdsStatistic/>

        <JungleScoutStatistic/>
    </div>)
}

export default MonthlyReport