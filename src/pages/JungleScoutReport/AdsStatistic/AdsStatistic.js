import React, {useState} from "react"
import {MetricItem} from "../components/MetricItem/MetricItem"
import _ from "lodash"
import {analyticsAvailableMetricsList, metricKeys} from "../../AnalyticsV3/components/MainMetrics/metricsList"
import {LineChart} from "../components/LineChart/LineChart"
import {PieChart} from "../components/PieChart/PieChart"
import {TopCampaigns} from "./TopCampaigns"

const metrics = [
    metricKeys['impressions'],
    metricKeys['clicks'],
    metricKeys['ctr'],
    metricKeys['cpc'],
    metricKeys['cost'],
    metricKeys['acos'],
    metricKeys['conversion_rate']
]

export const AdsStatistic = () => {
    const [activeMetrics, setActiveMetric] = useState([metrics[0], metrics[1]])

    return (<section className={'account-statistic'}>
        <div className="metrics-list">
            {metrics.map(i => <MetricItem
                key={i}
                metric={{
                    ..._.find(analyticsAvailableMetricsList, {key: i}),
                }}
                activeMetrics={activeMetrics}
            />)}
        </div>

        <LineChart
            data={[]}
            activeMetrics={activeMetrics}
            showWeekChart={true}
            showDailyChart={true}
        />

        <div className="pie-charts-row">
            <PieChart/>

            <PieChart/>
        </div>

        <TopCampaigns/>
    </section>)
}