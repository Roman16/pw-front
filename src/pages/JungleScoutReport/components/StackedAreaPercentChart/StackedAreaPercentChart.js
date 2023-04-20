import React from "react"
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import moment from "moment"
import {chartAreaKeys} from "../../../AnalyticsV3/Placements/PlacementsStatistics/Chart"
import {round} from "../../../../utils/round"
import {days} from "../../../AnalyticsV3/components/MainChart/ChartTooltip"
import _ from "lodash"
import {RenderMetricValue} from "../../../AnalyticsV3/components/TableList/tableColumns"
import {analyticsAvailableMetricsList} from "../../../AnalyticsV3/components/MainMetrics/metricsList"
import CustomSelect from "../../../../components/Select/Select"
import {Select} from "antd"

const Option = Select.Option

const chartColors = [
    {
        stroke: '#FF5256',
        fill: 'rgba(255,82,86,0.23)'
    },
    {
        stroke: '#9464B9',
        fill: 'rgba(148,100,185,0.23)'
    },
    {
        stroke: '#FFAF52',
        fill: 'rgba(255,175,82,0.23)'
    },
    {
        stroke: '#7FD3A1',
        fill: 'rgba(127,211,161,0.23)'
    }
]


const toPercent = (decimal, fixed = 0) => `${round((decimal * 100), fixed)}%`

const getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0

    return toPercent(ratio, 2)
}

const ChartTooltip = ({payload, label, selectedMetric}) => {
    if (payload && payload.length > 0) {
        let total = 0

        Object.values(chartAreaKeys).forEach(key => {
            total = total + +payload[0].payload[key]
        })

        return (
            <div className='area-chart-tooltip'>
                <div className='area-chart-tooltip-header'>
                    <div className='date title'>
                        {days[moment(label).weekday()] + ', ' + moment(label).format('DD MMM YY')}
                    </div>
                </div>

                <div className="content">
                    <div className="col name">
                        {Object.values(chartAreaKeys).map(name => <div>{name}</div>)}
                    </div>

                    <div className="col value">
                        {Object.values(chartAreaKeys).map((name) => <div
                            style={{color: _.find(payload, {dataKey: name}).stroke}}>
                            <RenderMetricValue
                                number={payload[0].payload[name]}
                                type={_.find(analyticsAvailableMetricsList, {key: selectedMetric}).type}
                            />
                        </div>)}
                    </div>

                    <div className="col percent">
                        {Object.values(chartAreaKeys).map((name) => <div
                            style={{color: _.find(payload, {dataKey: name}).stroke}}>
                            {getPercent(payload[0].payload[name], total)}
                        </div>)}
                    </div>
                </div>

            </div>
        )
    } else {
        return ''
    }
}

export const StackedAreaPercentChart = ({data, selectedMetric}) => {


    return (<div className="stacked-area-percent-chart-container">
        <div className="metrics">
            <CustomSelect>
                <Option value={'Revenue'}>Revenue</Option>
            </CustomSelect>
        </div>

        <div className={'chart-responsive'}>
            <ResponsiveContainer height='100%' width='100%'>
                <AreaChart
                    data={data}
                    stackOffset="expand"
                    isAnimationActive={false}
                    margin={{
                        top: 5, right: 0, left: -10, bottom: 5,
                    }}
                >
                    <defs>
                        <linearGradient spreadMethod="pad" id="topSearchGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor='#FF5256' stopOpacity='0.23'/>
                            {/*<stop offset="45%" stopColor="#FF5256" stopOpacity='0.2'/>*/}
                            <stop offset="100%" stopColor='#FF5256' stopOpacity='0'/>
                        </linearGradient>

                        <linearGradient id="detailPageGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#9464B9" stopOpacity='0.23'/>
                            {/*<stop offset="45%" stopColor="#9464B9" stopOpacity='0.2'/>*/}
                            <stop offset="100%" stopColor="#9464B9" stopOpacity='0'/>
                        </linearGradient>

                        <linearGradient id="otherGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FFAF52" stopOpacity='0.23'/>
                            {/*<stop offset="45%" stopColor="#FFAF52" stopOpacity='0.2'/>*/}
                            <stop offset="100%" stopColor="#FFAF52" stopOpacity='0'/>
                        </linearGradient>

                        <linearGradient id="remarketingGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#7FD3A1" stopOpacity='0.23'/>
                            {/*<stop offset="45%" stopColor="#7FD3A1" stopOpacity='0.2'/>*/}
                            <stop offset="100%" stopColor="#7FD3A1" stopOpacity='0'/>
                        </linearGradient>
                    </defs>

                    <CartesianGrid vertical={false} stroke={'rgba(101, 106, 132, 0.2)'}/>

                    <YAxis
                        tickFormatter={toPercent}
                        interval={1}
                    />

                    <XAxis
                        dataKey="eventDate"
                        dy={15}
                        tickFormatter={(date) => moment(date).format('MMM DD')}
                    />

                    <Tooltip
                        isAnimationActive={false}
                        content={
                            <ChartTooltip selectedMetric={selectedMetric}/>
                        }
                    />

                    <Area
                        type="linear"
                        dataKey={chartAreaKeys.remarketing}
                        stackId="1"
                        stroke={chartColors[3].stroke}
                        fill="url(#remarketingGradient)"
                        fillOpacity={1}
                        isAnimationActive={false}
                        activeDot={{stroke: chartColors[3].stroke, strokeWidth: 2}}
                    />

                    <Area
                        type="linear"
                        dataKey={chartAreaKeys.other}
                        stackId="1"
                        stroke={chartColors[2].stroke}
                        fill="url(#otherGradient)"
                        fillOpacity={1}
                        isAnimationActive={false}
                        activeDot={{stroke: chartColors[2].stroke, strokeWidth: 2}}
                    />

                    <Area
                        type="linear"
                        dataKey={chartAreaKeys.detailPage}
                        stackId="1"
                        stroke={chartColors[1].stroke}
                        fill="url(#detailPageGradient)"
                        fillOpacity={1}
                        isAnimationActive={false}
                        activeDot={{stroke: chartColors[1].stroke, strokeWidth: 2}}
                    />

                    <Area
                        type="linear"
                        dataKey={chartAreaKeys.topSearch}
                        stackId="1"
                        stroke={chartColors[0].stroke}
                        fill="url(#topSearchGradient)"
                        fillOpacity={1}
                        isAnimationActive={false}
                        activeDot={{stroke: chartColors[0].stroke, strokeWidth: 2}}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>)
}