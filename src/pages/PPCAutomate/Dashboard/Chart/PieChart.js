import React from 'react';
import {
    PieChart, Pie, Label, Cell, Text, ResponsiveContainer
} from 'recharts';

const data = [
    {name: 'Organic', value: 400},
    {name: 'PPC', value: 300},
];
const COLORS = ['#5052AD', '#6D6DF6'];


const FirstPieChart = () => {
    return (
        <div className="pie-chart-container">
            <ResponsiveContainer height={300} width='100%'>
                <PieChart>
                    <Pie
                        data={data}
                        // cx={120}
                        // cy={200}
                        innerRadius={75}
                        outerRadius={100}
                        paddingAngle={0}
                        dataKey="value"
                        blendStroke={true}
                        animationBegin={100}
                        animationDuration={500}
                    >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`}
                                                             fill={COLORS[index % COLORS.length]}/>)
                        }

                        <Label
                            content={({viewBox: {cx, cy}}) => {
                                const positioningProps = {
                                        x: cx,
                                        y: cy,
                                        textAnchor: 'middle',
                                        verticalAnchor: 'middle',
                                    },
                                    stylingProps = {
                                        fontSize: '32px',
                                        fontFamily: 'ir',
                                        color: '#363694'
                                    };

                                return (
                                    <Text {...positioningProps} style={stylingProps}>{"0,72"}</Text>
                                )
                            }}
                        />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            <div className='chart-legend'>
                <div className='organic-block'>
                    <div className='example-fill' style={{background: COLORS[0]}}></div>
                    Organic Sales
                    <div className='value'>$ 156,722</div>
                </div>

                <div className='ppc-block'>
                    <div className='example-fill' style={{background: COLORS[1]}}></div>
                    Organic Sales
                    <div className='value'>$ 256,321</div>
                </div>
            </div>
        </div>
    );
}

export default FirstPieChart;