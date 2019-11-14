import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import ChartTooltip from "./ChartTooltip";
import moment from "moment";

const Chart = ({
                   data,
                   activeMetrics,
                   showWeekChart,
                   showDailyChart
               }) => {
    return (
        <ResponsiveContainer height='80%' width='100%'>

            <LineChart
                data={data}
                margin={{ top: 10}}
            >
                <CartesianGrid
                    vertical={false}
                    stroke="#DBDCE2"
                />

                <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickFormatter={(date) => moment(date).format('MMM DD')}
                />

                <YAxis
                    yAxisId="left"
                    axisLine={false}
                />

                <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                />

                <Tooltip content={
                    <ChartTooltip
                        activeMetrics={activeMetrics}
                        showWeekChart={showWeekChart}
                        showDailyChart={showDailyChart}
                    />
                }/>

                {(activeMetrics && activeMetrics[0].key && showWeekChart) && <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="week_first_metric"
                    stroke="#82ca9d"
                    strokeWidth={3}
                    dot={false}
                />}

                {(activeMetrics && activeMetrics[0].key && showDailyChart) && <Line
                    yAxisId='left'
                    type="linear"
                    strokeOpacity={0.5}
                    dataKey="daily_first_metric"
                    stroke="#8FD39D"
                    strokeWidth={2}
                    activeDot={{r: 5}}
                    dot={{r: 3}}
                />}


                {(activeMetrics && activeMetrics[1].key && showWeekChart) && <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="week_second_metric"
                    stroke="#8884d8"
                    strokeWidth={3}
                    dot={false}
                />}

                {(activeMetrics && activeMetrics[1].key && showDailyChart) && <Line
                    yAxisId='right'
                    type="linear"
                    strokeOpacity={0.5}
                    dataKey="daily_second_metric"
                    stroke="#6D6DF6"
                    strokeWidth={2}
                    activeDot={{r: 5}}
                    dot={{r: 3}}
                />}

                {/*<Line*/}
                {/*    yAxisId="right"*/}
                {/*    type="monotone"*/}
                {/*    dataKey="uv"*/}
                {/*    stroke="#82ca9d"*/}
                {/*    strokeWidth={3}*/}
                {/*    dot={false}*/}
                {/*/>*/}

                {/*<Line*/}
                {/*    yAxisId='left'*/}
                {/*    type="monotone"*/}
                {/*    strokeOpacity={0.1}*/}
                {/*    dataKey="cnt"*/}
                {/*    strokeWidth={5}*/}
                {/*    stroke="#82ca9d"*/}
                {/*    dot={false}*/}
                {/*/>*/}


            </LineChart>
        </ResponsiveContainer>
    );
};

export default Chart;
