import React, {PureComponent} from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Page A', PPC: 4000, Organic: 2400, amt: 2400,
    },
    {
        name: 'Page B', PPC: 3000, Organic: 1398, amt: 2210,
    },
    {
        name: 'Page C', PPC: 2000, Organic: 9800, amt: 2290,
    },
    {
        name: 'Page D', PPC: 2780, Organic: 3908, amt: 2000,
    },
    {
        name: 'Page E', PPC: 1890, Organic: 4800, amt: 2181,
    },
    {
        name: 'Page F', PPC: 2390, Organic: 3800, amt: 2500,
    },
    {
        name: 'Page G', PPC: 3490, Organic: 4300, amt: 2100,
    },
];

const getPath = (x, y, width, height) => {
    return(`M${x},${y + height} h${height} a20,20 0 0 1 20,20 v${width} a20,20 0 0 1 -20,20 h-${height} a20,20 0 0 1 -20,-20 v-${width} a20,20 0 0 1 20,-20 z`)
};
// `M${x},${y + height}
//           C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
//           C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
//           Z`;



const CustomBar = (props) => {
    const {
        fill, x, y, width, height,
    } = props;
    console.log(getPath(x, y, width, height));
    // console.log('y-----',y);

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

class SecondBarChart extends PureComponent {

    render() {
        return (
            <ResponsiveContainer height={400} width='100%'>

                <BarChart
                    data={data}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    {/*<Bar dataKey="PPC" fill="#6D6DF6" shape={<CustomBar />}/>*/}
                    <Bar dataKey="PPC" fill="#6D6DF6" />
                    <Bar dataKey="Organic" fill="#95D6FF" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default SecondBarChart;
