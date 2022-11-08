import React from "react"
import {chartColors} from "./Placements"
import {analyticsAvailableMetricsList} from "../../Analytics/componentsV2/MainMetrics/metricsList"
import {MetricDiff, renderMetricValue} from "../HourDayStatistics/HourDayStatistics"
import _ from "lodash"
import CustomTable from "../../../components/Table/CustomTable"
import {numberColumns} from "../../Analytics/components/TableList/tableColumns"
import {Link} from "react-router-dom"
import RenderPageParts from "../../Analytics/componentsV2/RenderPageParts/RenderPageParts"

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
        title: 'Impressions',
        key: 'impressions'
    },
    {
        title: 'Clicks',
        key: 'clicks'
    },
    {
        title: 'Spend',
        key: 'cost'
    },
    {
        title: 'Ad Orders',
        key: 'attributedConversions'
    },
    {
        title: 'Ad Units',
        key: 'attributedUnitsOrdered'
    },
    {
        title: 'Ad Sales',
        key: 'attributedSales'
    },
    {
        title: 'ACOS',
        key: 'acos'
    },
    {
        title: 'ROAS',
        key: 'roas'
    },
    {
        title: 'CTR',
        key: 'ctr'
    },
    {
        title: 'CPC',
        key: 'cpc'
    },
    {
        title: 'CVR',
        key: 'cvr'
    },
    {
        title: 'CPA',
        key: 'cpa'
    },
]

export const getMetricValue = (obj, metric) => {
    switch (metric) {
        case 'acos':
            return (!obj.attributedSales || obj.attributedSales === 0) ? null : obj.cost / obj.attributedSales
        case 'roas':
            return (!obj.cost || obj.cost === 0) ? null : obj.attributedSales / obj.cost
        case 'ctr':
            return (!obj.impressions || obj.impressions === 0) ? null : obj.clicks / obj.impressions
        case 'cpc':
            return (!obj.clicks || obj.clicks === 0) ? null : obj.cost / obj.clicks
        case 'cvr':
            return (!obj.clicks || obj.clicks === 0) ? null : obj.attributedConversions / obj.clicks
        case 'cpa':
            return (!obj.attributedConversions || obj.attributedConversions === 0) ? null : obj.cost / obj.attributedConversions
        default:
            return obj[metric]
    }
}


export const MetricsStatistics = ({data, comparedData}) => {

    const columns = [
        {
            title: 'Description',
            dataIndex: 'title',
            key: 'title',
            width: '200px',
            render: (title, item, index) => (
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

                    {title}
                </div>
            )
        },
        ...metrics.map(metric => ({
            ...metric,
            width: '140px',
            dataIndex: 'key',
            key: 'key',
            align: 'right',
            render: (value) => {
                console.log(data)
                console.log(value)

                return renderMetricValue({
                value: data[value]?.[metric.key],
                metric: metric.key,
                numberCut: 2
            })}
        })
        )
    ]


    return (
        <div className='metrics-statistics'>
            <CustomTable
                dataSource={statisticParams}
                columns={columns}
                fixedColumns={[0]}
            />


            {/*<div className="row metrics-name">*/}
            {/*    <div>Description</div>*/}

            {/*    {metrics.map(item => (*/}
            {/*        <div key={item.key}>{item.title}</div>*/}
            {/*    ))}*/}
            {/*</div>*/}


            {/*{statisticParams.map((item, index) => {*/}
            {/*    return (*/}
            {/*        <div className="row" key={item.key}>*/}
            {/*            <div className="parameter-name">*/}
            {/*                <svg width="13" height="8" viewBox="0 0 13 8" fill="none"*/}
            {/*                     xmlns="http://www.w3.org/2000/svg">*/}
            {/*                    <path*/}
            {/*                        d="M8.59091 4C8.59091 5.38071 7.45127 6.5 6.04545 6.5C4.63964 6.5 3.5 5.38071 3.5 4C3.5 2.61929 4.63964 1.5 6.04545 1.5C7.45127 1.5 8.59091 2.61929 8.59091 4Z"*/}
            {/*                    />*/}
            {/*                    <path*/}
            {/*                        d="M8.59091 4C8.59091 5.38071 7.45127 6.5 6.04545 6.5C4.63964 6.5 3.5 5.38071 3.5 4M8.59091 4C8.59091 2.61929 7.45127 1.5 6.04545 1.5C4.63964 1.5 3.5 2.61929 3.5 4M8.59091 4H12.0455M3.5 4H0"*/}
            {/*                        stroke={chartColors[index].stroke} stroke-width="1.5"/>*/}
            {/*                </svg>*/}

            {/*                {item.title}*/}
            {/*            </div>*/}

            {/*            {metrics.map(metric => (*/}
            {/*                <div className="value">*/}
            {/*                    {renderMetricValue({*/}
            {/*                        value: data[item.key]?.[metric.key],*/}
            {/*                        metric: metric.key,*/}
            {/*                        numberCut: 2*/}
            {/*                    })}*/}

            {/*                    {comparedData && <MetricDiff*/}
            {/*                        value={data[item.key]?.[metric.key]}*/}
            {/*                        prevValue={comparedData[item.key]?.[metric.key]}*/}
            {/*                        metricType={_.find(analyticsAvailableMetricsList, {key: metric.key}).type}*/}
            {/*                    />}*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*})}*/}
        </div>
    )
}
