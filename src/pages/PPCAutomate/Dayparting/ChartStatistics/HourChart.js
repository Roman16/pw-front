import React, {useState} from "react";
import {Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const CustomBar = (props) => {
    const {
        fill, x, y, width, height,
    } = props;

    if (height && height !== 0) {
        return (
            <path
                d={`M${x},${y + 5} q0,-5 5,-5 h${width - 10} q5,0 5,5 v${height - 5} h-${width} z`}
                fill={fill}
            />
        );
    } else {
        return 0
    }
};

const data = [
    {
        name: '01 AM', clicks: 1400,
    },
    {
        name: '02 AM', clicks: 1506,
    },
    {
        name: '03 AM', clicks: 989,
    },
    {
        name: '04 AM', clicks: 1228,
    },
    {
        name: '05 AM', clicks: 1100,
    },
    {
        name: '06 AM', clicks: 1700,
    },
    {
        name: '07 AM', clicks: 1700,
    },
    {
        name: '08 AM', clicks: 1700,
    },
    {
        name: '09 AM', clicks: 1700,
    },
    {
        name: '10 AM', clicks: 1700,
    },
    {
        name: '11 AM', clicks: 1700,
    },
    {
        name: '12 PM', clicks: 1700,
    },
    {
        name: '01 PM', clicks: 1400,
    },
    {
        name: '02 PM', clicks: 1506,
    },
    {
        name: '03 PM', clicks: 989,
    },
    {
        name: '04 PM', clicks: 1228,
    },
    {
        name: '05 PM', clicks: 1100,
    },
    {
        name: '06 PM', clicks: 1700,
    },
    {
        name: '07 PM', clicks: 1700,
    },
    {
        name: '08 PM', clicks: 1700,
    },
    {
        name: '09 PM', clicks: 1700,
    },
    {
        name: '10 PM', clicks: 1700,
    },
    {
        name: '11 PM', clicks: 1700,
    },
    {
        name: '12 AM', clicks: 1700,
    },
];

const HourChart = () => {
    const [focusBar, setFocusBar] = useState(null);

    return (
        <div className='chart-block hour-chart'>
            <ResponsiveContainer height='100%' width='99%' className='responsive-bar-container'>

                <BarChart
                    width={500}
                    height={230}
                    data={data}
                    onMouseMove={state => {
                        if (state.isTooltipActive) {
                            setFocusBar(state.activeTooltipIndex);
                        } else {
                            setFocusBar(null);
                        }
                    }}
                    onMouseLeave={() => setFocusBar(null)}
                    margin={{
                        top: 20
                    }}
                >
                    <XAxis type="category" dataKey="name" interval={2}/>

                    <YAxis  type="number" hide={true}/>

                    <Tooltip
                        cursor={false}
                        isAnimationActive={false}
                    />

                    <Bar
                        dataKey="clicks"
                        barSize={window.devicePixelRatio === 2 ? 15 : 20}
                        shape={<CustomBar/>}
                        isAnimationActive={false}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`}
                                  fill={focusBar === index ? '#6D6DF6' : 'rgba(109, 109, 246, 0.5)'}/>
                        ))}
                    </Bar>

                </BarChart>
            </ResponsiveContainer>
        </div>
    )
};

export default HourChart;
