import React, {useState} from "react"
import {analyticsAvailableMetricsList, metricKeys} from "../../AnalyticsV3/components/MainMetrics/metricsList"
import {MetricItem} from "../components/MetricItem/MetricItem"
import _ from "lodash"
import {LineChart} from "../components/LineChart/LineChart"
import {PieChart} from "../components/PieChart/PieChart"

const metrics = [
    metricKeys['total_sales'],
    metricKeys['total_orders'],
    metricKeys['cost'],
    metricKeys['ad_orders'],
    metricKeys['cpa'],
    metricKeys['macos'],
    metricKeys['acos']
]

export const AccountStatistic = ({}) => {
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
    </section>)
}