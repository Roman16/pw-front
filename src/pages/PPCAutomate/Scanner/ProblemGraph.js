import React, {useEffect, useState} from "react";
import {
    PieChart, Pie, Tooltip, Sector, Cell, ResponsiveContainer, Label, Text
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
        setData(Object.keys(problemsCount).map(key => {
            return ({
                ...problemList.find(item => item.key === key),
                value: problemsCount[key] ? problemsCount[key] : 0,
            })
        }));
    }, [problemsCount]);

    return (
        <section className='problem-graph-block'>
            <div className="header-block">
                <h3>Problems Graph</h3>
            </div>

            {problemsCount.DuplicateKeywords >= 0 ?
                <div className='graph'>
                    <div className='graph-block'>
                        <ResponsiveContainer height={'100%'} width={240}>
                            <PieChart width={240} height={'100%'}>
                                <Pie
                                    data={data}
                                    labelLine={false}
                                    innerRadius={70}
                                    outerRadius={110}
                                    fill="#8884d8"
                                    dataKey="value"
                                    isAnimationActive={false}
                                    paddingAngle={0}
                                    blendStroke={true}

                                    // activeShape={renderActiveShape}
                                    // activeIndex={activeSector}
                                    // onMouseEnter={(data, index) => setSector(index)}
                                    // onMouseLeave={() => setSector(null)}
                                >
                                    {data.map((entry, index) => {
                                        return (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />)
                                    })}

                                    <Label content={({viewBox: {cx, cy}}) => {
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
                                                  style={stylingProps}>{data && data.length}</Text>
                                        )
                                    }}/>
                                </Pie>

                                <Tooltip
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='legend'>
                        {data.map((item, index) => (
                            <div key={item.name}>
                                <div className="color" style={{backgroundColor: COLORS[index]}}/>
                                <div className='mistake'>{item.name}</div>

                                <div className="value">
                                    {item.value}
                                </div>

                                <div className="percent">
                                    {round((100 / Object.values(problemsCount).reduce((a, b) => a + b)) * item.value, 0) >= 0 ?
                                        round((100 / Object.values(problemsCount).reduce((a, b) => a + b)) * item.value, 0)
                                        :
                                        0
                                    }%
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                :
                <div className='not-data'>
                    <img src={notDataImage} alt=""/>
                    <p>No data to show</p>
                </div>
            }
        </section>
    )
};

export default ProblemGraph;