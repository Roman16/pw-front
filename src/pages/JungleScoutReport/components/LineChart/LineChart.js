import React, {useEffect, useState} from 'react'
import {
    LineChart as Chart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    ReferenceArea,
} from 'recharts'
import moment from "moment"
import _ from "lodash"
import {activeTimezone} from "../../../index"
import {analyticsAvailableMetricsList} from "../../../AnalyticsV3/components/MainMetrics/metricsList"
import ChartTooltip from "../../../AnalyticsV3/components/MainChart/ChartTooltip"

const animationDuration = 1000,
    animationEasing = 'linear',
    isAnimationActive = false

const chartColors = ['#FF5256', '#9464B9', '#FFAF52', '#7FD3A1']


export const LineChart = ({
                              data,
                              activeMetrics = [],
                              showWeekChart,
                              showDailyChart,
                              showOptimizationChart,
                              selectedRangeDate,
                              productOptimizationDateList,
                              dataKey = 'eventDate'
                          }) => {

    return (
        <div className='line-chart-container'>
            <ResponsiveContainer height='100%' width='100%'>
                <Chart
                    data={data}
                    margin={activeMetrics.filter(item => item !== null).length === 0 ?
                        {top: 30, bottom: 20, left: 50, right: 50}
                        :
                        {top: 30, bottom: 20, left: 10, right: 10}
                    }
                >
                    {/*----------------------------------------------------------------*/}
                    {/*filters*/}

                    <filter id="dropshadow" height="130%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
                        <feOffset dx="2" dy="10" result="offsetblur"/>
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.3"/>
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
                        dataKey={dataKey}
                        axisLine={false}
                        // interval={2}
                        // angle={50}
                        // dx={15}
                        dy={15}
                        // height={60}
                        // tick={<CustomizedAxisTick/>}
                        tickFormatter={(date) => dataKey === 'year_month' ? moment(date, 'YYYY-MM').format('MMM') : moment(date).format('MMM DD')}
                    />

                    {activeMetrics && activeMetrics.map((item, index) => (
                        item !== null && <YAxis
                            yAxisId={`YAxis-${index}`}
                            orientation={!!((index) % 2) ? 'right' : 'left'}
                            stroke={chartColors[index]}
                            axisLine={false}
                            type="number"
                        />
                    ))}

                    {activeMetrics.filter(item => item !== null).length !== 0 && <Tooltip
                        isAnimationActive={false}
                        content={
                            <ChartTooltip
                                activeMetrics={activeMetrics.map(key => _.find(analyticsAvailableMetricsList, {key: key}))}
                                showWeekChart={showWeekChart}
                                showDailyChart={showDailyChart}
                                chartColors={chartColors}
                            />
                        }/>}


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
                            strokeOpacity={0.75}
                            dataKey={`${metric}`}
                            stroke={chartColors[index]}
                            strokeWidth={2}
                            activeDot={{r: 5}}
                            dot={{r: 2}}
                            animationEasing={animationEasing}
                            animationDuration={animationDuration}
                            isAnimationActive={isAnimationActive}
                        />
                    ))}
                    {/*--------------------------------------------------------------*/}
                </Chart>
            </ResponsiveContainer>
        </div>
    )
}
