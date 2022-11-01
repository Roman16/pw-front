import React from "react"
import {CartesianGrid, Line, AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import moment from "moment"
import {round} from "../../../utils/round"
import {numberMask} from "../../../utils/numberMask"
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

export const Chart = ({data, chartType, firstMetric, secondMetric}) => {
    return (
        <div className="chart">
            <ResponsiveContainer height='99%' width='100%'>
                <AreaChart
                    data={data}
                    margin={{
                        top: 5, right: -10, left: -10, bottom: 15,
                    }}
                >

                    {/*----------------------------------------------------------------*/}
                    {/*filters*/}

                    <defs>
                        <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#A292E2" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#A292E2" stopOpacity={0}/>
                        </linearGradient>

                        <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF5256" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#FF5256" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    {/*----------------------------------------------------------------*/}
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
                        axisLine={false}
                        yAxisId="left"
                        stroke="#A292E2"
                        tickCount={4}
                        tickFormatter={(data) => round(data, 3)}
                    />

                    <YAxis
                        axisLine={false}
                        stroke="#FF5256"
                        yAxisId="right"
                        orientation="right"
                        tickCount={4}
                        tickFormatter={(data) => round(data, 3)}
                    />

                    <Tooltip
                        isAnimationActive={false}
                        content={
                            <ChartTooltip
                                firstMetric={firstMetric}
                                secondMetric={secondMetric}
                                chartType={chartType}
                            />
                        }
                    />

                    <Area
                        activeDot={{r: 4, fill: '#fff', stroke: '#A292E2'}}
                        type={chartType === 'daily' ? 'linear' : "monotone"}
                        isAnimationActive={false}
                        yAxisId="left"
                        dataKey={firstMetric.key}
                        stroke="#A292E2"
                        strokeWidth={2}
                        fill="url(#gradient1)"
                        {...chartType === 'daily' ? {
                            dot: {r: 4, fill: '#3F4347'}
                        } : {}}
                    />

                    {secondMetric.key !== 'nothing' && <Area
                        activeDot={{r: 4, fill: '#fff', stroke: '#FF5256'}}
                        type={chartType === 'daily' ? 'linear' : "monotone"}
                        isAnimationActive={false}
                        yAxisId="right"
                        dataKey={secondMetric.key}
                        stroke="#FF5256"
                        strokeWidth={2}
                        fill="url(#gradient2)"
                        {...chartType === 'daily' ? {
                            dot: {r: 4, fill: '#3F4347'}
                        } : {}}
                    />}
                </AreaChart>
            </ResponsiveContainer>

        </div>
    )
}

export const CustomizedTick = (props) => {
    const {x, y, chartType, stroke, payload} = props
    const date = payload.value

    return (
        <g transform={`translate(${x},${y})`}>
            {chartType === 'daily' ? <text x={0} y={0} dy={16} fill="#fff">
                    <tspan textAnchor="middle" x="0">
                        {weakDays[moment(date).day()].date[0]}
                    </tspan>
                </text>
                : <text x={0} y={0} dy={16} fill="#fff">
                    <tspan textAnchor="middle" x="0">
                        {moment(date, 'HH').format('hh')}
                    </tspan>
                    <tspan textAnchor="middle" x="0" dy="20">
                        {moment(date, 'HH').format('A')}
                    </tspan>
                </text>}
        </g>
    )
}

const ChartTooltip = ({payload, firstMetric, secondMetric, chartType}) => {
    if (payload && payload.length > 0) {
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

                    {firstMetric.key !== 'nothing' && <div className="row">
                        <div className="name">{firstMetric.title}</div>

                        <div className="value" style={{color: '#A292E2'}}>
                            <svg width="13" height="8" viewBox="0 0 13 8" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.59091 4C8.59091 5.38071 7.45127 6.5 6.04545 6.5C4.63964 6.5 3.5 5.38071 3.5 4C3.5 2.61929 4.63964 1.5 6.04545 1.5C7.45127 1.5 8.59091 2.61929 8.59091 4Z"
                                    fill="#fff"/>
                                <path
                                    d="M8.59091 4C8.59091 5.38071 7.45127 6.5 6.04545 6.5C4.63964 6.5 3.5 5.38071 3.5 4M8.59091 4C8.59091 2.61929 7.45127 1.5 6.04545 1.5C4.63964 1.5 3.5 2.61929 3.5 4M8.59091 4H12.0455M3.5 4H0"
                                    stroke="#A292E2" stroke-width="1.5"/>
                            </svg>

                            {renderMetricValue({value:payload[0].payload[firstMetric.key], metric: firstMetric.key})}
                        </div>
                    </div>}

                    {secondMetric.key !== 'nothing' && <div className="row">
                        <div className="name">{secondMetric.title}</div>

                        <div className="value" style={{color: '#FF5256'}}>
                            <svg width="13" height="8" viewBox="0 0 13 8" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.59091 4C8.59091 5.38071 7.45127 6.5 6.04545 6.5C4.63964 6.5 3.5 5.38071 3.5 4C3.5 2.61929 4.63964 1.5 6.04545 1.5C7.45127 1.5 8.59091 2.61929 8.59091 4Z"
                                    fill="#fff"/>
                                <path
                                    d="M8.59091 4C8.59091 5.38071 7.45127 6.5 6.04545 6.5C4.63964 6.5 3.5 5.38071 3.5 4M8.59091 4C8.59091 2.61929 7.45127 1.5 6.04545 1.5C4.63964 1.5 3.5 2.61929 3.5 4M8.59091 4H12.0455M3.5 4H0"
                                    stroke="#FF5256" stroke-width="1.5"/>
                            </svg>

                            {renderMetricValue({value:payload[0].payload[secondMetric.key], metric: secondMetric.key})}
                        </div>
                    </div>}
                </div>
            </div>
        )
    } else {
        return ''
    }
}
