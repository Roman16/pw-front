import React, {useEffect, useState} from "react"
import './JungleScoutReport.less'
import {AccountStatistic} from "./AccountStatistic/AccountStatistic"
import {AdsStatistic} from "./AdsStatistic/AdsStatistic"
import {JungleScoutStatistic} from "./JungleScoutStatistic/JungleScoutStatistic"
import {Reports} from "./components/Reports/Reports"
import {jungleScoutReportServices} from "../../services/jungle.scout.report.services"
import RouteLoader from "../../components/RouteLoader/RouteLoader"

const JungleScoutReport = () => {
    const [selectedReport, setSelectedReport] = useState({id: undefined}),
        [processing, setProcessing] = useState(true),
        [reportData, setReportData] = useState({
            //1 section
            common_metrics: {
                metrics: [],
                previous_month_metrics: [],
                chart: []
            },
            product_distribution: {
                total_orders_count: [],
                total_sales: [],
            },
            //2 section
            advertising_metrics: {
                metrics: [],
                previous_month_metrics: [],
                chart: []
            },
            advertising_type_distribution: [],
            //3 section
            revenue_trend: [],
            brand_sales: [],
            products_revenue: [],
            //-------------------------------------------------
            comments: {
                advertising_metrics_comment: '',
                advertising_type_distribution_comment: '',
                brand_sales_comment: '',
                common_metrics_comment: '',
                product_distribution_comment: '',
                products_revenue_comment: '',
                revenue_trend_comment: '',
                top_sales_campaigns_comment: ''
            }
        })


    const getReportData = async () => {
        setProcessing(true)

        try {
            const {result} = await jungleScoutReportServices.getReportData(selectedReport.id)
            setReportData(result)
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    useEffect(() => {
        if (selectedReport.id) {
            getReportData()
        } else if (selectedReport.id === null) {
            setProcessing(false)
        }
    }, [selectedReport])

    return (<div className={'monthly-report-page'}>
        <Reports
            selectedReport={selectedReport}

            onSelect={setSelectedReport}
        />

        <div className="work-section">
            <div className="container">
                <AccountStatistic
                    data={{...reportData.common_metrics, ...reportData.product_distribution}}
                    comments={reportData.comments}
                />

                <AdsStatistic
                    data={{...reportData.advertising_metrics}}
                    comments={reportData.comments}
                />

                <JungleScoutStatistic
                    data={reportData}
                />

                {processing && <RouteLoader/>}
            </div>
        </div>
    </div>)
}

export default JungleScoutReport