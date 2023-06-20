import React, {useState} from "react"
import {analyticsAvailableMetricsList, metricKeys} from "../../AnalyticsV3/components/MainMetrics/metricsList"
import {MetricItem} from "../components/MetricItem/MetricItem"
import _ from "lodash"
import {LineChart} from "../components/LineChart/LineChart"
import {PieChart} from "../components/PieChart/PieChart"
import {Comment} from "../components/Comment/Comment"
import {diffPercent} from "../../AnalyticsV3/components/RenderPageParts/RenderPageParts"
import {SectionName} from "../components/SectionName/SectionName"

const availableMetrics = [
    metricKeys['total_sales'],
    metricKeys['total_orders'],
    metricKeys['cost'],
    metricKeys['ad_orders'],
    metricKeys['cpa'],
    // metricKeys['macos'],
    // metricKeys['acos']
]


export const AccountStatistic = ({
                                     data: {metrics, previous_month_metrics, chart, total_orders_count, total_sales, advertising_type_distribution},
                                     comments: {common_metrics_comment, product_distribution_comment},
                                     editable = false,
                                     onChange
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
        <SectionName
            name={'Total Metrics'}
            description={'Overall productivity and efficiency indicators of your business'}
        />

        <Comment
            text={common_metrics_comment}
            editable={editable}
            onChange={(value) => onChange({common_metrics_comment: value})}
        />

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

        <SectionName
            name={'Revenue Share by Product'}
            description={'Watch the performance of own products compared to Total Sales.(Watch which products require the most attention to increase their effectiveness.)'}
        />

        <Comment
            text={product_distribution_comment}
            editable={editable}
            onChange={(value) => onChange({product_distribution_comment: value})}
        />

        <div className="pie-charts-row">
            <PieChart
                data={total_orders_count}
                nameKey={'product_name'}
                dataKey={'total_orders_count'}
                fill={'#6959AB'}
            />

            <PieChart
                data={total_sales}
                nameKey={'product_name'}
                dataKey={'total_sales'}
                fill={'#46435C'}
            />

            <PieChart
                data={advertising_type_distribution}
                dataKey={'attributedConversions'}
                nameKey={'advertisingType'}
                fill={'#FFAF52'}
            />
        </div>
    </section>)
}