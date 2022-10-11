import React, {Fragment} from "react"
import {chartColors} from "./Placements"
import {SVG} from "../../../utils/icons"
import {round} from "../../../utils/round"
import {CurrencyWithCode} from "../../../components/CurrencyCode/CurrencyCode"
import {numberMask} from "../../../utils/numberMask"
import {analyticsAvailableMetricsList, metricKeys} from "../../Analytics/componentsV2/MainMetrics/metricsList"
import {MetricDiff, renderMetricValue} from "../HourDayStatistics/HourDayStatistics"
import _ from "lodash"

const statisticParams = [
    {
        title: 'Top of search',
        key: 'top_of_search'
    },
    {
        title: 'Product pages',
        key: 'detail_page'
    },
    {
        title: 'Rest of search',
        key: 'other'
    },
]


export const metrics = [
    {
        title: 'Clicks',
        key: 'clicks'
    },
    // {
    //     title: 'CTR',
    //     key: 'ctr'
    // },
    // {
    //     title: 'ACoS',
    //     key: 'acos'
    // },
    {
        title: 'Ad Orders',
        key: 'attributedConversions'
    },
    {
        title: 'Spend',
        key: 'cost'
    },
    {
        title: 'Ad Sales',
        key: 'attributedSales'
    },
    {
        title: 'Ad Units',
        key: 'attributedUnitsOrdered'
    },
    {
        title: 'Impressions',
        key: 'impressions'
    },

]

export const MetricsStatistics = ({data, comparedData}) => {

    return (
        <div className='metrics-statistics'>
            <div className="row metrics-name">
                <div>Description</div>

                {metrics.map(item => (
                    <div key={item.key}>{item.title}</div>
                ))}
            </div>

            {statisticParams.map((item, index) => {
                return (
                    <div className="row" key={item.key}>
                        <div className="parameter-name">
                            <svg width="13" height="8" viewBox="0 0 13 8" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.59091 4C8.59091 5.38071 7.45127 6.5 6.04545 6.5C4.63964 6.5 3.5 5.38071 3.5 4C3.5 2.61929 4.63964 1.5 6.04545 1.5C7.45127 1.5 8.59091 2.61929 8.59091 4Z"
                                />
                                <path
                                    d="M8.59091 4C8.59091 5.38071 7.45127 6.5 6.04545 6.5C4.63964 6.5 3.5 5.38071 3.5 4M8.59091 4C8.59091 2.61929 7.45127 1.5 6.04545 1.5C4.63964 1.5 3.5 2.61929 3.5 4M8.59091 4H12.0455M3.5 4H0"
                                    stroke={chartColors[index].stroke} stroke-width="1.5"/>
                            </svg>

                            {item.title}
                        </div>

                        {metrics.map(metric => (
                            <div className="value">
                                {renderMetricValue({value: data[item.key]?.[metric.key], metric: metric.key, numberCut: 2})}

                                {comparedData && <MetricDiff
                                    value={data[item.key]?.[metric.key]}
                                    prevValue={comparedData[item.key]?.[metric.key]}
                                    metricType={_.find(analyticsAvailableMetricsList, {key: metric.key}).type}
                                />}
                            </div>
                        ))}
                    </div>
                )
            })}
        </div>
    )
}
