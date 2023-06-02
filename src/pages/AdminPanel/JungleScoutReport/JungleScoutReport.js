import React, {useState} from "react"
import {Accounts} from "./Accounts/Accounts"
import './JungleScoutReport.less'
import {AccountStatistic} from "../../JungleScoutReport/AccountStatistic/AccountStatistic"
import {AdsStatistic} from "../../JungleScoutReport/AdsStatistic/AdsStatistic"
import {JungleScoutStatistic} from "../../JungleScoutReport/JungleScoutStatistic/JungleScoutStatistic"
import '../../JungleScoutReport/JungleScoutReport.less'

export const JungleScoutReport = () => {
    const [reportData, setReportData] = useState({
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
        top_sales_campaigns: [],
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

    return (<div className={'jungle-scout-report-page monthly-report-page'}>
        <Accounts/>

        <div className="work-section">
            <div className="container">

                <AccountStatistic
                    data={{
                        ...reportData.common_metrics, ...reportData.product_distribution,
                        advertising_type_distribution: reportData.advertising_type_distribution
                    }}
                    comments={reportData.comments}
                />

                <AdsStatistic
                    data={{...reportData.advertising_metrics, ...reportData}}
                    comments={reportData.comments}
                />

                <JungleScoutStatistic
                    data={reportData}
                    comments={reportData.comments}
                />
            </div>
        </div>
    </div>)
}