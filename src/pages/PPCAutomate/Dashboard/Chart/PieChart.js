import React, {PureComponent} from 'react';
import {
    PieChart, Pie, Sector, Cell, ResponsiveContainer
} from 'recharts';

const data = [
    {name: 'Group A', value: 400},
    {name: 'Group B', value: 300},
];
const COLORS = ['#5052AD', '#6D6DF6'];


class FirstPieChart extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/3Leoa7f4/';

    render() {
        return (
            <ResponsiveContainer height={400} width='100%'>
                <PieChart onMouseEnter={this.onPieEnter}>
                    <Pie
                        data={data}
                        // cx={120}
                        // cy={200}
                        innerRadius={75}
                        outerRadius={100}
                        paddingAngle={0}
                        dataKey="value"
                        blendStroke='#5052AD'
                    >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`}
                                                             fill={COLORS[index % COLORS.length]}/>)
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        );
    }
}

export default FirstPieChart;