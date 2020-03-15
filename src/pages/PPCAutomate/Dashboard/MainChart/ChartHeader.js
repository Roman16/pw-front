import React from "react";
import {Switch} from "antd";
import moment from "moment";
import dailyLineIcon from '../../../../assets/img/icons/daily-line.svg';
import DatePicker from "../../../../components/DatePicker/DatePickerOLD";
import greenLineIcon from "../../../../assets/img/icons/green-line.svg";
import violetLineIcon from "../../../../assets/img/icons/violet-line.svg";

const ChartHeader = ({timeRange, onChangeSwitch, selectedRangeDate, firstActiveMetricTitle, secondActiveMetricTitle, showWeekChart, showDailyChart}) => {
    return (
        <div className="chart-header">
            <div className='switch-block week-switch'>
                <Switch
                    checked={showWeekChart}
                    onChange={onChangeSwitch('week')}
                />

                <span>7-day average</span>

                <div className='line-fill'>
                    <img src={greenLineIcon} alt="" className="green-line"/>
                    <img src={violetLineIcon} alt="" className="violet-line"/>
                </div>
            </div>


            <div className='switch-block daily-switch'>
                <Switch
                    checked={showDailyChart}
                    onChange={onChangeSwitch('daily')}
                />
                <span>Daily</span>

                <img src={dailyLineIcon} alt="" className='daily-icon'/>
            </div>


            <div className='chart-legend'>
                {firstActiveMetricTitle && <div className="first-line">
                    <img src={greenLineIcon} alt="" className="green-line"/>
                    {firstActiveMetricTitle}
                </div>}

                {secondActiveMetricTitle && <div className="second-line">
                    <img src={violetLineIcon} alt="" className="violet-line"/>
                    {secondActiveMetricTitle}
                </div>}
            </div>

            <DatePicker
                timeRange={timeRange}
                defaultValue={selectedRangeDate.startDate === 'lifetime' ? null : [moment(selectedRangeDate.startDate), moment(selectedRangeDate.endDate)]}
            />
        </div>
    )
};
export default ChartHeader;