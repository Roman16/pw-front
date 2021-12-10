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
        "Top of Search on-Amazon": "142",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-11",
        "Other on-Amazon": "2177",
        "Detail Page on-Amazon": "8385",
        "Top of Search on-Amazon": "159",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-12",
        "Other on-Amazon": "1876",
        "Detail Page on-Amazon": "9123",
        "Top of Search on-Amazon": "210",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-13",
        "Other on-Amazon": "2327",
        "Detail Page on-Amazon": "14056",
        "Top of Search on-Amazon": "201",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-14",
        "Other on-Amazon": "2536",
        "Detail Page on-Amazon": "17716",
        "Top of Search on-Amazon": "2003",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-15",
        "Other on-Amazon": "1382",
        "Detail Page on-Amazon": "8659",
        "Top of Search on-Amazon": "176",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-16",
        "Other on-Amazon": "899",
        "Detail Page on-Amazon": "6471",
        "Top of Search on-Amazon": "103",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-17",
        "Other on-Amazon": "985",
        "Detail Page on-Amazon": "6011",
        "Top of Search on-Amazon": "86",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-18",
        "Other on-Amazon": "759",
        "Detail Page on-Amazon": "2523",
        "Top of Search on-Amazon": "62",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-19",
        "Other on-Amazon": "775",
        "Detail Page on-Amazon": "2582",
        "Top of Search on-Amazon": "70",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-20",
        "Other on-Amazon": "653",
        "Detail Page on-Amazon": "3507",
        "Top of Search on-Amazon": "311",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-21",
        "Other on-Amazon": "912",
        "Detail Page on-Amazon": "8862",
        "Top of Search on-Amazon": "722",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-22",
        "Other on-Amazon": "516",
        "Detail Page on-Amazon": "5889",
        "Top of Search on-Amazon": "552",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-23",
        "Other on-Amazon": "786",
        "Detail Page on-Amazon": "4002",
        "Top of Search on-Amazon": "94",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-24",
        "Other on-Amazon": "749",
        "Detail Page on-Amazon": "5474",
        "Top of Search on-Amazon": "366",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-25",
        "Other on-Amazon": "1864",
        "Detail Page on-Amazon": "20559",
        "Top of Search on-Amazon": "1235",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-26",
        "Other on-Amazon": "2118",
        "Detail Page on-Amazon": "8172",
        "Top of Search on-Amazon": "182",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-27",
        "Other on-Amazon": "1119",
        "Detail Page on-Amazon": "3926",
        "Top of Search on-Amazon": "95",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-28",
        "Other on-Amazon": "1394",
        "Detail Page on-Amazon": "4453",
        "Top of Search on-Amazon": "118",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-29",
        "Other on-Amazon": "1264",
        "Detail Page on-Amazon": "7528",
        "Top of Search on-Amazon": "104",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-11-30",
        "Other on-Amazon": "4076",
        "Detail Page on-Amazon": "8295",
        "Top of Search on-Amazon": "1282",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-12-01",
        "Other on-Amazon": "1628",
        "Detail Page on-Amazon": "16643",
        "Top of Search on-Amazon": "529",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-12-02",
        "Other on-Amazon": "2123",
        "Detail Page on-Amazon": "19460",
        "Top of Search on-Amazon": "1150",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-12-03",
        "Other on-Amazon": "3413",
        "Detail Page on-Amazon": "25077",
        "Top of Search on-Amazon": "1379",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-12-04",
        "Other on-Amazon": "2579",
        "Detail Page on-Amazon": "18982",
        "Top of Search on-Amazon": "710",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-12-05",
        "Other on-Amazon": "3431",
        "Detail Page on-Amazon": "23441",
        "Top of Search on-Amazon": "774",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-12-06",
        "Other on-Amazon": "5287",
        "Detail Page on-Amazon": "18589",
        "Top of Search on-Amazon": "554",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-12-07",
        "Other on-Amazon": "8547",
        "Detail Page on-Amazon": "19160",
        "Top of Search on-Amazon": "459",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-12-08",
        "Other on-Amazon": "11569",
        "Detail Page on-Amazon": "141506",
        "Top of Search on-Amazon": "599",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-12-09",
        "Other on-Amazon": "10211",
        "Detail Page on-Amazon": "22371",
        "Top of Search on-Amazon": "724",
        "Remarketing off-Amazon": 0
    }, {
        "eventDate": "2021-12-10",
        "Other on-Amazon": "13",
        "Detail Page on-Amazon": "76",
        "Top of Search on-Amazon": "0",
        "Remarketing off-Amazon": 0
    }]


const chartColors = [
    {
        stroke: '#BA96F4',
        fill: 'rgba(186,150,244,0.23)'
    },
    {
        stroke: '#9464B9',
        fill: 'rgba(148,100,185,0.23)'
    },
    {
        stroke: '#FF5256',
        fill: 'rgba(255,82,86,0.23)'
    },
    {
        stroke: '#FFA8AA',
        fill: 'rgba(255,168,170,0.23)'
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
                    top: 5, right: 0, left: -10, bottom: 5,
                }}
            >
                <defs>
                    <linearGradient spreadMethod="pad" id="topSearchGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor='#BA96F4' stopOpacity='0.77'/>
                        <stop offset="50%" stopColor="#BA96F4" stopOpacity='0.2'/>
                        <stop offset="100%" stopColor='#BA96F4' stopOpacity='0'/>
                    </linearGradient>

                    <linearGradient id="detailPageGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9464B9" stopOpacity='0.77'/>
                        <stop offset="50%" stopColor="#9464B9" stopOpacity='0.2'/>
                        <stop offset="100%" stopColor="#9464B9" stopOpacity='0'/>
                    </linearGradient>

                    <linearGradient id="otherGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF5256" stopOpacity='0.77'/>
                        <stop offset="50%" stopColor="#FF5256" stopOpacity='0.2'/>
                        <stop offset="100%" stopColor="#FF5256" stopOpacity='0'/>
                    </linearGradient>

                    <linearGradient id="remarketingGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFA8AA" stopOpacity='0.77'/>
                        <stop offset="50%" stopColor="#FFA8AA" stopOpacity='0.2'/>
                        <stop offset="100%" stopColor="#FFA8AA" stopOpacity='0'/>
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
