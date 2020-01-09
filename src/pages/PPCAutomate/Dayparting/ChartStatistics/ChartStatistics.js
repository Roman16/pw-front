import React, {useState} from "react";
import {Select} from "antd";
import CustomSelect from "../../../../components/Select/Select";
import DayChart from './DayChart';
import HourChart from "./HourChart";
import DayAndHourChart from "./DayAndHourChart";
import selectIcon from '../../../../assets/img/icons/select-icon.svg';

const Option = Select.Option;

const metricsList = [
    {
        title: 'Impressions',
        key: 'impressions',
        type: 'number'
    },
    {
        title: 'Clicks',
        key: 'clicks',
        type: 'number'
    },
    {
        title: 'CTR',
        key: 'ctr',
        type: 'percent'
    },
    {
        title: 'Spend',
        key: 'spend',
        type: 'currency'
    },
    {
        title: 'CPC',
        key: 'cpc',
        type: 'currency'
    },
    {
        title: 'Orders',
        key: 'orders',
        type: 'number'
    },
    {
        title: 'Ad Orders',
        key: 'ad_orders',
        type: 'number'
    },
    {
        title: 'Organic Orders',
        key: 'organic_orders',
        type: 'number'
    },
    {
        title: 'Total Sales',
        key: 'total_sales',
        type: 'currency'
    },
    {
        title: 'Ad Sales',
        key: 'ad_sales',
        type: 'currency'
    },
    {
        title: 'Organic Sales',
        key: 'organic_sales',
        type: 'currency'
    },
    {
        title: 'ACoS',
        key: 'acos',
        type: 'percent'
    },
    {
        title: 'Ad CVR',
        key: 'ad_cvr',
        type: 'percent'
    },
    {
        title: 'CPA',
        key: 'cpa',
        type: 'currency'
    },
    {
        title: 'Profit',
        key: 'profit',
        type: 'currency'
    },
    {
        title: 'MACoS',
        key: 'macos',
        type: 'percent'
    },
];

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

                    <CustomSelect
                        defaultValue="clicks"
                        dropdownClassName={'full-width-menu'}
                    >
                        {metricsList.map(item => (
                            <Option key={item.key} value={item.key}>{item.title}</Option>
                        ))}
                    </CustomSelect>
                </div>
            </div>

            {activeTab === 'hour' && <HourChart/>}
            {activeTab === 'dayHour' && <DayAndHourChart/>}
            {activeTab === 'day' && <DayChart/>}
        </section>
    )
};

export default ChartStatistics;
