import React from "react"
import {PieChart as Chart, Pie, Sector, Cell, ResponsiveContainer} from 'recharts'

const data = [
    {name: 'Group A', value: 400},
    {name: 'Group B', value: 300},
    {name: 'Group C', value: 300},
    {name: 'Group D', value: 200},
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export const PieChart = () => {
    return (<div className="pie-chart-container">
        <ResponsiveContainer height='100%' width='100%'>
            <Chart>
                <Pie
                    isAnimationActive={false}
                    data={data}
                    cx={200}
                    cy={200}
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                </Pie>
            </Chart>
        </ResponsiveContainer>
    </div>)
}