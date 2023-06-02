import React from "react"
import {PieChart as Chart, Pie, ResponsiveContainer, Tooltip, Cell, Treemap} from 'recharts'
import {numberMask} from "../../../../utils/numberMask"
import {round} from "../../../../utils/round"

export const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const ChartTooltip = ({payload}) => {
    if (payload && payload.length > 0) {
        return (
            <div className='pie-chart-tooltip'>
                <div className="content">
                    <div className="name">
                        {payload[0].name}:
                    </div>

                    <div className="value">
                        {round(payload[0].value, 2)}
                    </div>
                </div>
            </div>
        )
    } else {
        return ''
    }
}

export const PieChart = ({data, dataKey, nameKey, fill}) =>
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
                >
                    {data.map((entry, index) => {
                        return(
                            <Cell key={`cell-${index}`} fill={fill} opacity={(100 - index) / 100}/>
                        )
                    } )}
                </Pie>

                <Tooltip
                    isAnimationActive={false}
                    content={
                        <ChartTooltip/>
                    }
                />
            </Chart>
        </ResponsiveContainer>
    </div>
