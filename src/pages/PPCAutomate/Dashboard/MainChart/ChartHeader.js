import React from "react";
import {Switch} from "antd";
import dailyLineIcon from '../../../../assets/img/icons/daily-line.svg';
import DatePicker from "../../../../components/DatePicker/DatePickerOLD";
import moment from "moment";

const ChartHeader = ({timeRange, onChangeSwitch, selectedRangeDate, firstActiveMetricTitle, secondActiveMetricTitle, showWeekChart, showDailyChart}) => {
    return (
        <div className="chart-header">
            <div className='switch-block week-switch'>
                <Switch
                    checked={showWeekChart}
                    onChange={onChangeSwitch('week')}
                />
                7-day average
            </div>

            <div className='line-fill'>
                <div className="green-line"></div>
                <div className="violet-line"></div>
            </div>

            <div className='switch-block daily-switch'>
                <Switch
                    checked={showDailyChart}
                    onChange={onChangeSwitch('daily')}
                />
                Daily
            </div>

            <img src={dailyLineIcon} alt="" className='daily-icon'/>

            <div className='pair-name'>
                {firstActiveMetricTitle}
                {(firstActiveMetricTitle && secondActiveMetricTitle) && '/'}
                {secondActiveMetricTitle}
            </div>

            <div className='chart-legend'>
                {firstActiveMetricTitle && <div className="first-line">
                    <div className="green-line"></div>
                    {firstActiveMetricTitle}
                </div>}

                {secondActiveMetricTitle && <div className="second-line">
                    <div className="violet-line"></div>
                    {secondActiveMetricTitle}
                </div>}
            </div>

            <DatePicker
                timeRange={timeRange}
                defaultValue={[moment(selectedRangeDate.startDate), moment(selectedRangeDate.endDate)]}
            />
        </div>
    )
};
export default ChartHeader;