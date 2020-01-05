import React, {useState} from "react";
import {
    BarChart, Cell, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const CustomBar = (props) => {
    const {
        fill, x, y, width, height,
    } = props;

    if (height && height !== 0) {
        return (
            <path
                d={`M${x},${y} h${width - 5} q5,0 5,5 v${height - 10} q0,5 -5,5 h-${width - 5} z`}
                fill={fill}
            />
        );
    } else {
        return 0
    }
};

const data = [
    {
        name: 'S', amt: 1400,
    },
    {
        name: 'M', amt: 1506,
    },
    {
        name: 'T', amt: 989,
    },
    {
        name: 'W', amt: 1228,
    },
    {
        name: 'F', amt: 1100,
    },
    {
        name: 'S', amt: 1700,
    },
];

const DayChart = () => {
    const [focusBar, setFocusBar] = useState(null);

    return (
        <div className='chart-block day-chart'>
            <ResponsiveContainer height='100%' width='100%' className='responsive-bar-container'>

                <BarChart
                    layout="vertical"
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
                    <XAxis type="number" hide={true}/>

                    <YAxis dataKey="name" type="category"/>

                    <Tooltip
                        cursor={false}
                        isAnimationActive={false}
                    />

                    <Bar
                        dataKey="amt"
                        barSize={20}
                        fill=""
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

export default DayChart;
