import React, {PureComponent, Fragment} from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Text
} from 'recharts';
import ChartTooltip from "./ChartTooltip";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";

const CustomizedAxisTick = (props) => {
    const {
        x, y, stroke, payload,
    } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={20}>{moment(payload.value).format('MMM DD')}</text>
        </g>
    );
};

const ReferenceCustomLabel = props => {
    return (
        <Fragment>
            <text x={props.viewBox.x} y={20} className={'start-optimization'}>
                Optimisation
            </text>
            <text x={props.viewBox.x} y={35} className={'start-optimization'}>
                started
            </text>
        </Fragment>
    )
};

const Chart = ({
                   data,
                   activeMetrics,
                   showWeekChart,
                   showDailyChart,
                   selectedRangeDate,
               }) => {
    //first way
    // const dataWithShadow = data.map(item => ({
    //     ...item,
    //     week_first_metric_shadow: item.week_first_metric - 200,
    //     week_second_metric_shadow: item.week_second_metric - 200,
    // }));
    //
    // const startDate = moment(selectedRangeDate.startDate),
    //     endDate = moment(selectedRangeDate.endDate);
    //
    // let countDays = endDate.diff(startDate, 'days');
    // let allChartValues = [];
    //
    // for (let i = 0; i <= countDays; i++) {
    //     const pickFromApi = data.find(item => moment(item.date).format('YYYY-MM-DD') === moment(startDate).add(i, 'days').format('YYYY-MM-DD'));
    //
    //     if (pickFromApi) {
    //         allChartValues.push({
    //             date: pickFromApi.date,
    //             seven_days_first_metric_value: +pickFromApi.seven_days_first_metric_value,
    //             daily_first_metric_value: +pickFromApi.daily_first_metric_value,
    //             seven_days_second_metric_value: +pickFromApi.seven_days_second_metric_value,
    //             daily_second_metric_value: +pickFromApi.daily_second_metric_value,
    //         })
    //     } else {
    //         allChartValues.push({
    //             date: moment(startDate).add(i, 'days').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    //         })
    //     }
    // }

    //---------------------------
    //second way

    console.log(data);

    return (
        <div className='main-chart-container'>
            <ResponsiveContainer height='100%' width='100%'>
                <LineChart
                    data={Array.isArray(data) ? data : []}
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

                    {/*----------------------------------------------------------------*/}
                    {document.querySelector('.recharts-reference-line-line') && <rect
                        x={document.querySelector('.recharts-reference-line-line').getAttribute('x1')}
                        y="50"
                        width={1565 - +document.querySelector('.recharts-reference-line-line').getAttribute('x1')}
                        height={440 - 50}
                        className={'start-rect'}
                    />}
                    {/*----------------------------------------------------------------*/}
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


                    <ReferenceLine
                        yAxisId={'left'}
                        x={'2020-04-13T00:00:00.000Z'}
                        stroke="#CDFFE2"
                        label={<ReferenceCustomLabel/>}
                        // label={'Test'}
                        strokeWidth={4}
                        strokeDasharray="7"
                    />


                    {(activeMetrics && activeMetrics[0].key && showWeekChart) && <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="seven_days_first_metric_value"
                        stroke="#82ca9d"
                        strokeWidth={3}
                        dot={false}
                        filter={'url(#dropshadow)'}
                        // isAnimationActive={false}
                    />}

                    {(activeMetrics && activeMetrics[0].key && showDailyChart) && <Line
                        yAxisId='left'
                        type="linear"
                        strokeOpacity={0.8}
                        dataKey="daily_first_metric_value"
                        stroke="#8FD39D"
                        strokeWidth={2}
                        activeDot={{r: 5}}
                        dot={{r: 3}}
                        // filter={'url(#dropshadow)'}
                        // isAnimationActive={false}
                    />}

                    {/*{(activeMetrics && activeMetrics[0].key && showWeekChart) && <Line*/}
                    {/*    yAxisId="left"*/}
                    {/*    type="monotone"*/}
                    {/*    dataKey="week_first_metric_shadow"*/}
                    {/*    strokeOpacity={0.4}*/}
                    {/*    stroke="#8FD39D"*/}
                    {/*    strokeWidth={5}*/}
                    {/*    dot={false}*/}
                    {/*    activeDot={{r: 0}}*/}
                    {/*/>}*/}


                    {(activeMetrics && activeMetrics[1].key && showWeekChart) && <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="seven_days_second_metric_value"
                        stroke="#8884d8"
                        strokeWidth={3}
                        dot={false}
                        filter={'url(#dropshadow)'}
                        // isAnimationActive={false}
                    />}

                    {(activeMetrics && activeMetrics[1].key && showDailyChart) && <Line
                        yAxisId='right'
                        type="linear"
                        strokeOpacity={0.5}
                        dataKey="daily_second_metric_value"
                        stroke="#6D6DF6"
                        strokeWidth={2}
                        activeDot={{r: 5}}
                        dot={{r: 3}}
                        // filter={'url(#dropshadow)'}
                        // isAnimationActive={false}
                    />}


                    {/*{(activeMetrics && activeMetrics[1].key && showWeekChart) && <Line*/}
                    {/*    yAxisId='right'*/}
                    {/*    type="monotone"*/}
                    {/*    strokeOpacity={0.4}*/}
                    {/*    dataKey="week_second_metric_shadow"*/}
                    {/*    strokeWidth={5}*/}
                    {/*    stroke="#6D6DF6"*/}
                    {/*    dot={false}*/}
                    {/*    activeDot={{r: 0}}*/}
                    {/*/>}*/}


                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
