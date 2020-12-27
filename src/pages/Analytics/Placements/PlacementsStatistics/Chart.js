import React, {Fragment} from "react"
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import {Spin} from "antd"
import moment from "moment"

const chartColors = [
    {
        stroke: '#F1C75C',
        fill: '#F6DB97'
    },
    {
        stroke: '#EC7F5C',
        fill: '#F3AD97'
    },
    {
        stroke: '#6D6DF6',
        fill: '#A1A1F9'
    }

]
const weakDays = [
    {
        date: 'Sunday',
    },
    {
        date: 'Monday',
    },
    {
        date: 'Tuesday',
    },
    {
        date: 'Wednesday',
    },
    {
        date: 'Thursday',
    },
    {
        date: 'Friday',
    },
    {
        date: 'Saturday',
    },
]
const chartLabel = {
    top_search: 'Top of search',
    product_pages: 'Product pages',
    rest_search: 'Rest of search'
}

const CustomizedAxisTick = ({x, y, payload, lastIndex}) => {
    if (payload.index === 0) {
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={65} y={0} dy={16} textAnchor="end"
                      fill="#666">{moment(payload.value).format('DD MMM YY')}</text>
            </g>
        )
    } else if (payload.index === lastIndex) {
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end"
                      fill="#666">{moment(payload.value).format('DD MMM YY')}</text>
            </g>
        )

    } else {
        return ('')
    }
}

const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`

const getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0

    return toPercent(ratio, 2)
}

const ChartTooltip = ({payload}) => {
    if (payload && payload.length > 0) {
        const total = payload.reduce((result, entry) => (result + entry.value), 0)

        return (
            <div className='area-chart-tooltip'>
                {/*<h3>{moment(payload[0].payload.date).format('DD MMMM YYYY')}</h3>*/}
                <h3>{`${weakDays[moment(payload[0].payload.date).day()].date}, ${moment(payload[0].payload.date).format('MMMM DD')}`}</h3>

                <div className='content'>
                    {payload.reverse().map((entry, index) => (
                        <div key={`item-${index}`}>
                            <div className='name'>
                                <div style={{background: entry.color}}/>
                                {chartLabel[entry.name]}
                            </div>

                            <div className='percent' style={{color: entry.color}}>
                                {getPercent(entry.value, total)}
                            </div>

                            <div className='value'>
                                ({entry.value})
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return ''
    }
}


const Chart = ({processing, chartData = []}) => {
    return (<div className="chart-block">
        <ResponsiveContainer height='100%' width='100%'>
            <AreaChart
                width={400}
                height={400}
                data={chartData}
                stackOffset="expand"
                isAnimationActive={false}
                margin={{
                    top: 10, right: 0, left: -10, bottom: -20,
                }}
            >
                <defs>
                    <linearGradient spreadMethod="pad" id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor='rgb(161, 161, 249)' stopOpacity='1'/>
                        <stop offset="100%" stopColor='rgba(161, 161, 249, 0)' stopOpacity='0'/>
                    </linearGradient>

                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F3AD97"/>
                        <stop offset="100%" stopColor="rgba(243, 173, 151, 0)"/>
                    </linearGradient>

                    <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F6DB97"/>
                        <stop offset="100%" stopColor="rgba(246, 219, 151, 0)"/>
                    </linearGradient>
                </defs>

                <CartesianGrid vertical={false} stroke={'rgba(101, 106, 132, 0.2)'}/>

                <YAxis
                    tickFormatter={toPercent}
                    interval={1}
                />

                <XAxis
                    minTickGap={2}
                    tickSize={9}
                    dataKey="date"
                    interval={chartData.length - 2}
                    padding={{left: 10, right: 10}}
                    tick={<CustomizedAxisTick lastIndex={chartData.length - 1}/>}
                />

                <Tooltip
                    isAnimationActive={false}
                    content={
                        <ChartTooltip/>
                    }
                />

                <Area
                    type="linear"
                    dataKey="rest_search"
                    stackId="1"
                    stroke={chartColors[2].stroke}
                    fill="url(#colorUv)"
                    fillOpacity={1}
                    isAnimationActive={false}
                    activeDot={{stroke: chartColors[2].stroke, strokeWidth: 2}}
                />

                <Area
                    type="linear"
                    dataKey="product_pages"
                    stackId="1"
                    stroke={chartColors[1].stroke}
                    fill="url(#colorPv)"
                    fillOpacity={1}
                    isAnimationActive={false}
                    activeDot={{stroke: chartColors[1].stroke, strokeWidth: 2}}
                />

                <Area
                    type="linear"
                    dataKey="top_search"
                    stackId="1"
                    stroke={chartColors[0].stroke}
                    fill="url(#colorAmt)"
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
