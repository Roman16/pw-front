import React from "react";
import {
    PieChart, Pie, Tooltip, Cell, ResponsiveContainer,
} from 'recharts';
import notDataImage from '../../../assets/img/not-data-image.svg';

const ProblemGraph = ({data = []}) => {

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <section className='problem-graph-block'>
            <div className="header-block">
                <h3>Problems Graph</h3>
            </div>

            {data.length > 0 ?
                <div className='graph'>
                   <div className='legend'>

                   </div>

                    <ResponsiveContainer height={240} width='70%'>
                        <PieChart width={240} height={240}>
                            <Pie
                                data={data}
                                labelLine={false}
                                innerRadius={50}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                                isAnimationActive={false}
                            >
                                {
                                    data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />))
                                }
                            </Pie>

                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                :
                <div className='not-data'>
                    <img src={notDataImage} alt=""/>
                </div>
            }
        </section>
    )
};

export default ProblemGraph;