import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import upGreenIcon from '../../../assets/img/icons/metric-arrows/up-green-arrow.svg';
import downBlackIcon from '../../../assets/img/icons/metric-arrows/down-black-arrow.svg';

const data = [
    {
        name: 'Page A', uv: 40, pv: 24, amt: 24,
    },
    {
        name: 'Page B', uv: 30, pv: 13, amt: 22,
    },
    {
        name: 'Page C', uv: 20, pv: 98, amt: 22,
    },
    {
        name: 'Page D', uv: 27, pv: 39, amt: 20,
    },
    {
        name: 'Page E', uv: 18, pv: 48, amt: 21,
    },
    {
        name: 'Page F', uv: 23, pv: 38, amt: 25,
    },
    {
        name: 'Page G', uv: 34, pv: 43, amt: 21,
    },
];

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

const PlacementsStatistics = () => {

    return (
        <section className='placements-statistics'>
            <div className="section-header">
                <h2>Placements</h2>

                <div className="chart-legend">
                    <div>
                        <div className="chart-name">
                            <div style={{background: chartColors[0].fill}}/>
                            Top of search
                        </div>

                        <div className='changes-value'>
                            <img src={downBlackIcon} alt=""/>
                            20%
                        </div>
                    </div>

                    <div>
                        <div className="chart-name">
                            <div style={{background: chartColors[1].fill}}/>
                            Product pages
                        </div>

                        <div className='changes-value'>
                            <img src={upGreenIcon} alt=""/>
                            4%
                        </div>
                    </div>

                    <div>
                        <div className="chart-name">
                            <div style={{background: chartColors[2].fill}}/>
                            Rest of search
                        </div>

                        <div className='changes-value'>
                            <img src={upGreenIcon} alt=""/>
                            0%
                        </div>
                    </div>
                </div>
            </div>

            <div className='chart'>
                <ResponsiveContainer height={205} width='100%' className='responsive-bar-container'>
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10, right: 0, left: 0, bottom: 0,
                        }}
                    >
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type="monotone" dataKey="uv" stackId="1" stroke={chartColors[0].stroke} fill={chartColors[0].fill} isAnimationActive={false}/>
                        <Area type="monotone" dataKey="pv" stackId="1" stroke={chartColors[1].stroke} fill={chartColors[1].fill} isAnimationActive={false}/>
                        <Area type="monotone" dataKey="amt" stackId="1" stroke={chartColors[2].stroke} fill={chartColors[2].fill} isAnimationActive={false}/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </section>
    )
};

export default PlacementsStatistics;
