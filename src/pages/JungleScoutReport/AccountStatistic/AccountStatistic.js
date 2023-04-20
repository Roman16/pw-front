import React, {useState} from "react"
import {analyticsAvailableMetricsList, metricKeys} from "../../AnalyticsV3/components/MainMetrics/metricsList"
import {MetricItem} from "../components/MetricItem/MetricItem"
import _ from "lodash"
import {LineChart} from "../components/LineChart/LineChart"
import {PieChart} from "../components/PieChart/PieChart"
import {Comment} from "../components/Comment/Comment"

const metrics = [
    metricKeys['total_sales'],
    metricKeys['total_orders'],
    metricKeys['cost'],
    metricKeys['ad_orders'],
    metricKeys['cpa'],
    metricKeys['macos'],
    metricKeys['acos']
]


export const AccountStatistic = ({data}) => {
    const [activeMetrics, setActiveMetric] = useState([metrics[0], metrics[1]])

    const selectMetricHandler = (metric) => {
        if (activeMetrics.includes(metric)) {
            setActiveMetric(prevState => prevState.filter(i => i !== metric))
        } else if (activeMetrics.length < 4) {
            setActiveMetric([...activeMetrics, metric])
        }
    }

    return (<section className={'account-statistic'}>
        <Comment/>

        <div className="metrics-list">
            {metrics.map(i => <MetricItem
                key={i}
                metric={{
                    ..._.find(analyticsAvailableMetricsList, {key: i}),
                }}
                activeMetrics={activeMetrics}

                onSelect={selectMetricHandler}
            />)}
        </div>

        <Comment/>

        <LineChart
            data={data.chart}
            activeMetrics={activeMetrics}
            showWeekChart={true}
            showDailyChart={false}
        />

        <Comment/>

        <div className="pie-charts-row">
            <PieChart/>

            <PieChart/>
        </div>
    </section>)
}