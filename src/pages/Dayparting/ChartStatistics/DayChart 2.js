import React from "react";
import {
    XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid
} from 'recharts';
import moment from "moment";
import {numberMask} from "../../../utils/numberMask";
import {round} from "../../../utils/round";


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
                    <h3 className='border-title'>{`${weakDays[moment(payload[0].payload.date).day()].date}, ${moment(payload[0].payload.date).format('MMMM DD')}`}</h3>

                    <div className="row">
                        <div className="col fills">
                            {firstMetric.key !== 'nothing' && <div className='example-fill' style={{background: '#9464B9'}}/>}

                            {secondMetric.key !== 'nothing' &&
                            <div className='example-fill' style={{background: '#FF5256'}}/>}
                        </div>

                        <div className="col metrics-name">
                            {firstMetric.key !== 'nothing' && <span className='selected-metric'>{firstMetric.title}</span>}


                            {secondMetric.key !== 'nothing' &&
                            <span className='selected-metric'>{secondMetric.title}</span>}
                        </div>

                        <div className="col values">
                            {firstMetric.key !== 'nothing' && <div className="value" style={{color: '#9464B9'}}>
                                {firstMetric.type === 'currency' ? `$${numberMask(payload[0].payload[firstMetric.key], 2)}` : (firstMetric.type === 'percent' ? `${round(payload[0].payload[firstMetric.key], 3)} %` : round(payload[0].payload[firstMetric.key], 2))}
                            </div>}

                            {secondMetric.key !== 'nothing' && <div className="value" style={{color: '#FF5256'}}>
                                {secondMetric.type === 'currency' ? `$${numberMask(payload[0].payload[secondMetric.key], 2)}` : (secondMetric.type === 'percent' ? `${round(payload[0].payload[secondMetric.key], 3)} %` : round(payload[0].payload[secondMetric.key], 2))}
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
                        stroke="#9464B9"
                        tickFormatter={(data) => round(data, 3)}
                    />

                    <YAxis
                        axisLine={false}
                        stroke="#FF5256"
                        yAxisId="right"
                        orientation="right"
                        tickFormatter={(data) => round(data, 3)}
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
                        dot={{r: 2}}
                        isAnimationActive={false}
                        yAxisId="left"
                        dataKey={firstMetric.key}
                        stroke="#9464B9"
                        activeDot={{r: 4}}
                    />

                    {secondMetric.key !== 'nothing' && <Line
                        dot={{r: 2}}
                        isAnimationActive={false}
                        yAxisId="right"
                        dataKey={secondMetric.key}
                        stroke="#FF5256"
                        activeDot={{r: 4}}
                    />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
};

export default DayChart;
