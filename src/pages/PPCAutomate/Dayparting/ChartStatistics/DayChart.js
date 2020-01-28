import React, {useEffect, useState} from "react";
import {
    BarChart, Cell, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Text, LineChart, Line, CartesianGrid
} from 'recharts';
import {metricsList} from "../metricsList";
import moment from "moment";

const CustomBar = (props) => {
    const {
        fill, x, y, width, height,
    } = props;

    if (height && height !== 0) {
        return (
            <path
                d={`M${x + 20},${y + 5} q0,-5 5,-5 h${width - 10} q5,0 5,5 v${height - 10} q0,5 -5,5 h-${width - 10} q-5,0 -5,-5 Z`}
                fill={fill}
            />
        );
    } else {
        return 0
    }
};

const ChartTooltip = ({payload, metric}) => {
    if (payload.length > 0) {
        const selectedMetric = metricsList.find(item => item.key === metric);

        return (
            <div className='chart-tooltip'>
                <div className='ant-popover-inner-content'>
                    <h3>{payload[0].payload.name}</h3>
                    <span className='selected-metric'>{selectedMetric.title}</span>
                    <div className="value">
                        <div style={{background: '#6D6DF6'}}/>

                        {selectedMetric.type === 'currency' ? `${payload[0].value}$` : (selectedMetric.type === 'percent' ? `${payload[0].value} %` : payload[0].value)}

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


const CustomizedAxisTick = (props) => {
    if (props.index === 1) {
        return <Text {...props} x={17} textLength={30} text-anchor="middle"
                     alignment-baseline="central">{props.payload.value[0]}</Text>;
    } else if (props.index === 3) {
        return <Text {...props} x={18} textLength={30} text-anchor="middle"
                     alignment-baseline="central">{props.payload.value[0]}</Text>;
    } else {
        return <Text {...props} x={15} textLength={30} text-anchor="middle"
                     alignment-baseline="central">{props.payload.value[0]}</Text>;
    }
};

const DayChart = ({filteredMetric}) => {
    const [focusBar, setFocusBar] = useState(null);

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
                        content={
                            <ChartTooltip
                                metric={filteredMetric}
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

                    <Line
                        dot={false}
                        isAnimationActive={false}
                        yAxisId="right"
                        dataKey="test"
                        stroke="#8884d8"
                        activeDot={{r: 4}}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
};

export default DayChart;
