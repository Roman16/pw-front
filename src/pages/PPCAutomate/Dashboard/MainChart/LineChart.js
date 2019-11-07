import React, {PureComponent} from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Jun 1', Clicks: 4000, CTR: 3000, uv: 1590, cnt: 4450
    },
    {
        name: 'Jun 2', Clicks: 3000, CTR: 2098, uv: 1690, cnt: 2450
    },
    {
        name: 'Jun 3', Clicks: 2000, CTR: 2300, uv: 1390, cnt: 3450
    },
    {
        name: 'Jun 4', Clicks: 2780, CTR: 3908, uv: 1890, cnt: 2450
    },
    {
        name: 'Jun 5', Clicks: 2890, CTR: 4800, uv: 1550, cnt: 6450
    },
    {
        name: 'Jun 6', CTR: 3800, cnt: 6554
    },
    {
        name: 'Jun 7', CTR: 4300, cnt: 4567
    },
];

const data2 = [
    {
        name: 'Jun 1', uv: 1590, cnt: 1550
    },
    {
        name: 'Jun 2', uv: 1690, cnt: 1650
    },
    {
        name: 'Jun 3', uv: 1390, cnt: 1350
    },
    {
        name: 'Jun 4', uv: 1890, cnt: 1850
    },
    {
        name: 'Jun 5', uv: 1650, cnt: 1610
    },
    {
        name: 'Jun 6', uv: 1550, cnt: 1510
    },
    {
        name: 'Jun 7', uv: 1350,  cnt: 1310
    },
];


class Chart extends PureComponent {
    render() {
        return (
            <ResponsiveContainer height={500} width='100%'>

                <LineChart
                    width={500}
                    height={300}
                    data={data}
                >
                    <CartesianGrid
                        vertical={false}
                        stroke="#DBDCE2"
                    />

                    <XAxis
                        dataKey="name"
                        axisLine={false}
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

                    <Tooltip/>

                    <Legend verticalAlign="top" align='right' height={36}/>

                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="Clicks"
                        stroke="#8884d8"
                        strokeWidth={3}
                        dot={false}
                    />

                    <Line
                        yAxisId='left'
                        type="linear"
                        strokeOpacity={0.5}
                        dataKey="uv"
                        strokeWidth={2}
                        stroke="#8FD39D"
                        activeDot={{r: 8}}
                    />

                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="CTR"
                        stroke="#82ca9d"
                        strokeWidth={3}
                        dot={false}
                    />

                    <Line
                        yAxisId='left'
                        type="linear"
                        strokeOpacity={0.5}
                        dataKey="cnt"
                        strokeWidth={2}
                        stroke="#6D6DF6"
                        activeDot={{r: 8}}
                    />

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
    }
}

export default Chart;