import React from 'react';
import {
    PieChart, Pie, Label, Cell, Text, ResponsiveContainer, Line
} from 'recharts';
import {round} from "../../../../utils/round";


const COLORS = ['#5052AD', '#6D6DF6'];

const FirstPieChart = ({data}) => {
    const organicValue = data.length > 0 && data.find(item => item.metric_key === 'organic').metric_value,
        ppcValue = data.length > 0 && data.find(item => item.metric_key === 'ppc').metric_value;

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
                        dataKey="metric_value"
                        blendStroke={true}
                        animationBegin={100}
                        animationDuration={500}
                        // isAnimationActive={false}
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
                                    <Text {...positioningProps}
                                          style={stylingProps}>{round((organicValue / ppcValue), 4)}</Text>
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
                    <div className='value'>
                        {organicValue != null ? `$ ${round(+organicValue, 4)}` : 'N/A'}
                    </div>
                </div>

                <div className='ppc-block'>
                    <div className='example-fill' style={{background: COLORS[1]}}></div>
                    PPC Sales
                    <div className='value'>
                        {ppcValue != null ? `$ ${round(+ppcValue, 4)}` : 'N/A'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstPieChart;
