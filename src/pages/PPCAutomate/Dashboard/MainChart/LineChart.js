import React, {useEffect} from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import ChartTooltip from "./ChartTooltip";
import moment from "moment";

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

    // const svg = document.querySelector('svg.recharts-surface');
    // const line = document.querySelectorAll('.recharts-line-curve');
    //
    // const defs = document.createElementNS('http://www.w3.org/2000/svg', "defs");
    //
    // defs.innerHTML = '<filter id="f2" x="0" y="0" width="200%" height="200%">\n' +
    //     '      <feOffset result="offOut" in="SourceGraphic" dx="0" dy="20" />\n' +
    //     '      <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />\n' +
    //     '      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />\n' +
    //     '    </filter>';
    //
    //
    // svg && svg.appendChild(defs);
    //
    // line.forEach(item => {
    //     item.setAttribute('filter', 'url(#f2)');
    // });

    return (
        <ResponsiveContainer height='80%' width='100%'>
            <LineChart
                data={Array.isArray(data) ? data : []}
                margin={{top: 10, bottom: 10}}
            >
                <CartesianGrid
                    vertical={false}
                    stroke="#DBDCE2"
                />

                {/*<Customized component={(props) => console.log(props)} />*/}

                <XAxis
                    dataKey="date"
                    axisLine={false}
                    // interval={0}
                    // angle={50}
                    // dx={15}
                    // dy={2}

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

                {(activeMetrics && activeMetrics[0].key && showWeekChart) && <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="seven_days_first_metric_value"
                    stroke="#82ca9d"
                    strokeWidth={3}
                    dot={false}
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
    );
};

export default Chart;
