import React from "react";
import {
    XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid
} from 'recharts';

const ChartTooltip = ({payload, firstMetric, secondMetric}) => {
    if (payload.length > 0) {

        return (
            <div className='chart-tooltip twice-metrics'>
                <div className='ant-popover-inner-content'>
                    <h3>{payload[0].payload.name}</h3>

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
                                {firstMetric.type === 'currency' ? `$${payload[0].value}` : (firstMetric.type === 'percent' ? `${payload[0].value} %` : payload[0].value)}
                            </div>

                            {secondMetric.key !== 'nothing' && <div className="value">
                                {secondMetric.type === 'currency' ? `$${payload[1].value}` : (secondMetric.type === 'percent' ? `${payload[0].value} %` : payload[0].value)}
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

const data = [
    {
        name: 'Sunday', clicks: 140, test: 890
    },
    {
        name: 'Monday', clicks: 150, test: 490
    },
    {
        name: 'Tuesday', clicks: 289, test: 990
    },
    {
        name: 'Wednesday', clicks: 1228, test: 890
    },
    {
        name: 'Thursday', clicks: 1280, test: 390
    },
    {
        name: 'Friday', clicks: 110, test: 790
    },
    {
        name: 'Saturday', clicks: 170, test: 890
    },
];

const DayChart = ({firstMetric, secondMetric}) => {
    return (
        <div className='chart-block day-chart'>
            <ResponsiveContainer height='100%' width='100%'>
                <LineChart
                    data={data}
                    margin={{
                        top: 25, right: -15, left: -15, bottom: 0,
                    }}
                >
                    <CartesianGrid
                        vertical={false}
                        stroke="#DBDCE2"
                    />

                    <XAxis
                        axisLine={false}
                        dataKey="name"
                        tickFormatter={(date) => date[0]}
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
                        dataKey="clicks"
                        stroke="#82ca9d"
                        activeDot={{r: 4}}
                    />

                    {secondMetric.key !== 'nothing' && <Line
                        dot={false}
                        isAnimationActive={false}
                        yAxisId="right"
                        dataKey="test"
                        stroke="#8884d8"
                        activeDot={{r: 4}}
                    />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
};

export default DayChart;
