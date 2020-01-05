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
        name: '01 AM', amt: 1400,
    },
    {
        name: '02 AM', amt: 1506,
    },
    {
        name: '03 AM', amt: 989,
    },
    {
        name: '04 AM', amt: 1228,
    },
    {
        name: '05 AM', amt: 1100,
    },
    {
        name: '06 AM', amt: 1700,
    },
    {
        name: '07 AM', amt: 1700,
    },
    {
        name: '08 AM', amt: 1700,
    },
    {
        name: '09 AM', amt: 1700,
    },
    {
        name: '10 AM', amt: 1700,
    },
    {
        name: '11 AM', amt: 1700,
    },
    {
        name: '12 PM', amt: 1700,
    },
    {
        name: '01 PM', amt: 1400,
    },
    {
        name: '02 PM', amt: 1506,
    },
    {
        name: '03 PM', amt: 989,
    },
    {
        name: '04 PM', amt: 1228,
    },
    {
        name: '05 PM', amt: 1100,
    },
    {
        name: '06 PM', amt: 1700,
    },
    {
        name: '07 PM', amt: 1700,
    },
    {
        name: '08 PM', amt: 1700,
    },
    {
        name: '09 PM', amt: 1700,
    },
    {
        name: '10 PM', amt: 1700,
    },
    {
        name: '11 PM', amt: 1700,
    },
    {
        name: '12 AM', amt: 1700,
    },
];

const HourChart = () => {
    const [focusBar, setFocusBar] = useState(null);

    return (
        <div className='chart-block hour-chart'>
            <ResponsiveContainer height='100%' width='100%' className='responsive-bar-container'>

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
                    <XAxis type="category" dataKey="name"/>

                    <YAxis  type="number" hide={true}/>

                    <Tooltip
                        cursor={false}
                        isAnimationActive={false}
                    />

                    <Bar
                        dataKey="amt"
                        barSize={20}
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
