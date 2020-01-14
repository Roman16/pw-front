import React, {useEffect, useState} from "react";
import {Select} from "antd";
import CustomSelect from "../../../../components/Select/Select";
import DayChart from './DayChart';
import HourChart from "./HourChart";
import DayAndHourChart from "./DayAndHourChart";
import {metricsList} from "../metricsList";
import {daypartingServices} from "../../../../services/dayparting.services";

const Option = Select.Option;

const ChartStatistics = ({onSelectMetric, filteredMetric}) => {
    const [activeTab, setTab] = useState('day'),
        [data, setData] = useState([]);

    useEffect(() => {
        daypartingServices.getAllStatistic(filteredMetric)
            .then(res => {
                console.log(res);
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
                    Sort By:

                    <CustomSelect
                        value={filteredMetric}
                        dropdownClassName={'full-width-menu'}
                        onChange={(e) => onSelectMetric(e)}
                    >
                        {metricsList.map(item => (
                            <Option key={item.key} value={item.key}>{item.title}</Option>
                        ))}
                    </CustomSelect>
                </div>
            </div>

            {activeTab === 'hour' && <HourChart filteredMetric={filteredMetric}/>}
            {activeTab === 'dayHour' && <DayAndHourChart filteredMetric={filteredMetric}/>}
            {activeTab === 'day' && <DayChart filteredMetric={filteredMetric}/>}
        </section>
    )
};

export default ChartStatistics;
