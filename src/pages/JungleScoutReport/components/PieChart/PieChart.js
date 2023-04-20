import React from "react"
import {PieChart as Chart, Pie, ResponsiveContainer, Tooltip} from 'recharts'

export const PieChart = ({data, dataKey, nameKey}) =>
    <div className="pie-chart-container">
        <ResponsiveContainer height='100%' width='100%'>
            <Chart>
                <Pie
                    isAnimationActive={false}
                    dataKey={dataKey}
                    nameKey={nameKey}
                    data={data}
                    innerRadius={80}
                    outerRadius={150}
                    fill={'#9464B9'}
                />

                <Tooltip
                    isAnimationActive={false}
                />
            </Chart>
        </ResponsiveContainer>
    </div>
