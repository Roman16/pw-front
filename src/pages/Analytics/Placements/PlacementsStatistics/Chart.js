import React from "react"
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import {Spin} from "antd"
import moment from "moment"
import {days} from "../../components/MainChart/ChartTooltip"
import _ from 'lodash'
import {RenderMetricValue} from "../../components/TableList/tableColumns"
import {analyticsAvailableMetricsList} from "../../components/MainMetrics/metricsList"


const chartColors = [
    {
        stroke: '#F0B849',
        fill: '#F6DB97'
    },
    {
        stroke: '#EC7F5C',
        fill: '#F3AD97'
    },
    {
        stroke: '#6D6DF6',
        fill: '#A1A1F9'
    },
    {
        stroke: '#71A8FA',
        fill: '#B2D0FE'
    }

]

const chartAreaKeys = {
    topSearch: 'Top of Search on-Amazon',
    detailPage: 'Detail Page on-Amazon',
    other: 'Other on-Amazon',
    remarketing: 'Remarketing off-Amazon',
}

const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`

const ChartTooltip = ({payload, label, selectedMetric}) => {
    if (payload && payload.length > 0) {
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
                </div>

            </div>
        )
    } else {
        return ''
    }
}


const Chart = ({processing, data = [], selectedMetric}) => {

    const chartData = data.map(item => {
        Object.keys(item).forEach(key => {

            if (key !== 'eventDate') {
                item[key] = +item[key]
            }
        })

        return item
    })

    return (<div className="chart-block">
        <ResponsiveContainer height='100%' width='100%'>
            <AreaChart
                width={400}
                height={400}
                data={chartData}
                stackOffset="expand"
                isAnimationActive={false}
                margin={{
                    top: 10, right: 0, left: -10, bottom: 10,
                }}
            >
                <defs>
                    <linearGradient spreadMethod="pad" id="topSearchGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor='#F6D88E' stopOpacity='1'/>
                        <stop offset="100%" stopColor='#FDF8EB' stopOpacity='0'/>
                    </linearGradient>

                    <linearGradient id="detailPageGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F5C2AD" stopOpacity='1'/>
                        <stop offset="100%" stopColor="#FADBD1" stopOpacity='0'/>
                    </linearGradient>

                    <linearGradient id="otherGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C0B6EC" stopOpacity='1'/>
                        <stop offset="100%" stopColor="#E6DAEB" stopOpacity='0'/>
                    </linearGradient>

                    <linearGradient id="remarketingGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#B3D0FD" stopOpacity='1'/>
                        <stop offset="100%" stopColor="#FBFDFE" stopOpacity='0'/>
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

        {processing && <div className="disable-page-loading">
            <Spin size="large"/>
        </div>}
    </div>)
}

export default Chart
