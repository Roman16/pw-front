import React, {useEffect, useState, Fragment} from "react";
import {Select} from "antd";
import CustomSelect from "../../../../components/Select/Select";
import DayChart from './DayChart';
import HourChart from "./HourChart";
import DayAndHourChart from "./DayAndHourChart";
import {metricsList} from "./metricsList";
import {daypartingServices} from "../../../../services/dayparting.services";

const Option = Select.Option;

const ChartStatistics = ({onSelectMetric, filteredMetric}) => {
    const [activeTab, setTab] = useState('day'),
        [data, setData] = useState([]),
        [firstCompareMetric, setFirstMetric] = useState(metricsList[1]),
        [secondCompareMetric, setSecondMetric] = useState(metricsList[0]);

    useEffect(() => {
        daypartingServices.getAllStatistic(filteredMetric)
            .then(res => {
                // console.log(res);
            })
    }, [filteredMetric]);

    return (
        <section className='chart-statistics'>
            <div className="section-header">
                <div className="tabs">
                    <div
                        onClick={() => setTab('hour')}
                        className={activeTab === 'hour' ? 'active' : ''}
                    >
                        Hour
                    </div>

                    <div
                        onClick={() => setTab('dayHour')}
                        className={activeTab === 'dayHour' ? 'active' : ''}
                    >
                        Day & Hour
                    </div>

                    <div
                        onClick={() => setTab('day')}
                        className={activeTab === 'day' ? 'active' : ''}
                    >
                        Day
                    </div>
                </div>

                <div className='sorter'>
                    <div className="select first">
                        <CustomSelect
                            value={firstCompareMetric.key}
                            dropdownClassName={'full-width-menu'}
                            onChange={(metric) => {
                                setFirstMetric(metricsList.find(item => item.key === metric));

                                if (metric === secondCompareMetric.key) {
                                    setSecondMetric(metricsList[0])
                                }
                            }}
                        >
                            {metricsList.map(item => (
                                <Option
                                    title={item.title}
                                    key={item.key}
                                    value={item.key}
                                >
                                    {item.title}
                                </Option>
                            ))}
                        </CustomSelect>
                    </div>

                    {activeTab !== 'dayHour' && <Fragment>
                        <span>Compare to</span>

                        <div className="select second">
                            <CustomSelect
                                value={secondCompareMetric.key}
                                dropdownClassName={'full-width-menu'}
                                onChange={(metric) => setSecondMetric(metricsList.find(item => item.key === metric))}
                            >
                                {metricsList.map(item => (
                                    <Option
                                        title={item.title}
                                        disabled={firstCompareMetric.key === item.key}
                                        key={item.key}
                                        value={item.key}
                                    >
                                        {item.title}
                                    </Option>
                                ))}
                            </CustomSelect>
                        </div>
                    </Fragment>}
                </div>
            </div>

            {activeTab === 'hour' && <HourChart
                firstMetric={firstCompareMetric}
                secondMetric={secondCompareMetric}
            />}

            {activeTab === 'dayHour' && <DayAndHourChart
                firstMetric={firstCompareMetric}
                secondMetric={secondCompareMetric}
            />}

            {activeTab === 'day' && <DayChart
                firstMetric={firstCompareMetric}
                secondMetric={secondCompareMetric}
            />}
        </section>
    )
};

export default ChartStatistics;
