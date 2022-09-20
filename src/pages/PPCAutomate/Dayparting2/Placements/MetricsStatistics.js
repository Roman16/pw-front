import React, {Fragment} from "react"
import {chartColors} from "./Placements"
import {SVG} from "../../../../utils/icons"
import {round} from "../../../../utils/round"
import {CurrencyWithCode} from "../../../../components/CurrencyCode/CurrencyCode"
import {numberMask} from "../../../../utils/numberMask"
import {metricKeys} from "../../../Analytics/componentsV2/MainMetrics/metricsList"

const statisticParams = [
    {
        title: 'Top of search',
        key: 'Top of Search on-Amazon'
    },
    {
        title: 'Product pages',
        key: 'Detail Page on-Amazon'
    },
    {
        title: 'Rest of search',
        key: 'Other on-Amazon'
    },
]


export const metrics = [
    {
        title: 'Clicks',
        key: 'clicks'
    },
    {
        title: 'CTR',
        key: 'ctr'
    },
    {
        title: 'ACoS',
        key: 'acos'
    },
    {
        title: 'Orders',
        key: 'orders'
    },
    {
        title: 'Spend',
        key: 'spend'
    },
    {
        title: 'Sales',
        key: 'sales'
    },
    {
        title: 'Impressions',
        key: 'impressions'
    },

]

export const MetricsStatistics = ({data}) => {

    return (
        <div className='metrics-statistics'>
            <div className="row metrics-name">
                <div>Description</div>

                {metrics.map(item => (
                    <div key={item.key}>{item.title}</div>
                ))}
            </div>

            {statisticParams.map((item, index) => {
                const metricValues = data[item.key] || null

                return (
                    <div className="row" key={item.key}>
                        <div className="parameter-name">
                            <div style={{background: chartColors[index].stroke}}/>
                            {item.title}
                        </div>

                        {metricValues ? <Fragment>
                                {metrics.map(item => (
                                    <div className={'value'}>
                                        <div className={'upward-changes'}>
                                            <i>
                                                <SVG id='upward-metric-changes'/>
                                            </i>
                                        </div>

                                        <MetricValue
                                            key={item.key}
                                            metric={metricValues[item.key]}
                                            type={item.key}
                                        />
                                    </div>
                                ))}
                            </Fragment>
                            :
                            <Fragment>
                                {metrics.map(item => (<div className={'value'}>
                                        <div className={'upward-changes'}>
                                            <i>
                                                <SVG id='upward-metric-changes'/>
                                            </i>
                                        </div>

                                        <MetricValue
                                            key={item.key}
                                            metric={{diff: null, value: 100}}
                                            type={item.key}
                                        />
                                    </div>
                                ))}
                            </Fragment>}
                    </div>
                )
            })}
        </div>
    )
}

const MetricValue = ({metric = {}, type}) => {
    if (metric.diff) {
        if (metric.key === 'acos') {
            return (
                <>
                    {+metric.diff === 0 ? <div/> : <SVG id={metric.diff > 0 ? 'down-red-arrow' : 'up-green-arrow'}/>}
                    {metric.value == null ? 'NaN' : type === 'ctr' || type === 'acos' ? `${round(metric.value, 2)}%` : (type === 'spend' || type === 'sales' ?
                        <CurrencyWithCode value={numberMask(metric.value, 0)}/> : metric.value)}
                </>
            )
        } else {
            return (
                <>
                    {+metric.diff === 0 ? <div/> : <SVG id={metric.diff > 0 ? 'up-green-arrow' : 'down-red-arrow'}/>}
                    {metric.value == null ? 'NaN' : type === 'ctr' || type === 'acos' ? `${round(metric.value, 2)}%` : (type === 'spend' || type === 'sales' ?
                        <CurrencyWithCode value={numberMask(metric.value, 0)}/> : metric.value)}
                </>
            )
        }
    } else {
        return (
            <>
                {metric.value == null ? 'NaN' : type === 'ctr' || type === 'acos' ? `${round(metric.value, 2)}%` : (type === 'spend' || type === 'sales' ?
                    <CurrencyWithCode value={numberMask(metric.value, 0)}/> : metric.value)}
            </>
        )
    }
}
