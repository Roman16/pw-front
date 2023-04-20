import React, {useState} from "react"
import {MetricItem} from "../components/MetricItem/MetricItem"
import _ from "lodash"
import {analyticsAvailableMetricsList, metricKeys} from "../../AnalyticsV3/components/MainMetrics/metricsList"
import {LineChart} from "../components/LineChart/LineChart"
import {PieChart} from "../components/PieChart/PieChart"
import {TopCampaigns} from "./TopCampaigns"
import {Comment} from "../components/Comment/Comment"
import {diffPercent} from "../../AnalyticsV3/components/RenderPageParts/RenderPageParts"

const availableMetrics = [
    metricKeys['impressions'],
    metricKeys['clicks'],
    metricKeys['ctr'],
    metricKeys['cpc'],
    metricKeys['cost'],
    metricKeys['acos'],
    metricKeys['conversion_rate']
]

export const AdsStatistic = ({data: {metrics, previous_month_metrics, chart}, comments: {advertising_metrics_comment}}) => {
    const [activeMetrics, setActiveMetric] = useState([availableMetrics[0], availableMetrics[1]])


    const selectMetricHandler = (metric) => {
        if (activeMetrics.includes(metric)) {
            setActiveMetric(prevState => prevState.filter(i => i !== metric))
        } else if (activeMetrics.length < 4) {
            setActiveMetric([...activeMetrics, metric])
        }
    }


    return (<section className={'account-statistic'}>
        <Comment text={advertising_metrics_comment}/>

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

        <Comment/>

        <div className="pie-charts-row">
            <PieChart
                data={[]}
                dataKey={''}
            />

            <PieChart
                data={[]}
                dataKey={''}
            />
        </div>

        <Comment/>

        <TopCampaigns/>
    </section>)
}