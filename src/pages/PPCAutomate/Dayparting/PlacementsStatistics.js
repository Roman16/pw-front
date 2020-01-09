import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import upGreenIcon from '../../../assets/img/icons/metric-arrows/up-green-arrow.svg';
import downBlackIcon from '../../../assets/img/icons/metric-arrows/down-black-arrow.svg';

const data = [
    {
        name: '18 Oct 19', uv: 40, pv: 20, amt: 40,
    },
    {
        name: '19 Oct 19', uv: 30, pv: 10, amt: 60,
    },
    {
        name: '20 Oct 19', uv: 20, pv: 70, amt: 10,
    },
    {
        name: '21 Oct 19', uv: 25, pv: 25, amt: 50,
    },
    {
        name: '22 Oct 19', uv: 30, pv: 10, amt: 60,
    },
    {
        name: '23 Oct 19', uv: 20, pv: 70, amt: 10,
    },
    {
        name: '24 Oct 19', uv: 25, pv: 25, amt: 50,
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
                <ResponsiveContainer height={205} width='100%' className='responsive-bar-container'>
                    <AreaChart
                        width={400}
                        height={400}
                        data={data}
                        margin={{
                            top: 10, right: 5, left: -25, bottom: 0,
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

                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip
                            isAnimationActive={false}
                        />
                        <Area type="linear" dataKey="uv" stackId="1" stroke={chartColors[0].stroke}
                              fill="url(#colorUv)" fillOpacity={1} isAnimationActive={false}/>
                        <Area type="linear" dataKey="pv" stackId="1" stroke={chartColors[1].stroke}
                              fill="url(#colorPv)" fillOpacity={1} isAnimationActive={false}/>
                        <Area type="linear" dataKey="amt" stackId="1" stroke={chartColors[2].stroke}
                              fill="url(#colorAmt)" fillOpacity={1} isAnimationActive={false}/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </section>
    )
};

export default PlacementsStatistics;
