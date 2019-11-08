import React, {Fragment} from 'react';
import {
    BarChart, Bar, Cell, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Page A', PPC: 4000, Organic: 1398
    },
    {
        name: 'Page B', PPC: 3000, Organic: 1398,
    },
    {
        name: 'Page C', PPC: 2000, Organic: 6800,
    },
    {
        name: 'Page D', PPC: 2780, Organic: 3908,
    },
    {
        name: 'Page E', PPC: 1890, Organic: 4800,
    },
    {
        name: 'Page F', PPC: 2390, Organic: 3800,
    },
];

const getPath = (x, y, width, height) => {
    return (`M ${x} ${y}
           v${height}
           h${width}
           v-${height}
           z`)
    // return (`M ${0} ${0} L${x},${height} L${x + width},${height} L${x + width}, ${0} L ${x} ${0} Z`)
};


const CustomBar = (props) => {
    const {
        fill, x, y, width, height,
    } = props;

    return (
        <Fragment>
            <path d={getPath(x, y, width, height)} fill={fill}/>
        </Fragment>
    );
};

const SecondBarChart = () => {
       return (
        <ResponsiveContainer height={400} width='100%'>

            <BarChart
                data={data}
            >
                <CartesianGrid
                    vertical={false}
                    stroke="#DBDCE2"
                />

                <XAxis dataKey="name" padding={{left: 10, right: 10}} axisLine={false}/>

                <YAxis domain={[0, 8000]} axisLine={false}/>

                {/*<Tooltip/>*/}
                <Legend/>
                <Bar dataKey="PPC" fill="#6D6DF6" shape={<CustomBar/>}/>
                <Bar dataKey="Organic" fill="#95D6FF" shape={<CustomBar/>}/>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default SecondBarChart;
