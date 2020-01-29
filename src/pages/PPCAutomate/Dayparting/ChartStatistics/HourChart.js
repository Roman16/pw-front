import React from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Text
} from "recharts";


const ChartTooltip = ({payload, firstMetric, secondMetric}) => {
    if (payload.length > 0) {
        return (
            <div className='chart-tooltip twice-metrics'>
                <div className='ant-popover-inner-content'>
                    <h3>{payload[0].payload.name}</h3>

                    <div className="row">
                        <div className='example-fill' style={{background: '#82ca9d'}}/>
                        <span className='selected-metric'>{firstMetric.title}</span>

                        <div className="value">
                            {firstMetric.type === 'currency' ? `${payload[0].value}$` : (firstMetric.type === 'percent' ? `${payload[0].value} %` : payload[0].value)}
                        </div>
                    </div>

                    {secondMetric.key !== 'nothing' && <div className="row">
                        <div className='example-fill' style={{background: '#8884d8'}}/>
                        <span className='selected-metric'>{secondMetric.title}</span>

                        <div className="value">
                            {secondMetric.type === 'currency' ? `${payload[1].value}$` : (secondMetric.type === 'percent' ? `${payload[0].value} %` : payload[0].value)}
                        </div>
                    </div>}
                </div>
            </div>
        )
    } else {
        return '';
    }
};

const data = [
    {
        name: '01 AM', clicks: 1400, test: 4890
    },
    {
        name: '02 AM', clicks: 1506, test: 4890
    },
    {
        name: '03 AM', clicks: 989, test: 2890
    },
    {
        name: '04 AM', clicks: 1228, test: 4890
    },
    {
        name: '05 AM', clicks: 1100, test: 2890
    },
    {
        name: '06 AM', clicks: 1700, test: 4890
    },
    {
        name: '07 AM', clicks: 1700, test: 2890
    },
    {
        name: '08 AM', clicks: 1700, test: 4890
    },
    {
        name: '09 AM', clicks: 1700, test: 4890
    },
    {
        name: '10 AM', clicks: 1700, test: 4890
    },
    {
        name: '11 AM', clicks: 1700, test: 4890
    },
    {
        name: '12 PM', clicks: 1700, test: 4890
    },
    {
        name: '01 PM', clicks: 1400, test: 4890
    },
    {
        name: '02 PM', clicks: 1506, test: 3890
    },
    {
        name: '03 PM', clicks: 989, test: 4890
    },
    {
        name: '04 PM', clicks: 1228, test: 3890
    },
    {
        name: '05 PM', clicks: 1100, test: 7890
    },
    {
        name: '06 PM', clicks: 1700, test: 4890
    },
    {
        name: '07 PM', clicks: 1700, test: 7890
    },
    {
        name: '08 PM', clicks: 1700, test: 4890
    },
    {
        name: '09 PM', clicks: 1700, test: 3890
    },
    {
        name: '10 PM', clicks: 1700, test: 4890
    },
    {
        name: '11 PM', clicks: 1700, test: 5890
    },
    {
        name: '12 AM', clicks: 1700, test: 5890
    },
];

const CustomizedAxisTick = (props) => {
    if (props.index === 0 || props.index % 4 === 0 || props.index === 23) {
        return <Text {...props} textLength={30} text-anchor="middle"
                     alignment-baseline="central">{props.payload.value}</Text>;
    } else {
        return '';
    }
};

const HourChart = ({firstMetric, secondMetric}) => {
    return (
        <div className='chart-block hour-chart'>
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
                        interval={0}
                        tick={<CustomizedAxisTick/>}
                        axisLine={false}
                        dataKey="name"
                        tickFormatter={(date) => date}
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

export default HourChart;
