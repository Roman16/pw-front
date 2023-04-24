import React from 'react'
import {Treemap, ResponsiveContainer, Pie, Tooltip, AreaChart} from 'recharts'
import moment from "moment"
import {RenderMetricValue} from "../../../AnalyticsV3/components/TableList/tableColumns"

const COLORS = ['#9464B9', 'rgba(148,100,185,0.85)', 'rgba(148,100,185,0.75)', 'rgba(148,100,185,0.65)', 'rgba(148,100,185,0.55)', 'rgba(148,100,185,0.45)']

const CustomizedContent = ({root, depth, x, y, width, height, index, payload, colors, rank, name}) => {
    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                    fill: depth < 2 ? colors[Math.floor((index / root.children?.length) * 6)] : '#ffffff00',
                    stroke: '#fff',
                    strokeWidth: 2 / (depth + 1e-10),
                    strokeOpacity: 1 / (depth + 1e-10),
                }}
            />
            {depth === 1 ? (
                <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
                    {name.substring(0, 8)}
                </text>
            ) : null}
        </g>
    )
}

const ChartTooltip = ({payload, label}) => {
    if (payload && payload.length > 0) {
        const product = payload[0].payload

        return (
            <div className='tree-map-chart-tooltip'>
                <div className="content">
                    <div className="name">
                        {product.name}:
                    </div>

                    <div className="value">
                        {product.value}
                    </div>
                </div>
            </div>
        )
    } else {
        return ''
    }
}


export const TreeMapChart = ({data}) =>
    <div className="tree-map-chart-container">
        <ResponsiveContainer width="100%" height="100%">
            <Treemap
                isAnimationActive={false}
                data={data.map(i => ({name: i.product_name, revenue: i.revenue}))}
                dataKey="revenue"
                aspectRatio={4 / 3}
                stroke="#fff"
                fill="#9464B9"
                content={<CustomizedContent colors={COLORS}/>}
            >
                <Tooltip
                    isAnimationActive={false}
                    content={
                        <ChartTooltip/>
                    }
                />
            </Treemap>
        </ResponsiveContainer>
    </div>
