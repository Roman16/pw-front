import React, {useEffect, useState, Fragment} from "react";
import {Select} from "antd";
import CustomSelect from "../../../../components/Select/Select";
import DayChart from './DayChart';
import {metricsList} from "./metricsList";
import {daypartingServices} from "../../../../services/dayparting.services";

const Option = Select.Option;

const ChartStatistics = ({filteredMetric}) => {
    const [data, setData] = useState([]),
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
                <h2>Daily</h2>

                <div className='sorter'>
                    <div className={"select first"}>
                        <CustomSelect
                            value={firstCompareMetric.key}
                            getPopupContainer={trigger => trigger.parentNode}
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

                    <span>Compare to</span>

                    <div className="select second">
                        <CustomSelect
                            getPopupContainer={trigger => trigger.parentNode}
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
                </div>
            </div>

            <DayChart
                data={data}
                firstMetric={firstCompareMetric}
                secondMetric={secondCompareMetric}
            />
        </section>
    )
};

export default ChartStatistics;
