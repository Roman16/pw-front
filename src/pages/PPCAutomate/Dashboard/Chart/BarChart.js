import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import moment from "moment";

const CustomBar = (props) => {
    const {
        fill, x, y, width, height,
    } = props;

    return (
        <path
            d={`M${x},${y + 5} q0,-5 5,-5 h${width - 10} q5,0 5,5 v${height - 5} h-${width} z`}
            fill={fill}
        />
    );
};

const SecondBarChart = ({data}) => {
    return (
        <ResponsiveContainer height={400} width='105%' className='responsive-bar-container'>

            <BarChart
                data={data}
                margin={{top: 20}}
            >
                <CartesianGrid
                    vertical={false}
                    stroke="#DBDCE2"
                />

                <XAxis dataKey="date" padding={{left: 10, right: 10}} axisLine={false} tickFormatter={(date) => moment(new Date(date)).format('MMM DD')}/>

                <YAxis domain={[0, 8000]} axisLine={false}/>

                <Bar dataKey="ppc" fill="#6D6DF6" shape={<CustomBar/>}/>
                <Bar dataKey="organic" fill="#95D6FF" shape={<CustomBar/>}/>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SecondBarChart;
