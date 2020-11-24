import React, {useEffect, useState} from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    ReferenceArea,
} from 'recharts'
import ChartTooltip from "./ChartTooltip"
import moment from "moment"
import {analyticsAvailableMetricsList} from '../MainMetrics/metricsList'
import _ from "lodash"

const animationDuration = 1000,
    animationEasing = 'linear',
    isAnimationActive = false

const chartColors = ['#82ca9d', '#8884d8', '#DD7703', '#4DBEE1']


const Chart = ({
                   data,
                   activeMetrics,
                   showWeekChart,
                   showDailyChart,
                   showOptimizationChart,
                   selectedRangeDate,
                   productOptimizationDateList,
               }) => {

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        setChartData([...data.map(item => {
            let event = {
                eventDate: item.eventDate,
            }

            activeMetrics.forEach(metric => {
                if(metric) {
                    const metricType = _.find(analyticsAvailableMetricsList, {key: metric}).type

                    event[metric] = metricType === 'percent' ? item[metric] * 100 : item[metric]
                    event[`${metric}_7d`] = metricType === 'percent' ? item[`${metric}_7d`] * 100 : item[`${metric}_7d`]
                }
            })

            return event
        })])

        // if (selectedRangeDate.startDate === 'lifetime') {
        //     setChartData([...data])
        // } else {
        //     const start = moment(selectedRangeDate.startDate),
        //         end = moment(selectedRangeDate.endDate)
        //
        //     let next = start,
        //         dateArr = []
        //
        //     while (!next.isAfter(end)) {
        //
        //         let event = {
        //             eventDate: next.format('YYYY-MM-DD'),
        //         }
        //
        //         activeMetrics.forEach(metric => {
        //             event[metric.key] = null
        //             event[`${metric.key}_7d`] = null
        //         })
        //
        //         dateArr.push(event)
        //
        //         next = start.add(1, 'days')
        //     }
        //
        //     setChartData(dateArr.map(item => {
        //         return {
        //             ...item,
        //             ..._.find(data, {eventDate: item.eventDate}),
        //             eventDate: `${moment(item.eventDate)}`,
        //         }
        //     }))
        // }
    }, [data])

    return (
        <div className='main-chart-container'>
            <ResponsiveContainer height='100%' width='100%'>
                <LineChart
                    data={chartData}
                    margin={{top: 30, bottom: 30}}
                >
                    {/*----------------------------------------------------------------*/}
                    {/*filters*/}

                    <filter id="dropshadow" height="130%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
                        <feOffset dx="2" dy="10" result="offsetblur"/>
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.5"/>
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>

                        <feBlend in="SourceGraphic" in2="blurOut" mode="normal"/>

                    </filter>

                    <CartesianGrid
                        stroke="rgba(219, 220, 226, 0.3)"
                    />

                    <XAxis
                        dataKey="eventDate"
                        axisLine={false}
                        // interval={2}
                        // angle={50}
                        // dx={15}
                        dy={15}
                        // height={60}
                        // tick={<CustomizedAxisTick/>}
                        tickFormatter={(date) => moment(date).format('MMM DD')}
                    />

                    {activeMetrics && activeMetrics.map((item, index) => (
                        <YAxis
                            yAxisId={`YAxis-${index}`}
                            orientation={!!((index) % 2) ? 'right' : 'left'}
                            stroke={chartColors[index]}
                            axisLine={false}
                        />
                    ))}

                    <Tooltip
                        isAnimationActive={false}
                        content={
                            <ChartTooltip
                                activeMetrics={activeMetrics.map(key => _.find(analyticsAvailableMetricsList, {key: key}))}
                                showWeekChart={showWeekChart}
                                showDailyChart={showDailyChart}
                                chartColors={chartColors}
                            />
                        }/>


                    {/* Optimization line*/}
                    {showOptimizationChart && productOptimizationDateList.map(item => {
                        return (
                            <ReferenceLine
                                yAxisId={'YAxis-0'}
                                x={`${moment(item.started).format('YYYY-MM-DD')}T00:00:00.000Z`}
                                stroke={"#CDFFE2"}
                                label={null}
                                strokeWidth={4}
                                strokeDasharray="7"
                            />

                        )
                    })}

                    {showOptimizationChart && productOptimizationDateList.map(item => {
                        return (item.stopped !== null && <ReferenceLine
                                key={item.stooped}
                                yAxisId={'YAxis-0'}
                                x={`${moment(item.stopped).format('YYYY-MM-DD')}T00:00:00.000Z`}
                                stroke={"#C9CBD4"}
                                label={null}
                                strokeWidth={4}
                                strokeDasharray="7"
                            />
                        )
                    })}

                    {showOptimizationChart && productOptimizationDateList.map(item => {
                        return (
                            <ReferenceArea
                                className={'start-rect'}
                                yAxisId="YAxis-0"
                                x1={(moment(item.started) > moment(selectedRangeDate.startDate)) ? `${moment(item.started).format('YYYY-MM-DD')}T00:00:00.000Z` : `${moment(selectedRangeDate.startDate).format('YYYY-MM-DD')}T00:00:00.000Z`}
                                x2={item.stopped !== null && `${moment(item.stopped).format('YYYY-MM-DD')}T00:00:00.000Z`}
                                fillOpacity={1}
                            />
                        )
                    })}

                    {/*--------------------------------------------------------------*/}
                    {/*---------------------------general line-----------------------*/}
                    {/*--------------------------------------------------------------*/}

                    {/*---------------------------7-day line-----------------------*/}
                    {activeMetrics && activeMetrics.map((metric, index) => (
                        showWeekChart && <Line
                            yAxisId={`YAxis-${index}`}
                            type="monotone"
                            dataKey={`${metric}_7d`}
                            stroke={chartColors[index]}
                            strokeWidth={3}
                            dot={false}
                            filter={'url(#dropshadow)'}
                            animationEasing={animationEasing}
                            animationDuration={animationDuration}
                            isAnimationActive={isAnimationActive}
                        />
                    ))}

                    {/*---------------------------daily line-----------------------*/}
                    {activeMetrics && activeMetrics.map((metric, index) => (
                        showDailyChart && <Line
                            yAxisId={`YAxis-${index}`}
                            type="linear"
                            strokeOpacity={0.8}
                            dataKey={`${metric}`}
                            stroke={chartColors[index]}
                            strokeWidth={2}
                            activeDot={{r: 5}}
                            dot={{r: 3}}
                            animationEasing={animationEasing}
                            animationDuration={animationDuration}
                            isAnimationActive={isAnimationActive}
                        />
                    ))}
                    {/*--------------------------------------------------------------*/}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart
