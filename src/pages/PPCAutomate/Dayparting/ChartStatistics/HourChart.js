import React, {Fragment, useState} from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart
} from "recharts";
import {colorList} from "../colorList";
import {metricsList} from "../metricsList";

const CustomBar = (props) => {
    const {
        fill, x, y, width, height,
    } = props;

    if (height && height !== 0) {
        return (
            <path
                d={`M${x},${y + 5} q0,-5 5,-5 h${width - 10} q5,0 5,5 v${height - 5} h-${width} z`}
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

const HourChart = ({filteredMetric}) => {
    const [focusBar, setFocusBar] = useState(null);

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
                        interval={2}
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

export default HourChart;
