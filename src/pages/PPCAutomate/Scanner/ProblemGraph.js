import React, {useEffect, useState} from "react";
import {
    PieChart, Pie, Tooltip, Sector, Cell, ResponsiveContainer, LineChart,
} from 'recharts';
import notDataImage from '../../../assets/img/not-data-image.svg';
import {round} from "../../../utils/round";

let problemList = [
    {
        name: 'Duplicate keywords',
        key: 'DuplicateKeywords',
    },
    {
        name: 'Bad-performing keywords',
        key: 'BadPerformingKeywords',
    },
    {
        name: 'Keywords Harvesting',
        key: 'KeywordsHarvesting',
    },
    {
        name: 'Bad Semantic Core',
        key: 'PoorSemanticCore',
    },
    {
        name: 'No Product Attribute Targeting',
        key: 'PATs',
    },
];

const renderActiveShape = (props) => {
    const {
        cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill
    } = props;
    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 10}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
        </g>
    );
};

const ProblemGraph = ({problemsCount = {}}) => {
    const [data, setData] = useState([]),
        [activeSector, setSector] = useState(null);

    const COLORS = ['#5052AD', '#FBB13C', '#F17105', '#E93130', '#66D0AA'];

    useEffect(() => {
        setData(problemList.map(item => ({
            ...item,
            value: problemsCount[item.key] ? problemsCount[item.key] : 0,
        })))
    }, [problemsCount]);

    return (
        <section className='problem-graph-block'>
            <div className="header-block">
                <h3>Problems Graph</h3>
            </div>

            {problemsCount.DuplicateKeywords >= 0 ?
                <div className='graph'>
                    <div className='legend'>
                        {data.map((item, index) => (
                            <div key={item.name}>
                                <div className="color" style={{backgroundColor: COLORS[index]}}/>
                                <div>
                                    <div className="percent">
                                        {round((100 / Object.values(problemsCount).reduce((a, b) => a + b)) * item.value, 0)}%
                                    </div>
                                    <div className='mistake'>mistake #{index + 1}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='graph-block'>
                        <ResponsiveContainer height={280} width='100%'>
                            <PieChart width={240} height={240}>
                                <Pie
                                    data={data}
                                    labelLine={false}
                                    innerRadius={50}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                    isAnimationActive={false}

                                    activeShape={renderActiveShape}
                                    activeIndex={activeSector}
                                    onMouseEnter={(data, index) => setSector(index)}
                                    onMouseLeave={() => setSector(null)}
                                >
                                    {
                                        data.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />))
                                    }
                                </Pie>

                                <Tooltip
                                />
                            </PieChart>
                        </ResponsiveContainer>

                    </div>
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