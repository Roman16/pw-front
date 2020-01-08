import React, {useState} from "react";
import {Select} from "antd";
import DayChart from './DayChart';
import HourChart from "./HourChart";
import DayAndHourChart from "./DayAndHourChart";

const Option = Select.Option;

const ChartStatistics = () => {
    const [activeTab, setTab] = useState('day');

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

                    <Select defaultValue="clicks">
                        <Option value='clicks' selected>Clicks</Option>
                    </Select>
                </div>
            </div>

            {activeTab === 'hour' && <HourChart />}
            {activeTab === 'dayHour' && <DayAndHourChart />}
            {activeTab === 'day' && <DayChart />}
        </section>
    )
};

export default ChartStatistics;
