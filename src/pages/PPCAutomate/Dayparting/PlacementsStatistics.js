import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import upGreenIcon from '../../../assets/img/icons/metric-arrows/up-green-arrow.svg';
import downBlackIcon from '../../../assets/img/icons/metric-arrows/down-black-arrow.svg';
import moment from "moment";

const data = [
    {
        name: '2020-01-13T16:28:02', top_search: 4034, product: 2036, rest_search: 4054,
    },
    {
        name: '2020-01-14T16:28:02', top_search: 3047, product: 1078, rest_search: 6034,
    },
    {
        name: '2020-01-15T16:28:02', top_search: 2034, product: 7046, rest_search: 1034,
    },
    {
        name: '2020-01-16T16:28:02', top_search: 887, product: 256, rest_search: 508,
    },
    {
        name: '2020-01-17T16:28:02', top_search: 3087, product: 1034, rest_search: 6077,
    },
    {
        name: '2020-01-18T16:28:02', top_search: 2087, product: 7023, rest_search: 5609,
    },
    {
        name: '2020-01-19T16:28:02', top_search: 2534, product: 2523, rest_search: 5023,
    },
];

const chartLabel = {
    top_search: 'Top of search',
    product: 'Product pages',
    rest_search: 'Rest of search'
};

const chartColors = [
    {
        stroke: '#6D6DF6',
        fill: '#A1A1F9'
    },
    {
        stroke: '#EC7F5C',
        fill: '#F3AD97'
    },
    {
        stroke: '#F1C75C',
        fill: '#F6DB97'
    }
];

const ChartTooltip = ({payload}) => {
    if (payload.length > 0) {
        const total = payload.reduce((result, entry) => (result + entry.value), 0);

        return (
            <div className='area-chart-tooltip'>
                <h3>{moment(payload[0].payload.name).format('DD MMMM YYYY')}</h3>

                <div className='content'>
                    {payload.map((entry, index) => (
                        <div key={`item-${index}`}>
                            <div className='name'>
                                <div style={{background: entry.color}}/>
                                {chartLabel[entry.name]}
                            </div>

                            <div className='percent'>
                                {getPercent(entry.value, total)}
                            </div>

                            <div className='value'>
                                ({entry.value})
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return '';
    }
};

const CustomizedAxisTick = ({x, y, payload}) => {
    if (payload.index === 0) {
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={65} y={0} dy={16} textAnchor="end"
                      fill="#666">{moment(payload.value).format('DD MMM YY')}</text>
            </g>
        );
    } else {
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end"
                      fill="#666">{moment(payload.value).format('DD MMM YY')}</text>
            </g>
        );
    }
};

const getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0;

    return toPercent(ratio, 2);
};

const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

const PlacementsStatistics = () => {
    return (
        <section className='placements-statistics'>
            <div className="section-header">
                <h2>Placements</h2>

                <div className="chart-legend">
                    <div>
                        <div className='col'>
                            <div className='example' style={{background: chartColors[0].fill}}/>
                            <img src={downBlackIcon} alt=""/>
                        </div>

                        <div className='col'>
                            <div className="chart-name">
                                Top of search
                            </div>

                            <div className='changes-value'>
                                20%
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='col'>
                            <div className='example' style={{background: chartColors[1].fill}}/>
                            <img src={upGreenIcon} alt=""/>
                        </div>

                        <div className='col'>
                            <div className="chart-name">
                                Product pages
                            </div>

                            <div className='changes-value'>
                                4%
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='col'>
                            <div className='example' style={{background: chartColors[2].fill}}/>
                            <img src={upGreenIcon} alt=""/>
                        </div>

                        <div className='col'>
                            <div className="chart-name">
                                Rest of search
                            </div>

                            <div className='changes-value'>
                                0%
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='chart'>
                <ResponsiveContainer height={205} width='99%' className='responsive-bar-container'>
                    <AreaChart
                        width={400}
                        height={400}
                        data={data}
                        stackOffset="expand"
                        isAnimationActive={false}
                        margin={{
                            top: 10, right: 5, left: -20, bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient spreadMethod="pad" id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor='rgb(161, 161, 249)' stopOpacity='1'/>
                                <stop offset="100%" stopColor='rgba(161, 161, 249, 0)' stopOpacity='0'/>
                            </linearGradient>

                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#F3AD97"/>
                                <stop offset="100%" stopColor="rgba(243, 173, 151, 0)"/>
                            </linearGradient>

                            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#F6DB97"/>
                                <stop offset="100%" stopColor="rgba(246, 219, 151, 0)"/>
                            </linearGradient>
                        </defs>

                        <CartesianGrid vertical={false} stroke={'rgba(101, 106, 132, 0.2)'}/>

                        <YAxis
                            tickFormatter={toPercent}
                            interval={1}
                        />

                        <XAxis
                            minTickGap={2}
                            tickSize={9}
                            dataKey="name"
                            interval={5}
                            padding={{left: 10, right: 10}}
                            tick={<CustomizedAxisTick/>}
                        />

                        <Tooltip
                            isAnimationActive={false}
                            content={
                                <ChartTooltip/>
                            }
                        />

                        <Area
                            type="linear"
                            dataKey="top_search"
                            stackId="1"
                            stroke={chartColors[0].stroke}
                            fill="url(#colorUv)"
                            fillOpacity={1}
                            isAnimationActive={false}
                            activeDot={{stroke: chartColors[0].stroke, strokeWidth: 2}}
                        />

                        <Area
                            type="linear"
                            dataKey="product"
                            stackId="1"
                            stroke={chartColors[1].stroke}
                            fill="url(#colorPv)"
                            fillOpacity={1}
                            isAnimationActive={false}
                            activeDot={{stroke: chartColors[1].stroke, strokeWidth: 2}}
                        />

                        <Area
                            type="linear"
                            dataKey="rest_search"
                            stackId="1"
                            stroke={chartColors[2].stroke}
                            fill="url(#colorAmt)"
                            fillOpacity={1}
                            isAnimationActive={false}
                            activeDot={{stroke: chartColors[2].stroke, strokeWidth: 2}}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </section>
    )
};

export default PlacementsStatistics;
