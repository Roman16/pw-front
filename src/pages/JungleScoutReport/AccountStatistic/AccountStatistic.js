import React, {useState} from "react"
import {analyticsAvailableMetricsList, metricKeys} from "../../AnalyticsV3/components/MainMetrics/metricsList"
import {MetricItem} from "../components/MetricItem/MetricItem"
import _ from "lodash"
import {LineChart} from "../components/LineChart/LineChart"
import {PieChart} from "../components/PieChart/PieChart"
import {Comment} from "../components/Comment/Comment"
import {diffPercent} from "../../AnalyticsV3/components/RenderPageParts/RenderPageParts"

const availableMetrics = [
    metricKeys['total_sales'],
    metricKeys['total_orders'],
    metricKeys['cost'],
    metricKeys['ad_orders'],
    metricKeys['cpa'],
    metricKeys['macos'],
    metricKeys['acos']
]


export const AccountStatistic = ({
                                     data: {metrics, previous_month_metrics, chart, total_orders_count, total_sales},
                                     comments: {common_metrics_comment, product_distribution_comment}
                                 }) => {
    const [activeMetrics, setActiveMetric] = useState([availableMetrics[0], availableMetrics[1]])

    const selectMetricHandler = (metric) => {
        if (activeMetrics.includes(metric)) {
            setActiveMetric(prevState => prevState.filter(i => i !== metric))
        } else if (activeMetrics.length < 4) {
            setActiveMetric([...activeMetrics, metric])
        }
    }

    return (<section className={'account-statistic'}>
        <Comment text={common_metrics_comment}/>

        <div className="metrics-list">
            {availableMetrics.map(i => <MetricItem
                key={i}
                metric={{
                    ..._.find(analyticsAvailableMetricsList, {key: i}),
                    value: metrics[i],
                    value_prev: previous_month_metrics[i],
                    value_diff: diffPercent(previous_month_metrics[i], metrics[i])
                }}
                activeMetrics={activeMetrics}

                onSelect={selectMetricHandler}
            />)}
        </div>

        <LineChart
            data={chart}
            activeMetrics={activeMetrics}
            showWeekChart={true}
            showDailyChart={true}
        />

        <Comment text={product_distribution_comment}/>

        <div className="pie-charts-row">
            <PieChart
                data={total_orders_count}
                dataKey={'total_orders_count'}
            />

            <PieChart
                data={total_sales}
                dataKey={'total_sales'}
            />
        </div>
    </section>)
}