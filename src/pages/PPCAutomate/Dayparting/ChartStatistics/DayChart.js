import React from "react";
import {
    ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';


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
            <ComposedChart
                layout="vertical"
                width={500}
                height={250}
                data={data}
                margin={{
                    top: 20, right: 20, bottom: 20, left: 20,
                }}
            >
                <XAxis type="number"/>
                <YAxis dataKey="name" type="category"/>
                <Tooltip/>
                <Bar dataKey="amt" barSize={20} fill="rgba(109, 109, 246, 0.5)" op/>
            </ComposedChart>
        </div>
    )
};

export default DayChart;