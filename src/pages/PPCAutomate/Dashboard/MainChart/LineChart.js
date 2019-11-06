import React, {PureComponent} from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Jun 1', Clicks : 4000, CTR: 300, amt: 2500,
    },
    {
        name: 'Jun 2', Clicks : 3000, CTR: 2098, amt: 2210,
    },
    {
        name: 'Jun 3', Clicks : 2000, CTR: 2300, amt: 2290,
    },
    {
        name: 'Jun 4', Clicks : 2780, CTR: 3908, amt: 2000,
    },
    {
        name: 'Jun 5', Clicks : 2890, CTR: 4800, amt: 2181,
    },
    {
        name: 'Jun 6', CTR: 3800, amt: 2500,
    },
    {
        name: 'Jun 7', CTR: 4300, amt: 2100,
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
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis yAxisId="left"/>
                    <YAxis yAxisId="right" orientation="right"/>
                    <Tooltip />
                    <Legend verticalAlign="top" align='right' height={36}/>
                    <Line yAxisId="left" type="linear" dataKey="Clicks" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line yAxisId="right" type="monotone" dataKey="CTR" stroke="#82ca9d" strokeWidth={3}  dot={false}/>

                </LineChart>
            </ResponsiveContainer>
        );
    }
}

export default Chart;