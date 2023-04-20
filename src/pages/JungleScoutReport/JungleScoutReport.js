import React, {useEffect, useState} from "react"
import './JungleScoutReport.less'
import {AccountStatistic} from "./AccountStatistic/AccountStatistic"
import {AdsStatistic} from "./AdsStatistic/AdsStatistic"
import {JungleScoutStatistic} from "./JungleScoutStatistic/JungleScoutStatistic"
import {Reports} from "./components/Reports/Reports"
import {jungleScoutReportServices} from "../../services/jungle.scout.report.services"

const JungleScoutReport = () => {
    const [selectedReport, setSelectedReport] = useState(),
        [reportData, setReportData] = useState({
            common_metrics: {
                metrics: [],
                previous_month_metrics: [],
                chart: []
            },
            revenue_trend: [],
            brand_sales: [],
            products_revenue: []
        })


    const getReportData = async () => {
        try {
            const {result} = jungleScoutReportServices.getReportData(selectedReport.id)
            console.log(result)
            setReportData(result)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        selectedReport?.id && getReportData()
    }, [selectedReport])

    return (<div className={'monthly-report-page'}>
        <Reports
            selectedReport={selectedReport}

            onSelect={setSelectedReport}
        />

        <div className="work-section">
            <AccountStatistic
                data={reportData.common_metrics}
            />

            <AdsStatistic
                data={reportData}
            />

            <JungleScoutStatistic
                data={reportData}
            />
        </div>
    </div>)
}

export default JungleScoutReport