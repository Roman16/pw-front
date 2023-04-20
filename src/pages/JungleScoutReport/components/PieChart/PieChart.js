import React from "react"
import {PieChart as Chart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart} from 'recharts'

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const PieChart = ({ data, dataKey}) => {
    return (<div className="pie-chart-container">
        <ResponsiveContainer height='100%' width='100%'>
            <Chart>
                <Pie
                    isAnimationActive={false}
                    data={data}
                    innerRadius={60}
                    outerRadius={150}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey={dataKey}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getRandomColor()}/>
                    ))}

                    <Tooltip
                        isAnimationActive={false}
                    />
                </Pie>
            </Chart>
        </ResponsiveContainer>
    </div>)
}