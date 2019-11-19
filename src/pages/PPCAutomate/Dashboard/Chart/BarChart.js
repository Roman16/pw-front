import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Line,
} from 'recharts';
import moment from "moment";

const CustomBar = (props) => {
    const {
        fill, x, y, width, height,
    } = props;

    if (height !== 0 && height !== NaN) {
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


const SecondBarChart = ({data, selectedRangeDate}) => {

    let barChartData = [];

    const startDate = moment(new Date()).subtract(6, 'days');


    for (let i = 0; i < 7; i++) {
        const pickFromApi = data.find(item => moment(item.date).format('YYYY-MM-DD') === moment(startDate).add(i, 'days').format('YYYY-MM-DD'));

        if (pickFromApi) {
            barChartData.push(pickFromApi)
        } else {
            barChartData.push({
                date: moment(startDate).add(i, 'days').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            })
        }
    }

    return (
        <ResponsiveContainer height={400} width='105%' className='responsive-bar-container'>
            <BarChart
                data={barChartData}
                margin={{top: 20}}
            >
                <CartesianGrid
                    vertical={false}
                    stroke="#DBDCE2"
                />

                <XAxis dataKey="date" padding={{left: 10, right: 10}} axisLine={false}
                       tickFormatter={(date) => moment(date).format('MMM DD')}/>

                <YAxis axisLine={false}/>

                <Bar
                    // isAnimationActive={false}
                    fill="#95D6FF"
                    dataKey="ppc_value"
                    shape={<CustomBar/>}
                />
                <Bar
                    // isAnimationActive={false}
                    dataKey="organic_value"
                    fill="#6D6DF6"
                    shape={<CustomBar/>}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SecondBarChart;
