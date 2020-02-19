import React from "react";
import {
    XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid
} from 'recharts';
import moment from "moment";
import {numberMask} from "../../../../utils/numberMask";
import {round} from "../../../../utils/round";


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
];

const ChartTooltip = ({payload, firstMetric, secondMetric}) => {
    if (payload && payload.length > 0) {
        return (
            <div className='chart-tooltip twice-metrics'>
                <div className='ant-popover-inner-content'>
                    <h3>{weakDays[moment(payload[0].payload.date).day()].date}</h3>

                    <div className="row">
                        <div className="col fills">
                            <div className='example-fill' style={{background: '#82ca9d'}}/>

                            {secondMetric.key !== 'nothing' &&
                            <div className='example-fill' style={{background: '#8884d8'}}/>}
                        </div>

                        <div className="col metrics-name">
                            <span className='selected-metric'>{firstMetric.title}</span>

                            {secondMetric.key !== 'nothing' &&
                            <span className='selected-metric'>{secondMetric.title}</span>}
                        </div>

                        <div className="col values">
                            <div className="value">
                                {firstMetric.type === 'currency' ? `$${numberMask(payload[0].payload[firstMetric.key], 2)}` : (firstMetric.type === 'percent' ? `${round(payload[0].payload[firstMetric.key], 2)} %` : round(payload[0].payload[firstMetric.key], 2))}
                            </div>

                            {secondMetric.key !== 'nothing' && <div className="value">
                                {secondMetric.type === 'currency' ? `$${numberMask(payload[0].payload[secondMetric.key], 2)}` : (secondMetric.type === 'percent' ? `${round(payload[0].payload[secondMetric.key], 2)} %` : round(payload[0].payload[secondMetric.key], 2))}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return '';
    }
};


const DayChart = ({data, firstMetric, secondMetric}) => {
    return (
        <div className={'chart-block day-chart'}>
            <ResponsiveContainer height='99%' width='100%'>
                <LineChart
                    data={data}
                    margin={{
                        top: 25, right: -10, left: -10, bottom: 0,
                    }}
                >
                    <CartesianGrid
                        vertical={false}
                        stroke="#DBDCE2"
                    />

                    <XAxis
                        axisLine={false}
                        dataKey="date"
                        tickFormatter={(date) => weakDays[moment(date).day()].date[0]}
                    />

                    <YAxis
                        axisLine={false}
                        yAxisId="left"
                        stroke="#82ca9d"
                    />

                    <YAxis
                        axisLine={false}
                        stroke="#8884d8"
                        yAxisId="right"
                        orientation="right"
                    />

                    <Tooltip
                        isAnimationActive={false}
                        content={
                            <ChartTooltip
                                firstMetric={firstMetric}
                                secondMetric={secondMetric}
                            />
                        }
                    />

                    <Line
                        dot={false}
                        isAnimationActive={false}
                        yAxisId="left"
                        dataKey={firstMetric.key}
                        stroke="#82ca9d"
                        activeDot={{r: 4}}
                    />

                    {secondMetric.key !== 'nothing' && <Line
                        dot={false}
                        isAnimationActive={false}
                        yAxisId="right"
                        dataKey={secondMetric.key}
                        stroke="#8884d8"
                        activeDot={{r: 4}}
                    />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
};

export default DayChart;
