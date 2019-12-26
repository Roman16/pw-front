import React from "react";
import {
    BarChart,  Bar, XAxis, YAxis, Tooltip
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

    return (
        <div className='chart-block day-chart'>
            <BarChart
                layout="vertical"
                width={500}
                height={230}
                data={data}
                margin={{
                    top: 20, right: 20, bottom: 20, left: 20,
                }}
            >
                <XAxis type="number" hide={true}/>

                <YAxis dataKey="name" type="category"/>

                <Tooltip cursor={{fill: '#6D6DF6'}} strokeWidth={10}/>

                <Bar
                    dataKey="amt"
                    barSize={20}
                    fill="rgba(109, 109, 246, 0.5)"
                    shape={<CustomBar/>}
                    isAnimationActive={false}
                />


            </BarChart>
        </div>
    )
};

export default DayChart;