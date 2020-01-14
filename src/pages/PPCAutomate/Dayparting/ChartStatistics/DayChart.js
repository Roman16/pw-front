import React, {useEffect, useState} from "react";
import {
    BarChart, Cell, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Text
} from 'recharts';
import {metricsList} from "../metricsList";

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
        name: 'Sunday', clicks: 140,
    },
    {
        name: 'Monday', clicks: 150,
    },
    {
        name: 'Tuesday', clicks: 289,
    },
    {
        name: 'Wednesday', clicks: 1228,
    },
    {
        name: 'Thursday', clicks: 1280,
    },
    {
        name: 'Friday', clicks: 110,
    },
    {
        name: 'Saturday', clicks: 170,
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
            <ResponsiveContainer height='100%' width='99%'
                                 className='responsive-bar-container'>
                <BarChart
                    layout="vertical"
                    height={230}
                    data={data}
                    isAnimationActive={false}
                    onMouseMove={state => {
                        if (state.isTooltipActive) {
                            setFocusBar(state.activeTooltipIndex);
                        } else {
                            setFocusBar(null);
                        }
                    }}
                    onMouseLeave={() => setFocusBar(null)}
                    margin={{
                        top: 20,
                        left: -50
                    }}
                >
                    <XAxis type="number" hide={true}/>

                    <YAxis
                        dataKey="name"
                        type="category"
                        width={80}
                        tick={<CustomizedAxisTick/>}
                        interval={0}
                    />

                    <Tooltip
                        cursor={false}
                        isAnimationActive={false}
                        content={
                            <ChartTooltip
                                metric={filteredMetric}
                            />
                        }
                    />

                    <Bar
                        dataKey="clicks"
                        barSize={window.devicePixelRatio === 2 ? 15 : 20}
                        fill=""
                        shape={<CustomBar/>}
                        isAnimationActive={false}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`}
                                  fill={focusBar === index ? '#6D6DF6' : 'rgba(109, 109, 246, 0.5)'}/>
                        ))}
                    </Bar>

                </BarChart>
            </ResponsiveContainer>
        </div>
    )
};

export default DayChart;
