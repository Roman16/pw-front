import React, {Fragment, useEffect, useState} from 'react';
import {
    LineChart,
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,

    ReferenceArea,
} from 'recharts';
import ChartTooltip from "./ChartTooltip";
import moment from "moment";

const animationDuration = 1000,
    dashedLineAnimationDuration = 1000,
    animationBegin = 1000,
    animationEasing = 'linear',
    isAnimationActive = false;

const Chart = ({
                   data,
                   activeMetrics,
                   showWeekChart,
                   showDailyChart,
                   showOptimizationChart,
                   selectedRangeDate,
                   productOptimizationDateList
               }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        setChartData(data.map(item => {
            if (`${moment().tz('America/Los_Angeles').format('YYYY-MM-DD')}T00:00:00.000Z` === `${moment(item.date).format('YYYY-MM-DD')}T00:00:00.000Z` || `${moment().tz('America/Los_Angeles').subtract(1, "days").format('YYYY-MM-DD')}T00:00:00.000Z` === `${moment(item.date).format('YYYY-MM-DD')}T00:00:00.000Z` || `${moment().tz('America/Los_Angeles').subtract(2, "days").format('YYYY-MM-DD')}T00:00:00.000Z` === `${moment(item.date).format('YYYY-MM-DD')}T00:00:00.000Z`) {
                return ({
                    date: item.date,
                    daily_first_metric_value: null,
                    daily_second_metric_value: null,
                    seven_days_second_metric_value: item.seven_days_second_metric_value,
                    seven_days_first_metric_value: item.seven_days_first_metric_value,


                    dashed_daily_first_metric_value: item.daily_first_metric_value,
                    dashed_daily_second_metric_value: item.daily_second_metric_value,
                })
            } else if (`${moment().tz('America/Los_Angeles').subtract(3, "days").format('YYYY-MM-DD')}T00:00:00.000Z` === `${moment(item.date).format('YYYY-MM-DD')}T00:00:00.000Z`) {
                return ({
                    ...item,
                    dashed_daily_first_metric_value: item.daily_first_metric_value,
                    dashed_daily_second_metric_value: item.daily_second_metric_value,
                })

            } else {
                return item;
            }
        }));
    }, [data]);

    return (
        <div className='main-chart-container'>
            <ResponsiveContainer height='100%' width='100%'>
                <LineChart
                    data={chartData}
                    margin={{top: 50, bottom: 30}}
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
                        dataKey="date"
                        axisLine={false}
                        // interval={2}
                        // angle={50}
                        // dx={15}
                        dy={15}
                        // height={60}
                        // tick={<CustomizedAxisTick/>}
                        tickFormatter={(date) => moment(date).format('MMM DD')}
                    />


                    <YAxis
                        yAxisId="left"
                        axisLine={false}
                        stroke="#82ca9d"
                    />

                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#8884d8"
                        axisLine={false}
                    />

                    <Tooltip
                        isAnimationActive={false}
                        content={
                            <ChartTooltip
                                activeMetrics={activeMetrics}
                                showWeekChart={showWeekChart}
                                showDailyChart={showDailyChart}
                            />
                        }/>


                    {/* Optimization line*/}
                    {showOptimizationChart && productOptimizationDateList.map(item => {
                        return (
                            <ReferenceLine
                                yAxisId={'left'}
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
                                yAxisId={'left'}
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
                                yAxisId="left"
                                x1={(moment(item.started) > moment(selectedRangeDate.startDate)) ? `${moment(item.started).format('YYYY-MM-DD')}T00:00:00.000Z` : `${moment(selectedRangeDate.startDate).format('YYYY-MM-DD')}T00:00:00.000Z`}
                                x2={item.stopped !== null && `${moment(item.stopped).format('YYYY-MM-DD')}T00:00:00.000Z`}
                                fillOpacity={1}
                            />
                        )
                    })}
                    {/*-----------------------------------*/}

                    {(activeMetrics && activeMetrics[0].key && showWeekChart) && <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="seven_days_first_metric_value"
                        stroke="#82ca9d"
                        strokeWidth={3}
                        dot={false}
                        filter={'url(#dropshadow)'}
                        animationEasing={animationEasing}
                        animationDuration={animationDuration}
                        isAnimationActive={isAnimationActive}
                    />}

                    {/*{(activeMetrics && activeMetrics[0].key && showWeekChart) && <Line*/}
                    {/*    yAxisId="left"*/}
                    {/*    type="monotone"*/}
                    {/*    dataKey="dashed_seven_days_first_metric_value"*/}
                    {/*    stroke="#82ca9d"*/}
                    {/*    strokeWidth={3}*/}
                    {/*    dot={false}*/}
                    {/*    filter={'url(#dropshadow)'}*/}
                    {/*    strokeDasharray="7 5"*/}
                    {/*    animationBegin={animationBegin}*/}
                    {/*    animationEasing={animationEasing}*/}
                    {/*    animationDuration={dashedLineAnimationDuration}*/}
                    {/*    isAnimationActive={isAnimationActive}*/}
                    {/*/>}*/}

                    {(activeMetrics && activeMetrics[0].key && showDailyChart) && <Line
                        yAxisId='left'
                        type="linear"
                        strokeOpacity={0.8}
                        dataKey="daily_first_metric_value"
                        stroke="#8FD39D"
                        strokeWidth={2}
                        activeDot={{r: 5}}
                        dot={{r: 3}}
                        animationEasing={animationEasing}
                        animationDuration={animationDuration}
                        isAnimationActive={isAnimationActive}
                    />}
                    {(activeMetrics && activeMetrics[0].key && showDailyChart) && <Line
                        yAxisId='left'
                        type="linear"
                        strokeOpacity={0.8}
                        dataKey="dashed_daily_first_metric_value"
                        stroke="#8FD39D"
                        strokeWidth={2}
                        activeDot={{r: 5}}
                        dot={{r: 3}}
                        strokeDasharray="7 5"
                        animationBegin={animationBegin}
                        animationEasing={animationEasing}
                        animationDuration={dashedLineAnimationDuration}
                        isAnimationActive={isAnimationActive}

                    />}

                    {(activeMetrics && activeMetrics[1].key && showWeekChart) && <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="seven_days_second_metric_value"
                        stroke="#8884d8"
                        strokeWidth={3}
                        dot={false}
                        filter={'url(#dropshadow)'}
                        animationEasing={animationEasing}
                        animationDuration={animationDuration}
                        isAnimationActive={isAnimationActive}
                    />}

                    {/*{(activeMetrics && activeMetrics[1].key && showWeekChart) && <Line*/}
                    {/*    yAxisId="right"*/}
                    {/*    type="monotone"*/}
                    {/*    dataKey="dashed_seven_days_second_metric_value"*/}
                    {/*    stroke="#8884d8"*/}
                    {/*    strokeWidth={3}*/}
                    {/*    dot={false}*/}
                    {/*    filter={'url(#dropshadow)'}*/}
                    {/*    strokeDasharray="7 5"*/}
                    {/*    animationBegin={animationBegin}*/}
                    {/*    animationEasing={animationEasing}*/}
                    {/*    animationDuration={dashedLineAnimationDuration}*/}
                    {/*    isAnimationActive={isAnimationActive}*/}
                    {/*/>}*/}

                    {(activeMetrics && activeMetrics[1].key && showDailyChart) && <Line
                        yAxisId='right'
                        type="linear"
                        strokeOpacity={0.5}
                        dataKey="daily_second_metric_value"
                        stroke="#6D6DF6"
                        strokeWidth={2}
                        activeDot={{r: 5}}
                        dot={{r: 3}}
                        animationEasing={animationEasing}
                        animationDuration={animationDuration}
                        isAnimationActive={isAnimationActive}
                    />}

                    {(activeMetrics && activeMetrics[1].key && showDailyChart) && <Line
                        yAxisId='right'
                        type="linear"
                        strokeOpacity={0.5}
                        dataKey="dashed_daily_second_metric_value"
                        stroke="#6D6DF6"
                        strokeWidth={2}
                        activeDot={{r: 5}}
                        dot={{r: 3}}
                        strokeDasharray="7 5"
                        animationBegin={animationBegin}
                        animationEasing={animationEasing}
                        animationDuration={dashedLineAnimationDuration}
                        isAnimationActive={isAnimationActive}
                    />}

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
