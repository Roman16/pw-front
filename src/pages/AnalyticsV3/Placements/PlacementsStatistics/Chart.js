import React from "react"
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import {Spin} from "antd"
import moment from "moment"
import {days} from "../../components/MainChart/ChartTooltip"
import _ from 'lodash'
import {RenderMetricValue} from "../../components/TableList/tableColumns"
import {analyticsAvailableMetricsList} from "../../components/MainMetrics/metricsList"
import {round} from "../../../../utils/round"


const fakeData = [
    {
        "eventDate": "2021-11-10",
        "Other on-Amazon": "3575",
        "Detail Page on-Amazon": "9683",
        "Top of Search on-Amazon": "3142",
        "Remarketing off-Amazon": 2344
    }, {
        "eventDate": "2021-11-11",
        "Other on-Amazon": "2177",
        "Detail Page on-Amazon": "8385",
        "Top of Search on-Amazon": "3159",
        "Remarketing off-Amazon": 2344
    }, {
        "eventDate": "2021-11-12",
        "Other on-Amazon": "1876",
        "Detail Page on-Amazon": "9123",
        "Top of Search on-Amazon": "310",
        "Remarketing off-Amazon": 2344
    }, {
        "eventDate": "2021-11-13",
        "Other on-Amazon": "2327",
        "Detail Page on-Amazon": "14056",
        "Top of Search on-Amazon": "6101",
        "Remarketing off-Amazon": 2344
    }, {
        "eventDate": "2021-11-14",
        "Other on-Amazon": "2536",
        "Detail Page on-Amazon": "17716",
        "Top of Search on-Amazon": "15003",
        "Remarketing off-Amazon": 2344
    }, {
        "eventDate": "2021-11-15",
        "Other on-Amazon": "1382",
        "Detail Page on-Amazon": "8659",
        "Top of Search on-Amazon": "1176",
        "Remarketing off-Amazon": 2344
    }, {
        "eventDate": "2021-11-16",
        "Other on-Amazon": "899",
        "Detail Page on-Amazon": "6471",
        "Top of Search on-Amazon": "1103",
        "Remarketing off-Amazon": 2344
    }, {
        "eventDate": "2021-11-17",
        "Other on-Amazon": "985",
        "Detail Page on-Amazon": "6011",
        "Top of Search on-Amazon": "1286",
        "Remarketing off-Amazon": 2344
    }, {
        "eventDate": "2021-11-18",
        "Other on-Amazon": "759",
        "Detail Page on-Amazon": "2523",
        "Top of Search on-Amazon": "1262",
        "Remarketing off-Amazon": 2344
    }, {
        "eventDate": "2021-11-19",
        "Other on-Amazon": "775",
        "Detail Page on-Amazon": "2582",
        "Top of Search on-Amazon": "1170",
        "Remarketing off-Amazon": 2344
    }, {
        "eventDate": "2021-11-20",
        "Other on-Amazon": "653",
        "Detail Page on-Amazon": "3507",
        "Top of Search on-Amazon": "2311",
        "Remarketing off-Amazon": 2344
    }, {
        "eventDate": "2021-11-21",
        "Other on-Amazon": "912",
        "Detail Page on-Amazon": "8862",
        "Top of Search on-Amazon": "2722",
        "Remarketing off-Amazon": 2344
    }, {
        "eventDate": "2021-11-22",
        "Other on-Amazon": "516",
        "Detail Page on-Amazon": "5889",
        "Top of Search on-Amazon": "2552",
        "Remarketing off-Amazon": 2344
    }, {
        "eventDate": "2021-11-23",
        "Other on-Amazon": "786",
        "Detail Page on-Amazon": "4002",
        "Top of Search on-Amazon": "1294",
        "Remarketing off-Amazon": 2344
    }, {
        "eventDate": "2021-11-24",
        "Other on-Amazon": "749",
        "Detail Page on-Amazon": "5474",
        "Top of Search on-Amazon": "2366",
        "Remarketing off-Amazon": 2344
    },]


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

export const chartAreaKeys = {
    topSearch: 'Top of Search on-Amazon',
    detailPage: 'Detail Page on-Amazon',
    other: 'Other on-Amazon',
    remarketing: 'Remarketing off-Amazon',
}

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


const Chart = ({processing, data = [], selectedMetric}) => {

    const chartData = data.map(item => ({
        eventDate: item.eventDate,
        ...item[selectedMetric]
    }))

    return (<div className="chart-block">
        <ResponsiveContainer height='100%' width='100%'>
            <AreaChart
                width={400}
                height={400}
                data={chartData}
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

        {processing && <div className="disable-page-loading">
            <Spin size="large"/>
        </div>}
    </div>)
}

export default Chart
