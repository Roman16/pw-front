import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];

const PlacementsStatistics = () => {

    return (
        <section className='placements-statistics'>
            <div className="section-header">
                <h2>Placements</h2>
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
                        <Area type="monotone" dataKey="uv" stackId="1" stroke="#6D6DF6" fill="#A1A1F9"/>
                        <Area type="monotone" dataKey="pv" stackId="1" stroke="#EC7F5C" fill="#F3AD97"/>
                        <Area type="monotone" dataKey="amt" stackId="1" stroke="#F1C75C" fill="#F6DB97"/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </section>
    )
};

export default PlacementsStatistics;
