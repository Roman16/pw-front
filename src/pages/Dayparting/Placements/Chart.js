import React from "react"
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import moment from "moment"
import {chartColors} from "./Placements"
import {CustomizedTick} from "../MetricsComparison/Chart"
import {round} from "../../../utils/round"
import {renderMetricValue} from "../HourDayStatistics/HourDayStatistics"

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

const chartLabel = (selectedMetric) => ({
    [`top_of_search_${selectedMetric}`]: 'Top of search',
    [`detail_page_${selectedMetric}`]: 'Product pages',
    [`other_${selectedMetric}`]: 'Rest of search'
})

export const Chart = ({data, chartType, selectedMetric}) => {
    return (
        <div className='chart'>
            <ResponsiveContainer height='99%' width='100%'>
                <AreaChart
                    width={400}
                    height={200}
                    data={data.map(i => {
                        const obj = {
                            dateRange: i.dateRange,
                            date: i.date
                        }

                        Object.keys(i).forEach(key => {
                            if (key !== 'dateRange' && key !== 'date') {
                                obj[key] = i[key]
                                obj[`${key}_abs`] = i[key] > 0 ? i[key] : 0
                            }
                        })

                        return {...obj}
                    })}
                    stackOffset="expand"
                    isAnimationActive={false}
                    margin={{
                        top: 10, right: 20, left: -10, bottom: 15,
                    }}
                >
                    <defs>
                        <linearGradient id="gradient33" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor='#FFA8AA' stopOpacity='0.4'/>
                            <stop offset="100%" stopColor='#FFA8AA' stopOpacity='0'/>
                        </linearGradient>

                        <linearGradient id="gradient22" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#A292E2" stopOpacity='0.4'/>
                            <stop offset="100%" stopColor="#A292E2" stopOpacity='0'/>
                        </linearGradient>

                        <linearGradient id="gradient11" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor='#9852CE' stopOpacity='0.4'/>
                            <stop offset="100%" stopColor='#9852CE' stopOpacity='0'/>
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="4"
                        stroke="#656A6F"
                    />

                    <XAxis
                        axisLine={false}
                        dataKey="date"
                        stroke={'#fff'}
                        dy={10}
                        interval={0}
                        tick={<CustomizedTick
                            chartType={chartType}
                        />}
                    />


                    <YAxis
                        tickFormatter={toPercent}
                        interval={1}
                        stroke={'#fff'}
                        axisLine={false}
                    />

                    <Tooltip
                        isAnimationActive={false}
                        content={
                            <ChartTooltip chartType={chartType} selectedMetric={selectedMetric}/>
                        }
                    />

                    <Area
                        dataKey={`other_${selectedMetric}_abs`}
                        stackId="1"
                        strokeWidth={2}
                        stroke={chartColors[2].stroke}

                        fill="url(#gradient11)"
                        isAnimationActive={false}
                        activeDot={{stroke: chartColors[2].stroke, strokeWidth: 2, fill: '#fff'}}
                        type={chartType === 'daily' ? 'linear' : "monotone"}
                        {...chartType === 'daily' ? {
                            dot: {r: 4, fill: '#3F4347'}
                        } : {}}
                    />

                    <Area
                        dataKey={`detail_page_${selectedMetric}_abs`}
                        stackId="1"
                        strokeWidth={2}
                        stroke={chartColors[1].stroke}
                        fill="url(#gradient22)"
                        isAnimationActive={false}
                        activeDot={{stroke: chartColors[1].stroke, strokeWidth: 2, fill: '#fff'}}
                        type={chartType === 'daily' ? 'linear' : "monotone"}
                        {...chartType === 'daily' ? {
                            dot: {r: 4, fill: '#3F4347'}
                        } : {}}
                    />

                    <Area
                        dataKey={`top_of_search_${selectedMetric}_abs`}
                        stackId="1"
                        strokeWidth={2}
                        fill="url(#gradient33)"
                        stroke={chartColors[0].stroke}
                        isAnimationActive={false}
                        activeDot={{stroke: chartColors[0].stroke, strokeWidth: 2, fill: '#fff'}}
                        type={chartType === 'daily' ? 'linear' : "monotone"}
                        {...chartType === 'daily' ? {
                            dot: {r: 4, fill: '#3F4347'}
                        } : {}}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

const ChartTooltip = ({payload, chartType, selectedMetric}) => {
    if (payload && payload.length > 0) {
        const total = payload.reduce((result, entry) => (result + entry.payload[`${entry.dataKey.replace('_abs', '')}`]), 0)

        return (
            <div className='chart-tooltip'>
                <div className='ant-popover-inner-content'>
                    <div className="tooltip-header">
                        {chartType === 'daily' ? <h3 className='border-title'>
                            {`${weakDays[moment(payload[0].payload.date).day()].date}, ${moment(payload[0].payload.date).format('DD MMM YYYY')}`}
                        </h3> : <>
                            <h3>{moment(payload[0].payload.date, 'HH').format('hh A')} - {moment(payload[0].payload.date, 'HH').add(1, 'h').format('hh A')}</h3>
                            <p className={'average-range'}>Average
                                for {moment(payload[0].payload.dateRange.startDate).format('MMM DD')} - {moment(payload[0].payload.dateRange.endDate).format('MMM DD')}</p>
                        </>}
                    </div>

                    {payload.reverse().map((entry, index) => (
                        <div className={'row'} key={`item-${index}`}>
                            <div className='name'>
                                {chartLabel(selectedMetric)[`${entry.name.replace('_abs', '')}`]}
                            </div>

                            <div className='value' style={{color: entry.color}}>
                                <svg width="13" height="8" viewBox="0 0 13 8" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.59091 4C8.59091 5.38071 7.45127 6.5 6.04545 6.5C4.63964 6.5 3.5 5.38071 3.5 4C3.5 2.61929 4.63964 1.5 6.04545 1.5C7.45127 1.5 8.59091 2.61929 8.59091 4Z"
                                        fill="#fff"/>
                                    <path
                                        d="M8.59091 4C8.59091 5.38071 7.45127 6.5 6.04545 6.5C4.63964 6.5 3.5 5.38071 3.5 4M8.59091 4C8.59091 2.61929 7.45127 1.5 6.04545 1.5C4.63964 1.5 3.5 2.61929 3.5 4M8.59091 4H12.0455M3.5 4H0"
                                        stroke={entry.color} stroke-width="1.5"/>
                                </svg>

                                {getPercent(entry.payload[`${entry.dataKey.replace('_abs', '')}`], total)}
                            </div>

                            <div className='current-value'>
                                ({renderMetricValue({
                                value: entry.payload[`${entry.dataKey.replace('_abs', '')}`] || 0,
                                metric: selectedMetric
                            })})
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


const getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0

    return toPercent(ratio, 2)
}

const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`

